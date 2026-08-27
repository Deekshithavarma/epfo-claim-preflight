import { getClaim, getDemoUser, updateClaim } from "@/lib/demo-store";
import { PreflightCheck, PreflightResult } from "@/lib/types";

const SUPPORTED_PURPOSES = ["medical_treatment", "education", "marriage", "housing", "other"];

function buildChecks(claimId: string): PreflightCheck[] {
  const claim = getClaim(claimId);
  if (!claim) {
    return [];
  }

  const user = getDemoUser(claim.userId);
  const checks: PreflightCheck[] = [
    {
      code: "UAN_ACTIVE",
      label: "UAN",
      status: user ? "pass" : "blocking",
      reason: user
        ? "Your UAN is active in this demo profile."
        : "UAN profile is missing in this demo account.",
      nextAction: user ? "No action needed" : "Restart demo with a valid synthetic account.",
      sourceType: "mock_state",
    },
    {
      code: "KYC_READY",
      label: "Aadhaar/KYC",
      status: "pass",
      reason: "Required KYC state is available in this demo profile.",
      nextAction: "No action needed",
      sourceType: "mock_state",
    },
    {
      code: "BANK_NOT_READY",
      label: "Bank details",
      status: claim.demoState.bankVerified ? "pass" : "attention",
      reason: claim.demoState.bankVerified
        ? "Bank details are marked ready in this demo profile."
        : "The bank details are not in the required ready state in this prototype.",
      nextAction: claim.demoState.bankVerified
        ? "No action needed"
        : "Open this check and simulate verification.",
      sourceType: "mock_state",
    },
    {
      code: "MEMBER_PROFILE_PENDING",
      label: "Member profile",
      status: claim.demoState.memberProfileVerified ? "pass" : "attention",
      reason: claim.demoState.memberProfileVerified
        ? "Member profile verification is complete in this demo."
        : "A profile condition in this demo needs verification.",
      nextAction: claim.demoState.memberProfileVerified
        ? "No action needed"
        : "Review this check and mark as verified in demo mode.",
      sourceType: "mock_state",
    },
    {
      code: "PURPOSE_SUPPORTED",
      label: "Claim purpose",
      status: SUPPORTED_PURPOSES.includes(claim.purpose) ? "pass" : "blocking",
      reason: SUPPORTED_PURPOSES.includes(claim.purpose)
        ? "The selected purpose is supported by the demo rule set."
        : "The selected purpose is not supported in this demo.",
      nextAction: SUPPORTED_PURPOSES.includes(claim.purpose)
        ? "No action needed"
        : "Choose one of the supported purposes.",
      sourceType: "prototype_rule",
    },
    {
      code: "FIELDS_COMPLETE",
      label: "Required claim fields",
      status: claim.amount > 0 ? "pass" : "blocking",
      reason: claim.amount > 0
        ? "All mandatory demo fields are present."
        : "Claim amount is required.",
      nextAction: claim.amount > 0 ? "No action needed" : "Enter a valid amount.",
      sourceType: "prototype_rule",
    },
  ];

  return checks;
}

export function runPreflight(claimId: string): PreflightResult | null {
  const claim = getClaim(claimId);
  if (!claim) {
    return null;
  }

  const checks = buildChecks(claimId);
  const passed = checks.filter((check) => check.status === "pass").length;
  const attention = checks.filter((check) => check.status === "attention").length;
  const blocking = checks.filter((check) => check.status === "blocking").length;

  const overallStatus = blocking > 0 ? "blocking" : attention > 0 ? "attention" : "ready";

  updateClaim(claimId, (record) => ({
    ...record,
    demoStatus: overallStatus === "ready" ? "ready" : "draft",
  }));

  return {
    claimId,
    overallStatus,
    checks,
    summary: {
      passed,
      total: checks.length,
      attention,
      blocking,
    },
  };
}
