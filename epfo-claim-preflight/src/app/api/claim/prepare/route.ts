import { getClaim, setClaimPrepared } from "@/lib/demo-store";
import { runPreflight } from "@/lib/preflight";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { claimId?: string };

  if (!body.claimId) {
    return NextResponse.json({ error: "claimId is required" }, { status: 400 });
  }

  const claim = getClaim(body.claimId);
  if (!claim) {
    return NextResponse.json({ error: "Claim not found" }, { status: 404 });
  }

  const preflight = runPreflight(body.claimId);
  if (!preflight || preflight.overallStatus !== "ready") {
    return NextResponse.json({ error: "Claim is not ready" }, { status: 409 });
  }

  const prepared = setClaimPrepared(body.claimId);

  return NextResponse.json({
    status: prepared?.demoStatus ?? "draft",
    demoOnly: true,
  });
}
