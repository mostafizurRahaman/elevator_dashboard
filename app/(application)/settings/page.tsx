import { ContentLayout } from "@/components/navigation/content-layout";
import { GeneralSettings } from "@/components/features/settings/general-settings";
import { NotificationsSettings } from "@/components/features/settings/notifications-settings";
import { SecuritySettings } from "@/components/features/settings/security-settings";
import { PasswordPolicySettings } from "@/components/features/settings/password-policy-settings";
import { FiltersPanel } from "@/components/features/settings/filters-panel";

export default function SettingsPage() {
  return (
    <ContentLayout title="Settings">
      <div className="flex gap-6 w-full items-start">
        {/* Left main content — matches Figma's ~722px wide panel */}
        <div className="flex flex-col gap-5 flex-1 min-w-0">
          {/* General */}
          <GeneralSettings />

          {/* Notifications + Security side by side — matches Figma ~346px each */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <NotificationsSettings />
            <SecuritySettings />
          </div>

          {/* Password Policy — full width */}
          <PasswordPolicySettings />
        </div>

        {/* Right Filters panel — matches Figma's ~398px column */}
        <div className="w-[360px]  shrink-0 sticky top-6">
          <FiltersPanel />
        </div>
      </div>
    </ContentLayout>
  );
}
