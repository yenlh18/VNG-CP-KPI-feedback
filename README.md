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
4. Deploy. Vercel will detect Next.js automatically.

## Export responses
Use the protected endpoint with an Authorization header:

`Authorization: Bearer <ADMIN_TOKEN>`

Request `GET /api/export` to download `cp-kpi-feedback.csv`.

For a quick browser-only internal workflow, `/api/export?token=<ADMIN_TOKEN>` also works, but the Authorization header is preferable because it does not place the token in the URL/history.

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
- Internal admin dashboard with response charts / filters
- Screenshot upload for issue reports
- Authentication / VNG SSO
- Automated AI summary of recurring themes
