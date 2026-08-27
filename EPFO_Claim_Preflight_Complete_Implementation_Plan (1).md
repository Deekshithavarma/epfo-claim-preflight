# Build What Moves India — EPFO Claim Preflight
## Complete Head-to-Toe Implementation Plan

**Project codename:** ClaimReady

**Working product name:** EPFO Claim Preflight

**Core promise:**
> **Before you submit your EPFO claim, know whether you are ready.**

**Prototype type:** Citizen-facing proof of concept using synthetic users, synthetic EPFO records, deterministic mock rules, and OpenAI-powered explanation/intent parsing. No real EPFO account, Aadhaar, PAN, bank account, OTP, payment, or government API should be accessed.

---

# 0. IMPORTANT STATUS OF THIS PLAN

This document is the implementation specification for the **current working direction**. It should be treated as a build-ready plan, but not as permission to invent government rules.

The product idea is locked at the concept level:

> A citizen-side **preflight layer** that checks whether an EPFO member is ready to submit a claim, identifies issues before submission, explains them in simple language, gives a next action, and allows the citizen to re-check readiness.

The exact production rules must be sourced from current EPFO documentation before claiming that a specific condition is a real eligibility rule.

The prototype should clearly distinguish:

1. **Official EPFO-supported conditions** used by the prototype.
2. **Synthetic demo data.**
3. **Prototype-only rules or UX decisions.**
4. **Production dependencies that would require authorized EPFO integration.**

---

# 1. HACKATHON CONTEXT

## 1.1 Build What Moves India

The challenge is to pick one real problem experienced on an Indian public-service website or digital service and build a simpler, clearer, more useful solution.

The organizer's video says the recommended public-service platforms are preferred because the evaluators already understand how those platforms work. The video specifically encourages participants to focus on ideas, interfaces, interactions and value to the end consumer rather than excessive engineering complexity.

The organizer also requires a comprehensive proof of concept. Backend data, accounts and government dependencies may be mocked. Reviewers test the product from the **citizen side**.

### Submission requirements from the organizer

- Public browser-accessible live link.
- No mobile-app download required; the demo must run in a browser.
- Maximum two-minute video.
  - Minute 1: use the product as a citizen.
  - Minute 2: explain how it was built, design decisions and why.
- Exactly 250-word project summary.
- Mock credentials if the product needs a login.
- Synthetic/mock data wherever government systems or sensitive personal data would normally be involved.

### Hard constraint

Do **not** access, test, scrape, reverse-engineer or interfere with a live government system. Do not use real Aadhaar, PAN, bank, OTP, health or other sensitive personal data.

---

# 2. WHY THIS PROJECT DIRECTION

## 2.1 What thousands of AI-assisted builders are likely to build

Expected common directions:

- generic government chatbot
- AI assistant for EPFO
- EPFO status explainer
- redesigned government dashboard
- government-service search engine
- generic multilingual assistant
- “one app for all government services”
- chatbot that fills government forms
- autonomous agent that attempts to operate government portals

These ideas can be useful, but they are easy to generate from a generic prompt such as:

> “How can AI improve EPFO?”

The differentiation strategy is therefore to solve a **specific citizen decision problem** rather than adding an AI chat layer.

## 2.2 The strategic idea

The product should be a **preflight layer**.

The citizen asks:

> “I need to submit an EPFO claim. Am I ready?”

The product answers:

> “Here are the checks that matter. Here is what is okay. Here is what needs attention. Here is what to do next. Re-check when fixed.”

This produces a very clear before/after:

### Current mental model

Submit → discover problem → wait → figure it out → fix → retry

### Our proposed mental model

Intent → preflight → understand → fix → re-check → proceed

## 2.3 Why EPFO remains the leading platform candidate

EPFO's official documentation says online claim filing requires members to ensure their KYC and service-eligibility conditions are correct and complete. EPFO's documentation also identifies prerequisites such as complete KYC, Aadhaar availability, bank account/IFSC availability, activated UAN, and a single Member ID linked to the UAN for Aadhaar-type claim flows.

