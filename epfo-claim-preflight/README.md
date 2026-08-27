# ClaimReady - EPFO Claim Preflight (Demo)

ClaimReady is a citizen-facing prototype that helps a member check claim readiness before submission.

## Demo Promise

- Uses synthetic users and synthetic claim/KYC/bank state.
- Does not access live EPFO systems.
- Does not submit real claims or handle OTP/payments.
- Deterministic rules decide readiness; AI explains.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- API routes for deterministic preflight
- Optional OpenAI API integration for intent/explanations

## Main Journey

1. `/demo`
2. `/claim/purpose`
3. `/claim/amount`
4. `/preflight`
5. `/preflight/results`
6. `/preflight/check/[code]`
7. `/preflight/ready`
8. `/claim/review`
9. `/claim/success`

## API Routes

- `POST /api/claim/intake`
- `POST /api/preflight`
- `POST /api/preflight/recheck`
- `POST /api/demo/fix`
- `POST /api/claim/prepare`
- `GET /api/claim/[claimId]`
- `POST /api/ai/intent`
- `POST /api/ai/explain`

## Setup

1. Install Node.js 20+ and npm.
2. From project root run:

```bash
npm install
npm run dev
```

3. Open `http://localhost:3000`.

## Environment

Create `.env.local` from `.env.example`:

```bash
OPENAI_API_KEY=
```

If no API key is set, AI routes use deterministic fallback behavior.

## Rule Source Honesty

This prototype includes `sourceType` fields:

- `official_rule`
- `prototype_rule`
- `mock_state`

For production, each official rule must be mapped to exact EPFO source URL and date.

## Non-goals

- No live EPFO integration
- No real identity verification
- No predictive approval scoring
