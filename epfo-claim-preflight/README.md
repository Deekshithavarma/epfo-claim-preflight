# ClaimReady — Check Eligibility for EPFO Form 31

Hackathon prototype. Unofficial visual mock of the EPFO Unified Portal. Not affiliated with EPFO or the Government of India.

Every page is a **dummy screen**. There is **no real integration** with government websites, UAN, Aadhaar, OTP, or bank systems. Login, claims, and checks all use synthetic demo data.

The UI is built to **look and feel like the real EPFO site** so the new idea is easy to understand: a **Check Eligibility** button on Form 31. The point of the prototype is to show how useful this would be if the **actual EPFO website** offered the same option before submit.

**Live demo:** [https://epfo-claim-preflight.vercel.app/](https://epfo-claim-preflight.vercel.app/)

## Why this exists

EPFO lets citizens apply for PF advances for needs such as illness, education, and housing. Today the journey is: fill the claim, submit, then wait. If the claim is rejected, people often find out only after that wait. There is no simple way to check and fix problems **before** submitting.

ClaimReady adds a **Check Eligibility** step to that mock government flow. The idea is to move from a reactive “submit and hope” model to a **readiness check**: run pre-flight validation, show what needs attention, and let the citizen address blockers before they validate OTP and submit.

This does not predict whether EPFO will approve a claim. It is a pre-submission readiness check meant to cut confusion, avoidable delays, and repeated attempts.

## What Check Eligibility does

On the Form 31 screen the citizen:

1. Selects **PF ADVANCE (FORM-31)**
2. Chooses an eligible service
3. Selects the purpose for the advance
4. Enters the amount and address
5. Clicks **Check Eligibility** before **Validate OTP and Submit Claim**

The app runs pre-flight checks (UAN, KYC, bank details, member profile, purpose, required fields) and shows what is ready, what needs attention, and what is blocking. If something fails, they can open that check, see why, and in this demo mark simulated issues as verified, then re-check. If everything is ready, they can continue with the claim.

## How to walk through it in the UI

1. Open the [live demo](https://epfo-claim-preflight.vercel.app/) or run locally (below).
2. On **Member Login**, enter any UAN and password (demo login is not verified) and click **Login**.
3. You land on **Online Services**. Under **I want to apply for**, select **PF ADVANCE (FORM-31)**. The other claim types are disabled in this prototype.
4. Select an eligible service, a purpose, and an amount.
5. Click **Check Eligibility**.
6. Wait for the pre-flight steps, then read the results: ready / needs attention / blocking.
7. Open a check that needs attention, use the demo verify action if shown, and go back to results.
8. When checks pass, continue. Separately, **Validate OTP and Submit Claim** is the mock submit path (any 6-digit OTP).

## Run locally

```bash
cd epfo-claim-preflight
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and follow the same UI path.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI | React, Tailwind CSS, lucide-react |
| Eligibility rules | Deterministic preflight in `src/lib/preflight.ts` |
| Demo data | In-memory store (resets when the server restarts) |
| Hosting | Vercel |
