import { PortalDummyPage } from "@/components/portal-dummy-page";

export default function SkipToContentUtilityPage() {
  return (
    <PortalDummyPage
      title="Skip to Content"
      subtitle="Accessibility utility placeholder"
      points={[
        "Main content anchor behavior can be configured here.",
        "Keyboard navigation support notes.",
        "Screen reader compatibility information.",
      ]}
    />
  );
}
