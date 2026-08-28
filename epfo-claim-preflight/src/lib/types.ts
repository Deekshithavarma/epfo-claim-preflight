export type CheckStatus = "pass" | "attention" | "blocking";

export type SourceType = "official_rule" | "prototype_rule" | "mock_state";

export interface PreflightCheck {
  code: string;
  label: string;
  status: CheckStatus;
  reason: string;
  nextAction?: string;
  sourceType: SourceType;
}

export interface PreflightResult {
  claimId: string;
  overallStatus: "ready" | "attention" | "blocking";
  checks: PreflightCheck[];
  summary: {
    passed: number;
    total: number;
    attention: number;
    blocking: number;
  };
}

export interface ClaimRecord {
  id: string;
  userId: string;
  purpose: string;
  amount: number;
  demoStatus: "draft" | "ready";
  createdAt: string;
  demoState: {
    bankVerified: boolean;
    memberProfileVerified: boolean;
  };
}

export interface DemoUser {
  id: string;
  name: string;
  age: number;
  maskedUan: string;
  memberId: string;
  employmentStatus: string;
  pfBalanceDemo: number;
}
