import { AppShell } from "@/components/app-shell";
import Link from "next/link";

export default function ClaimSuccessPage() {
  return (
    <AppShell title="You're all set to claim ✅">
      <section className="gov-card space-y-3 p-5">
        <Link href="/online-services" className="gov-primary-btn">
          Continue with the claim
        </Link>
      </section>
    </AppShell>
  );
}
