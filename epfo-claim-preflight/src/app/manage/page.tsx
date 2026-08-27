import { PortalDummyPage } from "@/components/portal-dummy-page";

export default function ManagePage() {
  return (
    <PortalDummyPage
      title="Manage"
      subtitle="Profile and service management"
      points={[
        "KYC update management placeholder",
        "Bank details management placeholder",
        "Nomination management placeholder",
      ]}
    />
  );
}
