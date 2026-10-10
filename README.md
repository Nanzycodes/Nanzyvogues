# Nanzy Vogues

A fashion storefront where customers browse products by category, add them to a cart, and create an account.

**Live demo:** https://nanzyvogues.vercel.app

## What it does

- Browse 5 product categories (slides, sneakers, clothes, trousers, general) with a product page for each item.
- Add items to a cart that stays in sync across pages.
- Sign up, log in and log out. Passwords are hashed with bcrypt, and sessions use a signed token in an `httpOnly` cookie that expires after 7 days.
- Products and user accounts are stored in PostgreSQL through Prisma.

## Performance

Mobile results from PageSpeed Insights (10 Oct 2026):

| Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|
| 99 | 100 | 100 | 100 |

Largest Contentful Paint was 2.0 s on throttled slow 4G, with a cumulative layout shift of 0.004.

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Prisma 7, PostgreSQL, Zod for input validation, bcryptjs, jose. Deployed on Vercel.

## Run it locally

```bash
git clone https://github.com/Nanzycodes/Nanzyvogues.git
cd Nanzyvogues
npm install
```

Create a `.env` file in the project root:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
SESSION_SECRET="a-long-random-string"
```

Then set up the database and start the app:

```bash
npx prisma migrate deploy --config prisma7.config.ts
npx tsx --env-file=.env prisma/seed.ts
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  api/auth/        # signup, login, logout and current-user routes
  shop/[category]/ # category and product pages
  cart/            # cart page
  components/      # navbar, product cards, forms, cart view
  lib/             # Prisma client, session handling
prisma/
  schema.prisma    # Product and User models
  migrations/
  seed.ts          # sample products
```
