# ClaimReady — EPFO Form 31 Preflight Demo

Unofficial prototype. Not affiliated with EPFO or the Government of India. Uses synthetic demo data only. It does not access live EPFO, UAN, Aadhaar, or bank systems.

**Live demo:** [https://epfo-claim-preflight.vercel.app/](https://epfo-claim-preflight.vercel.app/)

A citizen-facing prototype of the EPFO Unified Portal **Online Services** flow. A member logs in (demo), fills PF Advance (Form 31), can run a **Check Eligibility** preflight, and can **Validate OTP and Submit Claim** to see a success popup.

## How to run

```bash
cd epfo-claim-preflight
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You land on Member Login; any credentials work. After login you are sent to `/online-services`.

## What the app does today

1. **Login** (`/login`) — demo gate stored in `localStorage`.
2. **Online Services** (`/online-services`) — Form 31: claim type, member ID, purpose, amount, address, Aadhaar consent, OTP.
3. **Check Eligibility** — creates a demo claim, runs in-memory preflight, shows blockers and demo “fix” actions.
4. **Validate OTP and Submit Claim** — success popup, then the form resets to the empty claim-type selector.
5. **Portal chrome** — Home / View / Manage / Account / PMVBRY and A+/EN are “Coming soon” placeholders so the header matches the real portal.

## Tech stack checklist

| Layer | Choice | Why |
| --- | --- | --- |
| Runtime | Node.js 20+ | Next.js App Router requirement |
| Framework | Next.js (App Router) | Pages, layouts, and API routes in one app |
| Language | TypeScript | Typed claim records, check statuses, form draft |
| UI | React 18 | Client forms, OTP timer, success modal |
| Styling | Tailwind CSS 3 + `globals.css` | Portal colors, nav strip, form grid |
| Icons | lucide-react | Header nav and modal icons |
| Images | `next/image` | EPFO emblem in header/login |
| State | React state + `sessionStorage` / `localStorage` | Form draft and demo login; no database |
| Backend | Next.js Route Handlers (`src/app/api`) | Claim intake and preflight on the same host |
| Rules engine | `src/lib/preflight.ts` | Deterministic checks (UAN, KYC, bank, profile, purpose, amount) |
| Demo data | `src/lib/demo-store.ts` | In-memory Map of claims; resets when the server restarts |
| Deploy | Vercel | Static/SSR Next app; set Root Directory to `epfo-claim-preflight` |

No OpenAI key, no database, no live UAN/OTP/UIDAI integration.

## How this was built

1. **Portal clone first** — Match Unified Portal header, teal nav, and Form 31 layout so the demo feels like the real site.
2. **Demo auth** — Login is a front door only; it does not validate UAN/password.
3. **One primary form** — Purpose, amount, and OTP live on Online Services instead of a separate wizard.
4. **Preflight as eligibility** — Check Eligibility POSTs `/api/claim/intake`, then `/api/preflight`. Results and per-check pages use the same in-memory claim.
5. **Submit is local UX** — OTP is any 6 digits. Success is a modal. Draft is cleared so the member is back on “Select Claim Option”.
6. **Honest mock rules** — Each check has `sourceType`: `mock_state` or `prototype_rule`. This is not official EPFO scoring.

## Remaining routes

**Member flow:** `/login` → `/online-services` → `/preflight` → `/preflight/results` → `/preflight/check/[code]` → `/preflight/ready`

**APIs:** `POST /api/claim/intake`, `GET /api/claim/[claimId]`, `POST /api/preflight`, `POST /api/preflight/recheck`, `POST /api/demo/fix`

**Placeholders:** `/demo`, `/view`, `/manage`, `/account`, `/pmvbry`, `/aadhaar-verified-services`, `/utilities/font-increase`, `/utilities/language`

## Future enhancements

- **Live EPFO / UAN APIs** — Real KYC, bank seeding, and claim status instead of in-memory mocks.
- **Real Aadhaar OTP** — UIDAI/eNPS-style auth; drop the “any 6 digits” demo.
- **Persistent store** — Postgres or similar so claims survive server restart and can be listed under View/Manage.
- **Eligibility rules from official circulars** — Map each check to an EPFO URL, date, and Form 31 clause; store `official_rule` with citations.
- **Amount vs eligible balance** — Compute admissible advance from service, purpose, and contribution history.
- **PDF acknowledgement** — Generate a real receipt for “CLICK HERE to view pdf” instead of jumping to preflight.
- **Hindi / accessibility** — Wire EN and A+ to language and font size instead of Coming soon pages.
- **Fill remaining portal tabs** — Home, View, Manage, Account, PMVBRY as real sections, not placeholders.
- **Multi-user demo profiles** — Switch members (blocked KYC, ready bank, pensioner) without code changes.
- **Audit log** — Timestamped trail of eligibility checks and submit attempts for hackathon judging.
- **Tests** — Unit tests for `runPreflight`, plus Playwright for login → Form 31 → OTP → reset.
- **AI copilot (optional)** — Explain a failed check in plain language; keep rules deterministic, LLM as explanation only.

## Non-goals (still true)

- No live EPFO integration
- No real identity verification
- No predictive “will this be approved” score
