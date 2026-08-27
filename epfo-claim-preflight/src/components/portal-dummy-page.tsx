import { AppShell } from "@/components/app-shell";
import Link from "next/link";

interface PortalDummyPageProps {
  title?: string;
  subtitle?: string;
  points?: string[];
}

export function PortalDummyPage({ title }: PortalDummyPageProps) {
  return (
    <AppShell contentWidth="narrow" showTitleCard={false}>
      <section className="overflow-hidden rounded-2xl border border-[#9fcfcd] bg-white shadow-[0_12px_30px_rgba(15,37,64,0.14)]">
        <div className="h-10 bg-[#0e8e8e]" />
        <div className="bg-[#f6fbfc] px-8 py-10 text-center">
          {title ? (
            <h1 className="text-4xl font-bold tracking-tight text-[#0e8e8e]">{title}</h1>
          ) : null}
          <p className={`${title ? "mt-5" : ""} text-2xl font-bold text-[#1c2e4a]`}>Coming Soon</p>
          <p className="mt-3 text-base font-medium text-[#156b6b]">Not included for demo</p>
          <Link href="/online-services" className="mt-8 inline-block rounded-md bg-[#0e8a8a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0b7777]">
            Go back
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