EPFO also publishes claim-status facilities and maintains multiple claim/advance categories. Recent EPFO material describes additional validation and phased processing during system changes.

**Implication:** there is a credible real-world need for a clearer citizen-facing preparation layer, but the prototype must not claim that EPFO itself lacks validation.

The product message is:

> **EPFO already validates claims. We make those validations understandable and actionable before the citizen submits.**

---

# 3. THE PROBLEM WE ARE SOLVING

## Problem statement

A citizen who wants to submit an EPFO claim may not know whether their profile, KYC, bank information or claim details are ready. Existing government validation can occur during the service process, while the citizen still has to understand what is missing and what to do next.

The problem is not simply that the portal has a bad UI.

The deeper problem is:

> **The citizen needs to know what must be fixed before they start or submit an important government transaction.**

## One-sentence problem

> **Citizens discover claim blockers too late instead of receiving a clear, actionable readiness check before submission.**

---

# 4. WHAT WE ARE BUILDING

## Product definition

**ClaimReady** is a citizen-side preflight experience for an EPFO advance claim.

It checks a synthetic member profile against a set of clearly labeled checks.

For each check it returns:

- Passed
- Needs attention
- Blocking
- Why it matters
- What the citizen can do next

The citizen can then fix simulated issues and run the preflight again.

When all required checks pass:

> **You're ready to proceed.**

The final claim preparation is mocked.

---

# 5. DEMO USE CASE — THE STORY WE SHOW

## Recommended demo: medical emergency

Use case:

> **Rahul needs an urgent PF advance for a family medical expense.**

Why this is the preferred demo:

- easy to understand in seconds
- emotionally relatable
- doesn't require a long explanation of tax/pension terminology
- works well on mobile
- provides a clear reason to need PF money
- creates a natural “I don't want my claim to get stuck” motivation

## Synthetic persona

**Name:** Rahul Sharma

**Age:** 34

**Employment:** Salaried employee

**UAN:** synthetic, e.g. `1000XXXXXX12`

**Current Member ID:** synthetic

**PF balance:** ₹2,80,000 (demo value only)

**Requested advance:** ₹80,000 (demo value only)

**Purpose:** Illness / medical treatment

**Current issue:** One required claim-readiness condition is not ready.

### Important disclaimer

The prototype must never imply that the displayed amount, medical eligibility, settlement time, or exact benefit calculation is an official personalized determination.

---

# 6. THE 60-SECOND CITIZEN JOURNEY

## Screen 1 — Landing

### Headline

> **Need money from your PF?**

### Subheadline

> Check your claim before you submit it.

Primary CTA:

**Check my claim**

Secondary:

**How this works**

Footer:

> Demo only — uses synthetic EPFO data. No real claim or payment will be submitted.

---

## Screen 2 — Choose what you need

Question:

> **What do you need the money for?**

Cards:

- Medical treatment
- Education
- Marriage
- Housing
- Other supported purpose

For the demo, choose **Medical treatment**.

---

## Screen 3 — Amount

Question:

> **How much do you want to claim?**

Input:

₹80,000

Show an unobtrusive note:

> Demo amount. Final admissibility depends on the applicable EPFO rules and member record.

CTA:

**Check readiness**

---

# 7. PREFLIGHT EXPERIENCE

Show a short, purposeful progress sequence:

> Checking your UAN status…
>
> Checking KYC readiness…
>
> Checking linked bank information…
>
> Checking claim details…
>
> Preparing your action plan…

Avoid pretending to make real government API calls.

Use a clearly marked **Demo data** badge.

---

# 8. PREFLIGHT RESULTS — THE MAIN “WOW” SCREEN

### Header

# **Your claim needs attention**

Subheader:

> We found 2 things to fix before you continue.

### Readiness indicator

**2 of 6 checks need attention**

Do NOT present this as:

> “You have a 67% chance of approval.”

It is a checklist/readiness state, not an approval prediction.

### Check cards

#### ✅ UAN

**Ready**

Your UAN is active in this demo profile.

