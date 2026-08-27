"use client";

import { isDemoLoggedIn } from "@/lib/demo-auth";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export function AuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loggedIn = isDemoLoggedIn();
    if (!loggedIn && pathname !== "/login") {
      router.replace("/login");
      return;
    }
    if (loggedIn && pathname === "/login") {
      router.replace("/online-services");
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (!ready) {
    return <div className="min-h-screen bg-[#f4f7fb]" />;
  }

  return children;
}
