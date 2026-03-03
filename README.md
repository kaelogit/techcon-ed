# Edwin Castro — Official Community Support (edwinmega.com)

Official website where people across the USA can reach out for funding and support (education, housing, disaster recovery, and more). No database: all submissions are sent to your Zoho email.

## Tech stack

- **Next.js** (App Router) — runs on [Vercel](https://vercel.com)
- **Tailwind CSS** — styling
- **Zoho Mail** — form submissions sent via SMTP to your Zoho inbox

## Local development

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env.local` and fill in your Zoho credentials:

   ```bash
   cp .env.example .env.local
   ```

   In `.env.local` set:

   - `ZOHO_USER` — your full Zoho email (e.g. `support@edwinmega.com`)
   - `ZOHO_PASS` — Zoho **app password** (not your normal login password)
   - `TO_EMAIL` — (optional) where to receive form emails; if omitted, uses `ZOHO_USER`

   **Zoho app password:** Zoho Mail → Settings → Security → App Passwords → Generate. Use that value for `ZOHO_PASS`.

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this repo to GitHub (or connect another Git provider to Vercel).
2. In [Vercel](https://vercel.com), **New Project** → import this repo.
3. Add **Environment Variables** in the Vercel project:
   - `ZOHO_USER` = your Zoho email
   - `ZOHO_PASS` = your Zoho app password
   - `TO_EMAIL` = (optional) inbox for form submissions
4. Deploy. Vercel will assign a URL; point your domain **edwinmega.com** to that project in Vercel → Project → Settings → Domains.

## Domain (edwinmega.com)

- In your domain registrar, add the DNS records Vercel shows (usually an A record or CNAME for `edwinmega.com` and optionally `www.edwinmega.com`).
- In Vercel, add `edwinmega.com` (and `www.edwinmega.com` if you use it) under Domains.

## How the form works

- Users submit the form on the **Reach out for support** section.
- The Next.js API route (`/api/contact`) receives the data and sends an email via Zoho SMTP to `TO_EMAIL` (or `ZOHO_USER`).
- No database: every submission is an email to your Zoho inbox. Reply directly from there.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build locally
- `npm run lint` — run ESLint