#### ✅ Aadhaar/KYC

**Ready**

The required KYC state is available in this demo profile.

#### ⚠️ Bank details

**Needs attention**

The bank information shown in the claim profile is not in the expected ready state.

Button:

**See what to do**

#### ⚠️ Member profile

**Needs attention**

A profile condition in this demo needs verification before continuing.

Button:

**Review**

#### ✅ Claim purpose

**Ready**

The selected purpose is supported by the demo's configured claim rules.

#### ✅ Required claim fields

**Ready**

All mandatory demo fields are present.

---

# 9. FIX FLOW

## Example problem: bank information

Title:

# **Your bank details need attention**

Explain in plain language:

> The bank information currently associated with this demo member record is not in the ready state required by this prototype.

Then:

### Current state

Bank account: `•••• 4821`

Status: **Needs verification**

### What to do

> In a real EPFO journey, this would depend on the official member/employer verification flow. In this prototype, we simulate that step.

CTA:

**Simulate verification**

After click:

> ✅ Bank details verified for this demo

CTA:

**Re-check my claim**

---

# 10. SECOND FIX FLOW

For the second issue, use a profile/KYC readiness scenario.

Example:

> **Aadhaar KYC approval is pending in the demo profile.**

Show:

- What is missing
- Why it matters
- What action a real user would need to take
- A **Demo: mark as verified** button only inside the sandbox/demo environment

This avoids falsely implying that the prototype can actually modify government records.

---

# 11. SUCCESS STATE

After re-check:

# ✅ **You're ready to proceed**

Subtext:

> All required demo checks are ready for this claim.

Show compact summary:

**Purpose:** Medical treatment

**Requested amount:** ₹80,000

**Checks passed:** 6/6

Primary CTA:

**Review claim**

---

# 12. CLAIM REVIEW

Show a simple, human-readable review page:

### Your claim

**Purpose**

Medical treatment

**Amount**

₹80,000

**Payment account**

•••• 7714

**Member ID**

XXXXXX1234

### Readiness

✅ All required demo checks passed.

CTA:

**Prepare claim**

---

# 13. FINAL DEMO CONFIRMATION

# **Claim prepared successfully**

Show:

> Your claim has been prepared in this demo environment.
>
> No real EPFO claim was submitted.

Buttons:

**View claim summary**

**Start another check**

Optional tiny label:

> Synthetic data • Demo mode

---

# 14. UI DESIGN SYSTEM

## Design principles

The UI should feel:

- calm
- trustworthy
- mobile-first
- government-service appropriate
- modern but not flashy
- extremely clear
- usable by someone with limited digital experience

## Do NOT build

- 3D animations
- complex dashboards
- excessive gradients
- decorative charts that don't help the user
- dense government-style tables
- AI chat as the primary interface
- fake “government official” branding

## Visual hierarchy

Every screen should answer one question:

> **What do I need to do right now?**

## Core components

- top progress indicator
- page title
- one primary question
- large touch-friendly cards
- check-status cards
- expandable “Why this matters” section
- one primary CTA
- secondary text link
- persistent Demo Mode badge

## Status language

Prefer:

- Ready
- Needs attention
- Blocking
- Not required
- Demo check

Avoid:

- Failed
- Error 431
- Invalid
- Rejected

unless the real official system actually uses such wording and it is being quoted accurately.

---

# 15. TECH STACK — OPENAI-FIRST BUILD STRATEGY

The implementation should use OpenAI tools as the primary development and AI layer, while relying on standard web infrastructure only where necessary. The goal is not to force every infrastructure component to be an OpenAI product; the goal is to make Codex and OpenAI materially important to both the build process and the product experience.

## 15.1 Primary development tool — Codex

**Codex** is the primary coding/building agent.

Use Codex for:

- project scaffolding
- Next.js/TypeScript implementation
- component creation and refactoring
- API implementation
- database/schema code
- deterministic preflight engine
- tests
- debugging
- browser-based verification where available
- deployment preparation
- final code review and cleanup

Codex should be a meaningful part of the project, not a last-minute tool used only to generate a few files.

