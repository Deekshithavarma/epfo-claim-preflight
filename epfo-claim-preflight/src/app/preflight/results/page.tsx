"use client";

import { AppShell } from "@/components/app-shell";
import { StatusPill } from "@/components/status-pill";
import { PreflightResult } from "@/lib/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

function PreflightResultsPageContent() {
  const searchParams = useSearchParams();
  const claimId = searchParams.get("claimId");
  const [result, setResult] = useState<PreflightResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!claimId) {
      return;
    }

    void fetch("/api/preflight/recheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ claimId }),
    })
      .then((response) => response.json())
      .then((data: PreflightResult) => setResult(data))
      .finally(() => setLoading(false));
  }, [claimId]);

  const heading = useMemo(() => {
    if (!result) {
      return "Checking your result";
    }
    if (result.overallStatus === "ready") {
      return "You're ready to proceed";
    }
    if (result.overallStatus === "blocking") {
      return "Your claim is blocked";
    }
    return "Your claim needs attention";
  }, [result]);

  if (!claimId) {
    return (
      <AppShell title="Missing claim" subtitle="Start a demo claim first.">
        <Link className="text-brand" href="/claim/purpose">
          Start claim
        </Link>
      </AppShell>
    );
  }

  return (
    <AppShell title={heading} subtitle="Make sure all prerequisites are complete before you submit your claim.">
      <section className="gov-card space-y-4 p-5">
        {loading || !result ? (
          <p className="text-sm text-muted">Loading checks...</p>
        ) : (
          <>
            <p className="text-sm font-semibold text-ink">
              {result.summary.attention + result.summary.blocking} of {result.summary.total} checks need attention
            </p>
            <div className="space-y-3">
              {result.checks.map((check) => (
                <article key={check.code} className="rounded-xl border border-slate-200 p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-ink">{check.label}</h3>
                    <StatusPill status={check.status} />
                  </div>
                  <p className="text-sm text-muted">{check.reason}</p>
                  {check.status !== "pass" ? (
                    <Link
                      href={`/preflight/check/${check.code}?claimId=${claimId}`}
                      className="mt-3 inline-block text-sm font-semibold text-brand"
                    >
                      See what to do
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
            {result.overallStatus === "ready" ? (
              <Link
                href={`/preflight/ready?claimId=${claimId}`}
                className="gov-primary-btn"
              >
                Continue
              </Link>
            ) : null}
          </>
        )}
      </section>
    </AppShell>
  );
}

export default function PreflightResultsPage() {
  return (
    <Suspense
      fallback={
        <AppShell title="Checking your result" subtitle="Loading preflight results...">
          <p className="gov-card p-5 text-sm text-muted">Loading checks...</p>
        </AppShell>
      }
    >
      <PreflightResultsPageContent />
    </Suspense>
  );
}
