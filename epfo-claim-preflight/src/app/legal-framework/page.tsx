import { PortalDummyPage } from "@/components/portal-dummy-page";

export default function LegalFrameworkPage() {
  return (
    <PortalDummyPage
      title="Legal Framework"
      subtitle="Acts, schemes, and regulatory references"
      points={[
        "EPF and MP Act references",
        "Scheme notifications and updates",
        "Circulars and legal clarifications",
      ]}
    />
  );
}
