import { PortalDummyPage } from "@/components/portal-dummy-page";

export default function ResourcesPage() {
  return (
    <PortalDummyPage
      title="Resources"
      subtitle="Downloads, forms, and user guidance"
      points={[
        "Claim forms and checklists",
        "FAQ and user manuals",
        "Regional office contact directory",
      ]}
    />
  );
}
