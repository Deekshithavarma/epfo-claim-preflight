import { CheckStatus } from "@/lib/types";

const styles: Record<CheckStatus, string> = {
  pass: "border border-green-300 bg-successSoft text-success",
  attention: "border border-amber-300 bg-warnSoft text-warn",
  blocking: "border border-red-300 bg-red-100 text-danger",
};

const labels: Record<CheckStatus, string> = {
  pass: "Ready",
  attention: "Needs attention",
  blocking: "Blocking",
};

export function StatusPill({ status }: { status: CheckStatus }) {
  return <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>{labels[status]}</span>;
}
