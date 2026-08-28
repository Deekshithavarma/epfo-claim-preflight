import type { Metadata } from "next";
import { AuthGate } from "@/components/auth-gate";
import "./globals.css";

export const metadata: Metadata = {
  title: "EPFO Claim Preflight (Demo)",
  description: "Demo Unified Portal flow for EPFO Form 31 with synthetic preflight checks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
