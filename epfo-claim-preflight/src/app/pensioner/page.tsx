import { PortalDummyPage } from "@/components/portal-dummy-page";

export default function PensionerPage() {
  return (
    <PortalDummyPage
      title="Pensioner Services"
      subtitle="Pension related information and support"
      points={[
        "Pension payment details and updates",
        "Digital life certificate information",
        "Pension grievance and support channels",
      ]}
    />
  );
}
