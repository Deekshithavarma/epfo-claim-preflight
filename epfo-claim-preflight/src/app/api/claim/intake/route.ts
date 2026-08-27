import { createClaim, getDemoUser } from "@/lib/demo-store";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    userId?: string;
    purpose?: string;
    amount?: number;
  };

  if (!body.userId || !body.purpose || !body.amount || body.amount <= 0) {
    return NextResponse.json({ error: "Invalid intake payload" }, { status: 400 });
  }

  const user = getDemoUser(body.userId);
  if (!user) {
    return NextResponse.json({ error: "Demo user not found" }, { status: 404 });
  }

  const claim = createClaim(body.userId, body.purpose, body.amount);

  return NextResponse.json({
    claimId: claim.id,
    status: claim.demoStatus,
  });
}
