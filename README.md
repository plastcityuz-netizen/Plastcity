# Plast City

Next.js App Router sayt: mahsulot tanlash, narx hisoblash va Telegram orqali buyurtma.

## Ishga tushirish

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Telegram sozlash

1. Telegram'da BotFather orqali bot yarating va tokenni oling.
2. Botga xabar yuboring yoki uni buyurtmalar qabul qiladigan guruhga qo'shing. Telegram Bot API `getUpdates` orqali kerakli chat ID'ni aniqlang.
3. `.env.local` fayliga `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` qiymatlarini kiriting. Ularni hech qachon frontendga yoki Git'ga kiritmang.
4. Serverni qayta ishga tushiring. Bot chatga xabar yuborish huquqiga ega bo'lishi kerak.

API mavjud bo'lmasa, sayt Telegram'dagi @penaplast_uz uchun tayyorlangan xabar havolasini taqdim etadi. Mijoz Telegram'da xabarni yuborishni tasdiqlashi kerak. In-memory rate limit bitta server jarayoniga tegishli; ko'p instansiyali production muhitda umumiy rate-limit xotirasidan foydalaning.

Narxlar va `priceMatrix[zichlik][qalinlik]` yagona manbasi `data/products.ts` faylida. Har bir qalinlik narxini shu faylda alohida o'zgartirish mumkin.

```bash
npm run lint
npm run build
```

Logo fayli taqdim etilmaganligi sababli vaqtinchalik matnli brend belgisi ishlatilgan. Asl logo olingach, navbar, footer, favicon va Open Graph rasmini u bilan almashtiring.

Production'da Open Graph havolasi to'g'ri bo'lishi uchun `NEXT_PUBLIC_SITE_URL` ni saytning haqiqiy HTTPS manziliga o'rnating (Vercel'da deployment manzili avtomatik aniqlanadi).
