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

## Quality checks

```bash
npm run lint
npm run build
```

The production build does not depend on fetching third-party font files, so it can run in restricted or offline build environments.

## Deployment

Deploy as a standard Next.js application. Set `NEXT_PUBLIC_SITE_URL` to the final marketing-site domain before deploying so search engines receive correct canonical URLs and sitemap entries.
