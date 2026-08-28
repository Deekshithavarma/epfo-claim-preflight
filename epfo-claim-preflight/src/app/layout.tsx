import type { Metadata, Viewport } from "next";
import { AuthGate } from "@/components/auth-gate";
import "./globals.css";

export const metadata: Metadata = {
  title: "EPFO Claim Preflight (Demo)",
  description: "Demo Unified Portal flow for EPFO Form 31 with synthetic preflight checks.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
