import { PortalDummyPage } from "@/components/portal-dummy-page";

export default function EmployeeLoginPage() {
  return (
    <PortalDummyPage
      title="Employee Login"
      subtitle="Mock login screen for visual parity"
      points={[
        "UAN / Member ID field placeholder",
        "Password field placeholder",
        "Forgot password and help links placeholder",
      ]}
    />
  );
}
