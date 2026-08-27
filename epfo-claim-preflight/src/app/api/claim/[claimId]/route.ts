import { getClaim, getDemoUser } from "@/lib/demo-store";
import { runPreflight } from "@/lib/preflight";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ claimId: string }> },
) {
  const { claimId } = await params;

  const claim = getClaim(claimId);
  if (!claim) {
    return NextResponse.json({ error: "Claim not found" }, { status: 404 });
  }

  const user = getDemoUser(claim.userId);
  const preflight = runPreflight(claimId);

  return NextResponse.json({
    id: claim.id,
    purpose: claim.purpose,
    amount: claim.amount,
    memberId: user?.memberId ?? "XXXX1234",
    paymentAccountMasked: claim.demoState.bankVerified ? "•••• 7714" : "•••• 4821",
    checksPassed: preflight?.summary.passed ?? 0,
    checksTotal: preflight?.summary.total ?? 0,
  });
}
