import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { GovNav } from "@/components/gov-nav";
import { LogoutButton } from "@/components/logout-button";

interface AppShellProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  contentWidth?: "narrow" | "wide";
  showTitleCard?: boolean;
}

export function AppShell({
  title,
  subtitle,
  children,
  contentWidth = "narrow",
  showTitleCard = true,
}: AppShellProps) {
  return (
    <main className="min-h-screen">
      <header>
        <div className="gov-main-header">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="gov-logo-wrap" aria-hidden="true">
                <Image src="/assets/epfo-logo.jpeg" alt="EPFO emblem" width={56} height={56} className="gov-logo-image" priority />
              </div>
              <div>
                <p className="text-[1.6rem] font-bold leading-tight text-[#0e8e8e]">EMPLOYEES' PROVIDENT FUND ORGANISATION, INDIA</p>
                <p className="mt-0.5 text-[1rem] font-medium text-[#7a654e]">MINISTRY OF LABOUR & EMPLOYMENT, GOVERNMENT OF INDIA</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/utilities/font-increase" className="gov-mini-control">
                A+
              </Link>
              <Link href="/utilities/language" className="gov-mini-control gov-mini-control-strong">
                EN
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>

        <div className="gov-nav-strip">
          <nav className="gov-nav">
            <GovNav />
          </nav>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-8">
        {showTitleCard ? (
          <div className="mb-6 rounded-md border border-slate-300 bg-white p-4 shadow-card">
            {title ? <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1> : null}
            {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
          </div>
        ) : null}
        <div className={contentWidth === "wide" ? "mx-auto max-w-6xl" : "mx-auto max-w-xl"}>{children}</div>
      </section>
    </main>
  );
}
