"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Eye, Globe, House, LineChart, Menu, Settings, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/demo", label: "Home", icon: House },
  { href: "/view", label: "View", icon: Eye },
  { href: "/manage", label: "Manage", icon: Settings },
  { href: "/account", label: "Account", icon: UserRound },
  { href: "/online-services", label: "Online Services", icon: Globe },
  { href: "/pmvbry", label: "PMVBRY", icon: LineChart },
] as const;

export function GovNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = NAV_ITEMS.find((item) => item.href === pathname) ?? NAV_ITEMS[0];
  const CurrentIcon = current.icon;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex items-center justify-between gap-3 px-3 py-2 md:hidden">
        <p className="flex min-w-0 items-center gap-2 text-[0.95rem] font-bold text-white">
          <CurrentIcon size={18} aria-hidden="true" />
          <span className="truncate">{current.label}</span>
        </p>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-white/30 bg-white/10 text-white"
          aria-expanded={open}
          aria-controls="gov-nav-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div id="gov-nav-menu" className={`gov-nav-menu${open ? " is-open" : ""}`}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} className={`gov-nav-link${isActive ? " gov-nav-link-active" : ""}`} href={item.href}>
              <Icon size={16} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
