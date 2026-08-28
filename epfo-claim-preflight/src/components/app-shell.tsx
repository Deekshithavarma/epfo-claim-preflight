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
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4 sm:py-4">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <div className="gov-logo-wrap" aria-hidden="true">
                <Image src="/assets/epfo-logo.jpeg" alt="EPFO emblem" width={56} height={56} className="gov-logo-image" priority />
              </div>
              <div className="min-w-0">
                <p className="text-[0.95rem] font-bold leading-tight text-[#0e8e8e] sm:text-[1.35rem] lg:text-[1.6rem]">
                  EMPLOYEES' PROVIDENT FUND ORGANISATION, INDIA
                </p>
                <p className="mt-0.5 text-[0.7rem] font-medium leading-snug text-[#7a654e] sm:text-[0.9rem] lg:text-[1rem]">
                  MINISTRY OF LABOUR &amp; EMPLOYMENT, GOVERNMENT OF INDIA
                </p>
              </div>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-2">
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

      <section className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-4 sm:py-8">
        {showTitleCard ? (
          <div className="mb-4 rounded-md border border-slate-300 bg-white p-3 shadow-card sm:mb-6 sm:p-4">
            {title ? <h1 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{title}</h1> : null}
            {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
          </div>
        ) : null}
        <div className={contentWidth === "wide" ? "mx-auto max-w-6xl" : "mx-auto max-w-xl"}>{children}</div>
      </section>
    </main>
  );
}
