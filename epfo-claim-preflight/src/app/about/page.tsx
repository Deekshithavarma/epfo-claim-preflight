import { PortalDummyPage } from "@/components/portal-dummy-page";

export default function AboutPage() {
  return (
    <PortalDummyPage
      title="About EPF Organisation"
      subtitle="Overview, mission, and citizen service commitments"
      points={[
        "Organisation profile and service charter",
        "Commissioners and regional office structure",
        "Citizen grievance escalation overview",
      ]}
    />
  );
}
