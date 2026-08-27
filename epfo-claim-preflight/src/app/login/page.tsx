"use client";

import { loginDemo } from "@/lib/demo-auth";
import Image from "next/image";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginDemo();
    router.replace("/online-services");
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <header className="gov-main-header">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-4">
          <div className="gov-logo-wrap" aria-hidden="true">
            <Image src="/assets/epfo-logo.jpeg" alt="EPFO emblem" width={56} height={56} className="gov-logo-image" priority />
          </div>
          <div>
            <p className="text-[1.6rem] font-bold leading-tight text-[#0e8e8e]">EMPLOYEES' PROVIDENT FUND ORGANISATION, INDIA</p>
            <p className="mt-0.5 text-[1rem] font-medium text-[#7a654e]">MINISTRY OF LABOUR & EMPLOYMENT, GOVERNMENT OF INDIA</p>
          </div>
        </div>
      </header>
      <div className="h-10 bg-[#0e8e8e]" />

      <section className="mx-auto mt-10 w-full max-w-md px-4">
        <form onSubmit={onLogin} className="overflow-hidden rounded-2xl border border-[#9fcfcd] bg-white shadow-[0_12px_30px_rgba(15,37,64,0.14)]">
          <div className="bg-[#0e8e8e] px-5 py-3 text-center text-lg font-semibold text-white">Member Login</div>
          <div className="space-y-4 bg-[#f6fbfc] px-6 py-6">
            <label className="block text-left text-sm font-semibold text-[#2f3a4d]">
              UAN
              <input
                name="uan"
                autoComplete="username"
                className="mt-1 w-full rounded-md border border-[#c8d2e0] bg-white px-3 py-2 text-[#2d3b4f] outline-none focus:border-[#0e8e8e]"
                placeholder="Enter UAN"
              />
            </label>
            <label className="block text-left text-sm font-semibold text-[#2f3a4d]">
              Password
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                className="mt-1 w-full rounded-md border border-[#c8d2e0] bg-white px-3 py-2 text-[#2d3b4f] outline-none focus:border-[#0e8e8e]"
                placeholder="Enter password"
              />
            </label>
            <p className="text-xs italic text-[#617086]">For demo purpose, click Login to continue. Credentials are not verified.</p>
            <button type="submit" className="w-full rounded-md bg-[#0e8a8a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0b7777]">
              Login
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
