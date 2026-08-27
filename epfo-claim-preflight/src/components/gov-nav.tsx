"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Eye, Globe, House, LineChart, Settings, UserRound } from "lucide-react";

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

  return (
    <div className="mx-auto flex w-full max-w-6xl items-center overflow-x-auto">
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
  );
}
