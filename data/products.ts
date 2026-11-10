export const densities = [7, 10, 12, 14, 15, 16, 18, 20] as const;
export const thicknesses = [1, 2, 3, 5, 10, 15, 20, 30, 40, 50, 60] as const;
const densityPrices: Record<number, number> = {7:32,10:40,12:50,14:62,15:67,16:71,18:79,20:87};
// Override individual thickness values here when differentiated pricing is introduced.
export const priceMatrix: Record<number, Record<number, number>> = Object.fromEntries(
  densities.map(density => [density, Object.fromEntries(thicknesses.map(thickness => [thickness, densityPrices[density]]))])
);
export const products = [
  { id:'white', number:'01', name:'Oq penaplast', description:'Turli qurilish va issiqlik izolyatsiyasi ishlari uchun sifatli EPS penaplast.', tag:'ENG OMMABOP' },
  { id:'black', number:'02', name:'Qora penaplast', description:'Qurilish va izolyatsiya ishlari uchun sifatli qora EPS penaplast.', tag:'MUSTAHKAM' },
  { id:'granulated', number:'03', name:'Maydalangan penaplast', description:'Turli maqsadlar uchun qulay va yengil maydalangan EPS penaplast.', tag:'UNIVERSAL' },
] as const;
export type ProductId = typeof products[number]['id'];
export type OrderSelection = { productId:ProductId; density:number; thickness:number; quantity:number };
export const granulatedPrice = 0.7;
export function calcPrice(selection: OrderSelection) {
 const unit = selection.productId === 'granulated' ? granulatedPrice : priceMatrix[selection.density]?.[selection.thickness];
 if (unit === undefined || !Number.isSafeInteger(selection.quantity) || selection.quantity < 1 || selection.quantity > 100000) throw new Error('Invalid selection');
 return {unit, total: Math.round(unit * selection.quantity * 100) / 100};
}
export function formatMoney(value:number) { return '$' + value.toLocaleString('en-US', {maximumFractionDigits:2}); }
export function orderMessage(selection:OrderSelection, customer:{name:string; phone:string; address:string; comment:string}) {
 const product = products.find(p=>p.id===selection.productId);
 if (!product) throw new Error('Invalid product');
 const {unit,total}=calcPrice(selection);
 const details = selection.productId === 'granulated' ? [] : [`Zichlik: ${selection.density} kg/m³`, `Qalinlik: ${selection.thickness} cm`];
 const unitName=selection.productId === 'granulated' ? 'kg' : 'dona';
 return ['YANGI BUYURTMA',`Mahsulot: ${product.name}`,...details,`Miqdor: ${selection.quantity} ${unitName}`,`Narx: ${formatMoney(unit)} / ${unitName} (jami: ${formatMoney(total)})`,'','MIJOZ:',`Ism: ${customer.name}`,`Telefon: ${customer.phone}`,`Manzil: ${customer.address}`,`Izoh: ${customer.comment || '—'}`].join('\n');
}