## 15.2 Product AI — OpenAI API

Use the **OpenAI API** as the intelligence layer inside ClaimReady.

Primary uses:

1. Natural-language claim-intent extraction.
2. Structured extraction of amount/purpose from citizen language.
3. Plain-language explanations of deterministic validation results.
4. Conversational clarification when the citizen's request is ambiguous.
5. Hindi/Hinglish-friendly explanations where useful.

The model must return structured data where the application needs reliable machine-readable output.

### Critical architecture rule

> **AI interprets. Deterministic rules decide.**

Never ask the model to independently decide official EPFO eligibility. The model receives structured, already-validated results and explains them to the citizen.

## 15.3 Frontend

**Next.js + TypeScript**

Use the current stable release supported by the chosen deployment environment.

Why:

- browser-first
- fast implementation
- strong component ecosystem
- easy API integration
- straightforward deployment
- good mobile-first support

## 15.4 UI system

**Tailwind CSS + shadcn/ui**

Use shadcn/ui primitives where they improve accessibility and consistency. Build a custom citizen-service visual layer on top rather than cloning an EPFO page.

## 15.5 Icons

**Lucide React**

Use icons sparingly and consistently.

## 15.6 Application/backend layer

Use **Next.js server/API routes** for the hackathon MVP.

Do not build microservices. The application is intentionally a small, coherent POC.

## 15.7 Database

### Preferred: Supabase / PostgreSQL

Use Supabase for:

- synthetic member accounts
- claim scenarios
- synthetic KYC/bank/member records
- deterministic check results
- demo state persistence
- optional session persistence

### OpenAI-first alternative

If ChatGPT Sites provides sufficient database/storage capabilities for the app and the user's account has the required access, evaluate using those built-in capabilities to reduce infrastructure complexity. Do not compromise reliability or the public demo merely to avoid a conventional database.

## 15.8 Deployment — OpenAI-first preference

### Preferred: ChatGPT Sites

If the user's ChatGPT account/workspace supports the required public Site capability, use **ChatGPT Sites** as the preferred deployment path. The hackathon requires a browser-accessible public link, so verify that the published Site can be opened by reviewers without requesting access.

Use this only if the deployed application supports the full ClaimReady journey reliably.

### Fallback: Vercel

If ChatGPT Sites is unavailable, restricted, or technically insufficient for the required public application behavior, deploy the Next.js application on **Vercel**.

The public link must:

- open in a browser
- not require developer access
- work from a fresh/incognito session as appropriate
- expose only synthetic demo data

## 15.9 Source control

Use Git for version control.

Recommended branches:

- `main` — demo-ready
- `dev` — active development

## 15.10 Browser testing

Use Codex/browser development capabilities where available to verify:

- the live citizen journey
- console errors
- broken interactions
- responsive behavior
- network/API failures
- deployment regressions

## 15.11 Optional analytics

Analytics are optional. If used, collect only synthetic interaction events such as:

- `claim_started`
- `intent_detected`
- `preflight_started`
- `issue_viewed`
- `issue_fixed`
- `preflight_passed`
- `claim_prepared`

Do not collect real personal or financial information.

# 16. DATA MODEL

## `demo_users`

```text
id
name
age
masked_uan
member_id
employment_status
pf_balance_demo
```

## `kyc_records`

```text
id
user_id
aadhaar_status
pan_status
bank_status
last_verified_at
```

## `bank_accounts`

```text
id
user_id
masked_account
ifsc
status
is_claim_ready
```

## `claims`

```text
id
user_id
claim_type
purpose
amount
demo_status
created_at
```

## `preflight_checks`

```text
id
claim_id
check_code
label
status
reason
next_action
source_type
```

Where `source_type` can be:

```text
official_rule
prototype_rule
mock_state
```

This is important for honesty and future auditing.

---

# 17. PREFLIGHT RULE ENGINE

## Principle

> **Rules decide. AI explains.**

Never let the LLM determine an official eligibility result by itself.

### Example interface

