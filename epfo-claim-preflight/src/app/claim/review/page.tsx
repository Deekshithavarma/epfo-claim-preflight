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
  paymentAccountMasked: string;
  memberId: string;
}

function ReviewPageContent() {
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
    <AppShell title="Your claim" subtitle="All required demo checks passed.">
      <section className="gov-card space-y-3 p-5">
        <p className="text-sm text-muted">Purpose: {claim ? readablePurpose(claim.purpose) : "..."}</p>
        <p className="text-sm text-muted">Amount: {claim ? formatInr(claim.amount) : "..."}</p>
        <p className="text-sm text-muted">Payment account: {claim?.paymentAccountMasked ?? "..."}</p>
        <p className="text-sm text-muted">Member ID: {claim?.memberId ?? "..."}</p>
        <p className="rounded-xl bg-brandSoft p-3 text-sm text-brand">All required demo checks passed.</p>
        <Link href="/claim/success" className="gov-primary-btn">
          Continue
        </Link>
      </section>
    </AppShell>
  );
}

export default function ReviewPage() {
  return (
    <Suspense
      fallback={
        <AppShell title="Your claim" subtitle="Loading review details...">
          <p className="gov-card p-5 text-sm text-muted">Loading claim details...</p>
        </AppShell>
      }
    >
      <ReviewPageContent />
    </Suspense>
  );
}
