import { NextResponse } from 'next/server';
import { calcPrice, orderMessage, products, type OrderSelection } from '@/data/products';

// Basic in-memory protection; use a shared store for multi-instance deployments.
const requests = new Map<string, number[]>();
export async function POST(request: Request) {
 try {
  const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now=Date.now(); const recent=(requests.get(ip)||[]).filter(t=>now-t<60000);
  if(recent.length>=5) return NextResponse.json({error:'Too many requests'}, {status:429});
  recent.push(now); requests.set(ip,recent);
  const body=await request.json();
  if(body.website) return NextResponse.json({error:'Invalid request'}, {status:400});
  const selection:OrderSelection=body.selection;
  const customer=body.customer;
  if(!selection || !products.some(p=>p.id===selection.productId) || !customer || typeof customer.name!=='string' || typeof customer.phone!=='string' || typeof customer.address!=='string' || typeof customer.comment!=='string' || !customer.name.trim() || !customer.address.trim() || !/^\+998\d{9}$/.test(customer.phone) || [customer.name,customer.address,customer.comment].some((s:string)=>s.length>500)) return NextResponse.json({error:'Invalid data'}, {status:400});
  calcPrice(selection);
  const token=process.env.TELEGRAM_BOT_TOKEN, chatId=process.env.TELEGRAM_CHAT_ID;
  if(!token || !chatId) return NextResponse.json({error:'Telegram is not configured'}, {status:503});
  const response=await fetch(`https://api.telegram.org/bot${token}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:chatId,text:orderMessage(selection, customer)}),cache:'no-store'});
  if(!response.ok) return NextResponse.json({error:'Telegram delivery failed'}, {status:502});
  return NextResponse.json({ok:true});
 } catch { return NextResponse.json({error:'Order failed'}, {status:400}); }
}