```ts
export type CheckStatus =
  | "pass"
  | "attention"
  | "blocking";

export interface PreflightCheck {
  code: string;
  label: string;
  status: CheckStatus;
  reason: string;
  action?: string;
  sourceType: "official_rule" | "prototype_rule" | "mock_state";
}
```

### Example checks

1. UAN activation / availability.
2. Required KYC readiness.
3. Aadhaar availability where applicable.
4. Registered bank account readiness.
5. Required Member ID linkage.
6. Selected claim purpose support.
7. Required claim fields completed.

The exact rule set should be frozen from the official documentation chosen for the demo.

---

# 18. AI IMPLEMENTATION

## Flow

### User input

> “I need some PF money urgently for my mother's treatment.”

### Model output

```json
{
  "intent": "pf_advance",
  "purpose": "illness",
  "amount": null,
  "needs_clarification": true,
  "clarification_question": "How much would you like to request?"
}
```

The application validates this structured result before using it.

## Explanation flow

The rule engine returns:

```json
{
  "code": "BANK_NOT_READY",
  "status": "attention",
  "reason": "Registered bank account is not in ready state."
}
```

The AI turns this into:

> “Your bank details need attention before you continue. In this demo, the account linked to your profile is not yet in the required ready state.”

The UI still displays the deterministic status.

---

# 19. API CONTRACTS

## `POST /api/claim/intake`

Input:

```json
{
  "userId": "demo-rahul",
  "purpose": "illness",
  "amount": 80000
}
```

Output:

```json
{
  "claimId": "claim-001",
  "status": "draft"
}
```

## `POST /api/preflight`

Input:

```json
{
  "claimId": "claim-001"
}
```

Output:

```json
{
  "overallStatus": "attention",
  "checks": []
}
```

## `POST /api/demo/fix`

Input:

```json
{
  "claimId": "claim-001",
  "fix": "verify_bank"
}
```

Output:

```json
{
  "success": true
}
```

## `POST /api/claim/prepare`

Input:

```json
{
  "claimId": "claim-001"
}
```

Output:

```json
{
  "status": "prepared",
  "demoOnly": true
}
```

---

# 20. SECURITY / PRIVACY

## Never collect

- real Aadhaar number
- real PAN
- real bank account number
- real UAN
- real OTP
- real payment details
- health records
- government passwords

## Use

- fixed demo users
- masked synthetic identifiers
- fake bank accounts
- fake timestamps
- fake balances
- fake claims

## AI privacy

Do not send any real personal data to the model.

For the prototype, AI receives only synthetic or abstracted data.

---

# 21. RESPONSIVE DESIGN

Primary breakpoint:

**Mobile first.**

Design at approximately 390px wide first.

Then support tablet/desktop.

The evaluator should be able to open the link on a laptop, but the UI should feel like it was designed for a citizen's phone.

---

# 22. LOGIN / DEMO ENTRY

Do not waste the evaluator's time on a fake OTP.

Landing option:

### **Try demo**

or

### Demo login

```text
Mobile: 9000000001
OTP: 123456
```

Clearly label:

> Synthetic demo credentials.

Better still: a single **Try Demo** button that logs into a fixed synthetic account.

---

# 23. IMPLEMENTATION ORDER — OPENAI-FIRST

## Phase 0 — Validate before coding

- Re-check the exact current EPFO sources selected for the demo.
- Mark every validation as either official-source-backed, synthetic demo logic, or production dependency.
- Lock the single demo journey.

## Phase 1 — Codex project setup

Use Codex to:

- create the Next.js application
- configure TypeScript
- configure Tailwind CSS
- install/configure shadcn/ui
- create the application shell
- set environment variables
- establish Git structure
- create the initial README and architecture notes

## Phase 2 — UI-first citizen journey

Build all screens using local synthetic data before connecting the database or AI.

Required screens:

1. Landing.
2. Claim-purpose selection / natural-language intake.
3. Amount input.
4. Preflight progress.
5. Preflight results.
6. Issue details.
7. Fix simulation.
8. Re-check.
9. Ready state.
10. Claim review.
11. Prepared confirmation.

