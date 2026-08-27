"use client";

import { AppShell } from "@/components/app-shell";
import { StatusPill } from "@/components/status-pill";
import { PreflightCheck, PreflightResult } from "@/lib/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

function actionByCode(code: string): string | null {
  if (code === "BANK_NOT_READY") {
    return "verify_bank";
  }
  if (code === "MEMBER_PROFILE_PENDING") {
    return "verify_member_profile";
  }
  return null;
}

function CheckDetailPageContent() {
  const params = useParams<{ code: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const claimId = searchParams.get("claimId");
  const [check, setCheck] = useState<PreflightCheck | null>(null);
  const [working, setWorking] = useState(false);

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
      .then((data: PreflightResult) => {
        const found = data.checks.find((item) => item.code === params.code);
        setCheck(found ?? null);
      });
  }, [claimId, params.code]);

  const fixAction = useMemo(() => actionByCode(params.code), [params.code]);

  async function runFix() {
    if (!claimId || !fixAction) {
      return;
    }

    setWorking(true);
    await fetch("/api/demo/fix", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ claimId, fix: fixAction }),
    });
    setWorking(false);
    router.push(`/preflight/results?claimId=${claimId}`);
  }

  return (
    <AppShell title={check?.label ?? "Check detail"} subtitle="Understand the issue and take the next action.">
      {!check ? (
        <p className="gov-card p-5 text-sm text-muted">Loading check details...</p>
      ) : (
        <section className="gov-card space-y-4 p-5">
          <StatusPill status={check.status} />
          <p className="text-sm text-muted">{check.reason}</p>
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-muted">
            <p className="font-semibold text-ink">Why this matters</p>
            <p>
              In a real EPFO journey, this depends on official member and verification records. In this prototype,
              this state is simulated.
            </p>
          </div>
          {fixAction ? (
            <button
              onClick={runFix}
              disabled={working}
              className="gov-primary-btn disabled:opacity-60"
            >
              {working ? "Applying demo fix..." : "Demo: mark as verified"}
            </button>
          ) : null}
          {claimId ? (
            <button onClick={() => router.push(`/preflight/results?claimId=${claimId}`)} className="text-sm font-semibold text-brand">
              Back to checks
            </button>
          ) : null}
        </section>
      )}
    </AppShell>
  );
}

export default function CheckDetailPage() {
  return (
    <Suspense
      fallback={
        <AppShell title="Check detail" subtitle="Loading check details...">
          <p className="gov-card p-5 text-sm text-muted">Loading check details...</p>
        </AppShell>
      }
    >
      <CheckDetailPageContent />
    </Suspense>
  );
}
