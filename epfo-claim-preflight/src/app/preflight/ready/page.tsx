"use client";

import { AppShell } from "@/components/app-shell";
import { formatInr, readablePurpose } from "@/lib/format";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface ClaimSnapshot {
  id: string;
  purpose: string;
  amount: number;
  checksPassed: number;
  checksTotal: number;
}

function ReadyPageContent() {
  const searchParams = useSearchParams();
  const claimId = searchParams.get("claimId");
  const [claim, setClaim] = useState<ClaimSnapshot | null>(null);

  useEffect(() => {
    if (!claimId) {
      return;
    }

    void fetch(`/api/claim/${claimId}`)
      .then((response) => response.json())
      .then((data: ClaimSnapshot) => setClaim(data));
  }, [claimId]);

  return (
    <AppShell title="You're ready to proceed" subtitle="All required demo checks are ready for this claim.">
      <section className="gov-card space-y-3 p-5">
        <p className="text-sm text-muted">Purpose: {claim ? readablePurpose(claim.purpose) : "..."}</p>
        <p className="text-sm text-muted">Requested amount: {claim ? formatInr(claim.amount) : "..."}</p>
        <p className="text-sm text-muted">
          Checks passed: {claim ? `${claim.checksPassed}/${claim.checksTotal}` : "..."}
        </p>
        {claimId ? (
          <Link
            href={`/claim/review?claimId=${claimId}`}
            className="gov-primary-btn"
          >
            Review claim
          </Link>
        ) : null}
      </section>
    </AppShell>
  );
}

export default function ReadyPage() {
  return (
    <Suspense
      fallback={
        <AppShell title="You're ready to proceed" subtitle="Loading claim summary...">
          <p className="gov-card p-5 text-sm text-muted">Loading summary...</p>
        </AppShell>
      }
    >
      <ReadyPageContent />
    </Suspense>
  );
}