At the end of this phase, a reviewer should be able to complete the entire demo using local mock state.

## Phase 3 — Deterministic preflight engine

Use Codex to implement a server-side deterministic rules module.

The engine must return structured check results such as:

- pass
- warning
- blocker
- explanation key
- recommended action

No LLM should be responsible for the final readiness decision.

## Phase 4 — Supabase / persistent mock backend

Add synthetic users and persistent state if needed.

Keep the schema minimal. There is no need for real authentication or a production-grade identity system.

## Phase 5 — OpenAI product integration

Use the OpenAI API for:

1. Intent extraction from natural-language citizen input.
2. Structured extraction of amount/purpose.
3. Clarifying questions for ambiguity.
4. Plain-language explanation of rule-engine results.
5. Optional Hindi/Hinglish explanation.

The API contract must constrain outputs to the fields the application expects.

## Phase 6 — Codex-driven automated and browser testing

Use Codex to test:

- full Rahul demo journey
- direct deep links
- page refresh
- mobile layout
- slow network
- empty state
- retry state
- OpenAI timeout/failure
- invalid amount
- ambiguous natural-language request
- deterministic rule failure
- repeated re-check

## Phase 7 — Deployment

### First choice

Attempt deployment through **ChatGPT Sites** when the user's account supports a sufficiently capable public Site. Verify public access from a fresh browser session.

### Fallback

Deploy the Next.js application to **Vercel** if Sites is unavailable or insufficient.

## Phase 8 — Demo polish

Use Codex to review the deployed build as a citizen. Remove unnecessary screens, fix visual inconsistencies, optimize loading, and ensure the first-minute story is obvious without narration.

---

# 24. WHAT MUST BE WORKING IN THE MVP

The evaluator must be able to:

1. Enter the demo.
2. Choose medical treatment.
3. Enter ₹80,000.
4. Run the preflight.
5. See at least two issues.
6. Open the issue explanation.
7. Simulate fixing each issue.
8. Re-run the preflight.
9. See all required checks pass.
10. Review the claim.
11. Prepare the claim.
12. Understand that no real government action occurred.

If any of these fail, the MVP is not ready.

---

# 25. DEMO SCRIPT

## First minute — citizen journey

### 0–5 sec

> “I need money from my PF for a medical emergency.”

### 5–12 sec

Select:

**Medical treatment → ₹80,000**

### 12–20 sec

Preflight animation.

### 20–30 sec

Show:

> **Your claim needs attention.**

Two problems appear.

### 30–40 sec

Open the problem.

Show:

> What is wrong → Why it matters → What to do.

### 40–48 sec

Simulate the fixes.

### 48–55 sec

Re-check.

> **You're ready.**

### 55–60 sec

Prepare claim.

> **Claim prepared successfully.**

> Demo only. No real claim submitted.

---

# 26. SECOND MINUTE — TECH EXPLANATION

Use this structure:

### Problem

> “We noticed that a citizen has to understand multiple claim prerequisites and validations before an EPFO claim is ready.”

### Solution

> “We built ClaimReady, a preflight layer that turns those checks into an actionable citizen journey.”

### Architecture

> “Deterministic rules decide readiness. OpenAI interprets natural-language intent and explains the result.”

### Data

> “All user, claim, bank and KYC data in this POC is synthetic.”

### Production

> “In production, the same layer could connect to authorized EPFO interfaces while leaving EPFO as the system of record.”

---

# 27. SUCCESS METRICS FOR THE PRODUCT

For the demo, focus on these conceptual metrics:

### Reduced failed-first-attempt claims

Potential production goal:

> percentage of claims submitted after all required checks are ready.

### Reduced citizen confusion

Measure in a future pilot:

> percentage of users who understand their next action without help.

### Reduced repeat attempts

Potential future measure:

> number of repeated claim attempts caused by fixable missing prerequisites.

Do not claim these metrics are already achieved by the prototype.

---

# 28. PRODUCTION ADOPTION STORY

