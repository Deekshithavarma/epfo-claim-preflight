import { applyDemoFix } from "@/lib/demo-store";
import { runPreflight } from "@/lib/preflight";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { claimId?: string; fix?: string };

  if (!body.claimId || !body.fix) {
    return NextResponse.json({ error: "claimId and fix are required" }, { status: 400 });
  }

  const updated = applyDemoFix(body.claimId, body.fix);
  if (!updated) {
    return NextResponse.json({ error: "Claim not found" }, { status: 404 });
  }

  const preflight = runPreflight(body.claimId);

  return NextResponse.json({
    success: true,
    preflight,
  });
}
