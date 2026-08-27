"use client";

import { AppShell } from "@/components/app-shell";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const steps = [
  "Checking your UAN status...",
  "Checking KYC readiness...",
  "Checking linked bank information...",
  "Checking claim details...",
  "Finishing your action plan...",
];

function PreflightPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const claimId = searchParams.get("claimId");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!claimId) {
      router.push("/claim/purpose");
      return;
    }

    const timer = setInterval(() => {
      setIndex((current) => {
        if (current >= steps.length - 1) {
          clearInterval(timer);
          void fetch("/api/preflight", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ claimId }),
          }).finally(() => {
            router.push(`/preflight/results?claimId=${claimId}`);
          });
          return current;
        }
        return current + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [claimId, router]);

  return (
    <AppShell title="Running preflight" subtitle="Checking your claim readiness using demo data.">
      <div className="gov-card space-y-3 p-5">
        {steps.map((step, stepIndex) => (
          <p key={step} className={stepIndex <= index ? "text-ink" : "text-muted"}>
            {step}
          </p>
        ))}
      </div>
    </AppShell>
  );
}

export default function PreflightPage() {
  return (
    <Suspense
      fallback={
        <AppShell title="Running preflight" subtitle="Loading preflight...">
          <p className="gov-card p-5 text-sm text-muted">Loading checks...</p>
        </AppShell>
      }
    >
      <PreflightPageContent />
    </Suspense>
  );
}