The product should be pitched as an **incremental layer**, not a new government system.

### Current

EPFO backend + portal + validation

### Proposed

Citizen
↓
ClaimReady preflight
↓
Authorized EPFO data / validation interfaces
↓
Existing EPFO claim process

ClaimReady does not own the official claim record.

It only prepares and educates the citizen before submission.

This is important because the hackathon explicitly values end-to-end thinking while permitting mocked dependencies.

---

# 29. WHAT NOT TO BUILD

Do not build:

- autonomous login into EPFO
- scraping EPFO
- browser automation against the live portal
- real Aadhaar authentication
- real OTP handling
- real payments
- a generic government chatbot
- all EPFO services at once
- a giant multi-agent architecture
- an admin dashboard as the main product
- predictive approval percentages unless backed by a validated model and clearly labeled

---

# 30. ACCEPTANCE TEST FOR THE IDEA

Before finalizing the project, ask five questions:

### Can the judge understand the problem in 10 seconds?

Yes:

> “Before I submit my PF claim, check whether I'm ready.”

### Is the difference from the current flow obvious?

Yes:

> Before submission instead of after failure.

### Does AI have a meaningful role?

Yes:

> intent interpretation + explanation + multilingual assistance.

### Is it realistically implementable?

Yes:

> citizen-side layer over existing systems.

### Can it be demonstrated in one minute?

Yes:

> select purpose → check → fix → ready → prepare.

---

# 31. COPY-PASTE MASTER PROMPT FOR A CODING AGENT

Use the following as the implementation prompt after the product decision has been validated against the chosen current EPFO sources.

```text
You are the lead full-stack engineer building a hackathon POC called ClaimReady / EPFO Claim Preflight for Build What Moves India.

GOAL
Build a polished citizen-facing web prototype that helps an EPFO member check whether they are ready to submit a PF advance claim, explains problems in plain language, lets them simulate fixing demo issues, re-runs the checks, and prepares a mock claim.

IMPORTANT SAFETY CONSTRAINTS
- Do not access or automate the live EPFO portal.
- Do not scrape EPFO.
- Do not use real Aadhaar, PAN, UAN, bank account numbers, OTPs, passwords or health data.
- Use synthetic data only.
- Never claim that the prototype submitted a real claim.
- Clearly label demo/mock states.

TECH STACK / OPENAI-FIRST BUILD STRATEGY
- Codex is the primary coding/building agent.
- Next.js + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase/PostgreSQL for synthetic state when needed
- OpenAI API for intent extraction, structured outputs, clarification, and plain-language explanation
- ChatGPT Sites is the preferred deployment option if the user's account supports the required public Site behavior.
- Vercel is the fallback deployment option if ChatGPT Sites is unavailable or insufficient.

OPENAI PRINCIPLE
- Codex should be used meaningfully throughout implementation, testing, debugging, and deployment preparation.
- AI interprets; deterministic rules decide.
- Never use the model as the source of truth for official EPFO eligibility.

CORE PRINCIPLE
Rules decide. AI explains.

The LLM must never be the source of truth for government eligibility.
Deterministic rules must produce the readiness state.
The AI can convert structured results into plain language and extract intent from natural-language input.

DEMO USER
Rahul Sharma
Age: 34
Synthetic UAN: 1000XXXXXX12
Synthetic member ID: XXXX1234
Synthetic PF balance: ₹2,80,000
Purpose: medical treatment
Requested amount: ₹80,000

DEMO JOURNEY
1. Landing: “Need money from your PF? Check your claim before you submit it.”
2. Choose purpose: Medical treatment.
3. Enter amount: ₹80,000.
4. Run preflight.
5. Show 6 deterministic checks.
6. Initially show 2 checks needing attention.
7. Explain each problem clearly.
8. Allow simulated fixes.
9. Re-run checks.
10. Show “You’re ready to proceed.”
11. Review claim.
12. Prepare mock claim.
13. Show “Claim prepared successfully — Demo only.”

SCREENS
- /demo
- /claim/purpose
- /claim/amount
- /preflight
- /preflight/results
- /preflight/check/[code]
- /preflight/ready
- /claim/review
- /claim/success

API ENDPOINTS
POST /api/claim/intake
POST /api/preflight
POST /api/demo/fix
POST /api/preflight/recheck
POST /api/claim/prepare

DATABASE
Create synthetic tables for:
- demo_users
- kyc_records
- bank_accounts
- claims
- preflight_checks

RULE ENGINE
Implement deterministic checks for the conditions selected from the current official EPFO source set. Each result must include:
- code
- label
- status
- reason
- nextAction
- sourceType

Use sourceType values:
- official_rule
- prototype_rule
- mock_state

AI FEATURES
1. Parse user sentence like “I need PF money for my mother’s treatment.”
2. Return structured JSON.
3. Ask a clarification question if amount or purpose is missing.
4. Explain deterministic check failures in plain English.
5. Optionally provide Hindi/Hinglish explanation.

UX REQUIREMENTS
- Mobile-first.
- Very simple language.
- One question per screen where practical.
- Large tap targets.
- Clear status labels.
- No unnecessary dashboard complexity.
- Persistent “Demo mode” marker.
- Accessible keyboard navigation.
- Good loading/error states.

DO NOT BUILD
- live EPFO integrations
- OTP flows
- autonomous government-site agents
- admin dashboards
- unnecessary microservices
- unsupported government eligibility claims

DEMO QUALITY BAR
The entire citizen journey must work from a fresh browser session.
A reviewer must be able to understand the product in less than 10 seconds and complete the main journey in under one minute.

DELIVERABLES
1. Working Next.js application.
2. Seeded synthetic data.
3. Functional deterministic preflight engine.
4. OpenAI explanation/intent layer.
5. Responsive UI.
6. README with architecture and setup.
7. Explicit mock-data and production-integration disclosure.
8. Demo credentials or one-click Demo mode.

Before implementing any government rule, cite the exact official source used inside the project documentation. Never silently invent rules.
```

