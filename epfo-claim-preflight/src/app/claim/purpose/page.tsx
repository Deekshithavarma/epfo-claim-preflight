"use client";

import { AppShell } from "@/components/app-shell";
import { useRouter } from "next/navigation";

const PURPOSES = [
  { value: "medical_treatment", label: "Medical treatment" },
  { value: "education", label: "Education" },
  { value: "marriage", label: "Marriage" },
  { value: "housing", label: "Housing" },
  { value: "other", label: "Other supported purpose" },
];

export default function PurposePage() {
  const router = useRouter();

  return (
    <AppShell title="What do you need the money for?" subtitle="Choose the best matching purpose.">
      <div className="space-y-3">
        {PURPOSES.map((purpose) => (
          <button
            key={purpose.value}
            onClick={() => router.push(`/claim/amount?purpose=${purpose.value}`)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-4 text-left font-medium text-ink shadow-card transition hover:border-brand"
          >
            {purpose.label}
          </button>
        ))}
      </div>
    </AppShell>
  );
}
