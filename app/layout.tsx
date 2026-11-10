import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata = {
 metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')),
 title:'Plast City — Penaplast Zavodi | Sifatli EPS Penaplast',
 description:'Plast City Penaplast Zavodi — qurilish va issiqlik izolyatsiyasi uchun sifatli EPS penaplast mahsulotlari.',
 openGraph:{title:'Plast City — Penaplast Zavodi | Sifatli EPS Penaplast',description:'Plast City Penaplast Zavodi — qurilish va issiqlik izolyatsiyasi uchun sifatli EPS penaplast mahsulotlari.',images:['/images/products.png'],type:'website'},
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="uz"><body>{children}</body></html>}
