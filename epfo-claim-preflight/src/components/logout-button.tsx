"use client";

import { logoutDemo } from "@/lib/demo-auth";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="Log out"
      title="Log out"
      onClick={() => {
        logoutDemo();
        router.replace("/login");
      }}
      className="gov-mini-control gov-mini-danger"
    >
      ⎋
    </button>
  );
}
