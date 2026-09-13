# Infinity Model

Marketing website for Infinity Model, a digital manufacturing studio in Jizan. The site is bilingual (Arabic and English) and covers services, products, training, projects and quote requests.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root route redirects to the Arabic homepage; English is available at `/en`.

## Configuration

Copy `.env.example` to `.env.local` and set the public URL used in canonical links, sitemap and Open Graph metadata:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

If the variable is not set, the deployed Vercel URL is used as the safe default. The product store URL and contact details live in `src/data/store.ts` and `src/data/contact.ts`.

### Salla product sync

The home product rail can display live products, prices and product links from Salla. Create a server-side `SALLA_ACCESS_TOKEN` with the `products.read` scope and add it to the deployment environment. The token is never sent to the browser; the site refreshes its cached product feed every 15 minutes and safely falls back to the store categories when it is unavailable.

```bash
SALLA_ACCESS_TOKEN=your-server-only-token
```

### Quote requests and attachments

The quote form accepts project details plus files up to 4 MB (`STL`, `OBJ`, `3MF`, `STEP`, `ZIP`, `PDF` and common images). To send those requests to your own CRM, email automation or serverless workflow, set an HTTPS endpoint in `QUOTE_WEBHOOK_URL`. Without it, the form keeps WhatsApp as a clear fallback and does not store customer files on the website.

```bash
QUOTE_WEBHOOK_URL=https://your-secure-endpoint.example/quotes
```

### Measurement and Search Console

Set these optional environment variables after creating the corresponding properties. Analytics is only loaded when its measurement ID is present.

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=verification-token
```

## Quality checks

```bash
npm run lint
npm run build
```

The production build does not depend on fetching third-party font files, so it can run in restricted or offline build environments.

## Deployment

Deploy as a standard Next.js application. Set `NEXT_PUBLIC_SITE_URL` to the final marketing-site domain before deploying so search engines receive correct canonical URLs and sitemap entries.
