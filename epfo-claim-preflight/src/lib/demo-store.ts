import { ClaimRecord, DemoUser } from "@/lib/types";

const demoUser: DemoUser = {
  id: "demo-rahul",
  name: "Rahul Sharma",
  age: 34,
  maskedUan: "1000XXXXXX12",
  memberId: "XXXX1234",
  employmentStatus: "Salaried employee",
  pfBalanceDemo: 280000,
};

const claims = new Map<string, ClaimRecord>();
let claimCounter = 1;

export function getDemoUser(userId: string): DemoUser | null {
  if (userId !== demoUser.id) {
    return null;
  }
  return demoUser;
}

export function createClaim(userId: string, purpose: string, amount: number): ClaimRecord {
  const claimId = `claim-${String(claimCounter).padStart(3, "0")}`;
  claimCounter += 1;

  const claim: ClaimRecord = {
    id: claimId,
    userId,
    purpose,
    amount,
    demoStatus: "draft",
    createdAt: new Date().toISOString(),
    demoState: {
      bankVerified: false,
      memberProfileVerified: false,
    },
  };

  claims.set(claim.id, claim);
  return claim;
}

export function getClaim(claimId: string): ClaimRecord | null {
  return claims.get(claimId) ?? null;
}

export function updateClaim(claimId: string, updater: (record: ClaimRecord) => ClaimRecord): ClaimRecord | null {
  const current = claims.get(claimId);
  if (!current) {
    return null;
  }
  const updated = updater(current);
  claims.set(claimId, updated);
  return updated;
}

export function setClaimPrepared(claimId: string): ClaimRecord | null {
  return updateClaim(claimId, (record) => ({ ...record, demoStatus: "prepared" }));
}

export function applyDemoFix(claimId: string, fix: string): ClaimRecord | null {
  return updateClaim(claimId, (record) => {
    if (fix === "verify_bank") {
      return {
        ...record,
        demoState: {
          ...record.demoState,
          bankVerified: true,
        },
      };
    }

    if (fix === "verify_member_profile") {
      return {
        ...record,
        demoState: {
          ...record.demoState,
          memberProfileVerified: true,
        },
      };
    }

    return record;
  });
}
