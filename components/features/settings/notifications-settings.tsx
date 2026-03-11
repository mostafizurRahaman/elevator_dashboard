"use client";

import { useState } from "react";
import { SettingsSection } from "./settings-section";
import { SettingsToggle } from "./settings-toggle";

export function NotificationsSettings() {
  const [settings, setSettings] = useState({
    systemAlerts: true,
    dailyReportEmail: true,
    dataRetention: false,
  });

  const handleChange = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsSection title="Notifications">
      <div className="flex flex-col divide-y divide-border/50">
        <SettingsToggle
          id="toggle-system-alerts"
          label="System alerts"
          checked={settings.systemAlerts}
          onChange={(v) => handleChange("systemAlerts", v)}
        />
        <SettingsToggle
          id="toggle-daily-report"
          label="Daily report email"
          checked={settings.dailyReportEmail}
          onChange={(v) => handleChange("dailyReportEmail", v)}
        />
        <SettingsToggle
          id="toggle-data-retention"
          label="Data retension"
          checked={settings.dataRetention}
          onChange={(v) => handleChange("dataRetention", v)}
        />
      </div>
    </SettingsSection>
  );
}
