import { PortalDummyPage } from "@/components/portal-dummy-page";

export default function EmployerPage() {
  return (
    <PortalDummyPage
      title="Employer Services"
      subtitle="Employer compliance and filing placeholders"
      points={[
        "Electronic challan and return filing",
        "Member registration and approvals",
        "Employer helpdesk and circular references",
      ]}
    />
  );
}