---

# 32. FINAL PRODUCT IN ONE SENTENCE

> **ClaimReady helps an EPFO member discover and fix claim blockers before submitting a PF advance claim, instead of finding out after the claim gets stuck.**

# 33. FINAL PRODUCT IN FIVE WORDS

**Check → Explain → Fix → Recheck → Proceed**

---

# 34. CURRENT OFFICIAL EPFO SOURCES TO USE DURING IMPLEMENTATION

Use official EPFO material as the source of truth for any rule included in the final product.

1. EPFO FAQ — online claim process and prerequisites.
2. EPFO Composite Claim Form manual — Aadhaar-type claim preconditions.
3. EPFO Form 31 documentation — advance purposes and historical eligibility tables.
4. EPFO 2025 release on auto-settlement of advance claims.
5. Current EPFO Unified Portal notices — service/validation context.

The implementation agent must re-check the current official documents at build time because government rules and portal behavior can change.

---

# 35. RESEARCH NOTES

### Organizer / hackathon

The organizer's transcript supplied with this project states that the focus is on citizen-facing experience, ideas and interactions; that mock backend/data/accounts are acceptable; and that the first minute of the demo must show the citizen journey.

### EPFO

Official EPFO sources confirm, among other things:

- online claim workflows use the member interface and require relevant KYC/service conditions to be correct/complete;
- EPFO documents identify Aadhaar, bank account/IFSC, UAN activation and Member ID linkage as relevant prerequisites for Aadhaar-type claim flows;
- Form 31 covers multiple advance purposes;
- EPFO has expanded auto-settlement of advance claims and continues to evolve its validation/service-delivery flows.

Do not convert historical EPFO documents into a claim of current rules without checking the current source set.

---

# 36. FINAL BUILD PRINCIPLE

Do not try to out-engineer thousands of participants.

Build one citizen journey so clearly and thoughtfully that the evaluator immediately sees the missing product layer.

The winning demo should make the evaluator think:

> **“Why couldn't the government tell the citizen this before they submitted?”**

That is the product insight we are trying to demonstrate.
