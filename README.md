# CP KPI Dashboard Feedback

A production-oriented **Next.js web app** for Vercel. This is not a static HTML mockup: the form is interactive React code, submits to a server-side API, stores responses in Postgres (Neon-compatible), and provides a protected CSV export for later analysis / AI summarization.

## What's included
- Responsive Vietnamese feedback form based on the KPI Input Form design system
- 4 UX dimensions: Ease of Use, Clarity & Understandability, Usefulness, Self-Service
- Required validation for Domain + 4 core questions
- Optional qualitative follow-ups and issue reporting
- Success state after submission
- `POST /api/feedback` API with server-side validation
- Persistent Postgres storage via `@neondatabase/serverless`
- `GET /api/export` protected CSV export
- `GET /api/export/xlsx` protected Excel (.xlsx) export
- `/admin` page (token-gated): view responses in a table, export CSV/Excel, and generate an AI summary of trends/issues
- Vercel-ready environment variable template

## Run locally
1. Copy `.env.example` to `.env.local` and add a Postgres/Neon connection string and admin token.
2. Run:
   ```bash
   npm install
   npm run dev
   ```
3. Open `http://localhost:3000`.

The database table is created automatically on the first successful submission.

## Deploy to Vercel
1. Push this folder to a Git repository (or import the project directly into Vercel).
2. Create/connect a Postgres database (Neon works well with Vercel).
3. Add environment variables in Vercel Project Settings:
   - `DATABASE_URL`
   - `ADMIN_TOKEN`
   - `ANTHROPIC_API_KEY` (only needed for the AI summary feature on `/admin`)
4. Deploy. Vercel will detect Next.js automatically.

## Viewing and exporting responses
Open `/admin` and enter the `ADMIN_TOKEN` to browse responses, export CSV/Excel, or generate an AI summary.

Or use the protected endpoints directly with an Authorization header:

`Authorization: Bearer <ADMIN_TOKEN>`

- `GET /api/export` → downloads `cp-kpi-feedback.csv`
- `GET /api/export/xlsx` → downloads `cp-kpi-feedback.xlsx`
- `GET /api/admin/responses` → JSON list of responses
- `POST /api/admin/summary` → `{ summary, count }`, an AI-generated summary of trends/issues (requires `ANTHROPIC_API_KEY`)

For a quick browser-only internal workflow, `?token=<ADMIN_TOKEN>` as a query param also works on the `GET` endpoints, but the Authorization header is preferable because it does not place the token in the URL/history.

## Data fields
- `id`
- `submitted_at`
- `domain`
- `ease` (1-5)
- `ease_comment`
- `clarity` (1-5)
- `clarity_comment`
- `usefulness` (1-5)
- `self_service`
- `improvement`
- `issue`

## Next sensible additions (not included yet)
- Response charts / filters on the admin page
- Screenshot upload for issue reports
- Authentication / VNG SSO (the admin page currently uses a single shared `ADMIN_TOKEN`, not per-user login)
