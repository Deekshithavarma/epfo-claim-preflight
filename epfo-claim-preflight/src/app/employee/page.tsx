import { PortalDummyPage } from "@/components/portal-dummy-page";

export default function EmployeePage() {
  return (
    <PortalDummyPage
      title="Employee Services"
      subtitle="Common member-side services and quick actions"
      points={[
        "Passbook and contribution statement",
        "Online claim submission and status",
        "KYC update and UAN services",
      ]}
    />
  );
}
