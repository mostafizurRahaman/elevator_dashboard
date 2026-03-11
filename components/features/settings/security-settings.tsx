"use client";

import { useState } from "react";
import { SettingsSection } from "./settings-section";
import { SettingsToggle } from "./settings-toggle";

export function SecuritySettings() {
  const [settings, setSettings] = useState({
    manualLogin: true,
    biometricLogin: false,
    faceLogin: false,
  });

  const handleChange = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsSection title="Security">
      <div className="flex flex-col divide-y divide-border/50">
        <SettingsToggle
          id="toggle-manual-login"
          label="Manual Login"
          checked={settings.manualLogin}
          onChange={(v) => handleChange("manualLogin", v)}
        />
        <SettingsToggle
          id="toggle-biometric-login"
          label="Biometric login"
          checked={settings.biometricLogin}
          onChange={(v) => handleChange("biometricLogin", v)}
        />
        <SettingsToggle
          id="toggle-face-login"
          label="Face login"
          checked={settings.faceLogin}
          onChange={(v) => handleChange("faceLogin", v)}
        />
      </div>
    </SettingsSection>
  );
}
