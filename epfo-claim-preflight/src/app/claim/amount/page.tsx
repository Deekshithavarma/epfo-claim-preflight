"use client";

import { AppShell } from "@/components/app-shell";
import { formatInr } from "@/lib/format";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function AmountPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const purpose = searchParams.get("purpose") ?? "medical_treatment";
  const [amount, setAmount] = useState(80000);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/claim/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "demo-rahul",
          purpose,
          amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create demo claim");
      }

      const data = (await response.json()) as { claimId: string };
      router.push(`/preflight?claimId=${data.claimId}`);
    } catch {
      setError("Could not start claim. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppShell title="How much do you want to claim?" subtitle="Demo amount only. Final admissibility depends on official EPFO rules.">
      <form onSubmit={onSubmit} className="gov-card space-y-4 p-5">
        <label className="block text-sm font-medium text-muted" htmlFor="amount">
          Requested amount
        </label>
        <input
          id="amount"
          type="number"
          min={1}
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-xl font-semibold"
        />
        <p className="text-sm text-muted">Preview: {formatInr(amount || 0)}</p>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <button
          disabled={submitting}
          className="gov-primary-btn disabled:opacity-60"
          type="submit"
        >
          {submitting ? "Starting..." : "Check readiness"}
        </button>
      </form>
    </AppShell>
  );
}

export default function AmountPage() {
  return (
    <Suspense
      fallback={
        <AppShell title="How much do you want to claim?" subtitle="Loading claim setup...">
          <p className="gov-card p-5 text-sm text-muted">Loading amount form...</p>
        </AppShell>
      }
    >
      <AmountPageContent />
    </Suspense>
  );
}
