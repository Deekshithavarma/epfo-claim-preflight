import { runPreflight } from "@/lib/preflight";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { claimId?: string };

  if (!body.claimId) {
    return NextResponse.json({ error: "claimId is required" }, { status: 400 });
  }

  const result = runPreflight(body.claimId);
  if (!result) {
    return NextResponse.json({ error: "Claim not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}
