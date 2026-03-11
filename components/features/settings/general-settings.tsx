"use client";

import { SettingsSection } from "./settings-section";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const timezones = [
  "(GMT+7) Bangladesh Time",
  "(GMT+0) UTC",
  "(GMT-5) Eastern Time",
  "(GMT-8) Pacific Time",
  "(GMT+5:30) India Standard Time",
];

const languages = [
  "Us (English)",
  "Français",
  "Deutsch",
  "Español",
  "বাংলা",
];

export function GeneralSettings() {
  return (
    <SettingsSection title="General">
      {/* 2-col grid matching Figma layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 pt-1 pb-1">
        {/* App Name */}
        <div className="flex flex-col gap-2">
          <Typography variant="Medium_H5" className="text-foreground">
            App Name
          </Typography>
          <Input
            id="settings-app-name"
            defaultValue="Rithos"
            className="bg-background border-secondary text-foreground h-10 rounded-xl px-3 focus-visible:ring-primary"
          />
        </div>

        {/* Support Email */}
        <div className="flex flex-col gap-2">
          <Typography variant="Medium_H5" className="text-foreground">
            Support email
          </Typography>
          <Input
            id="settings-support-email"
            type="email"
            defaultValue="support@rithos.com"
            className="bg-background border-secondary text-foreground h-10 rounded-xl px-3 focus-visible:ring-primary"
          />
        </div>

        {/* Default Timezone */}
        <div className="flex flex-col gap-2">
          <Typography variant="Medium_H5" className="text-foreground">
            Default timezone
          </Typography>
          <Select defaultValue="(GMT+7) Bangladesh Time">
            <SelectTrigger
              id="settings-timezone"
              className="bg-background border-secondary w-full text-foreground h-10 rounded-xl"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              {timezones.map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Language */}
        <div className="flex flex-col gap-2">
          <Typography variant="Medium_H5" className="text-foreground">
            Language
          </Typography>
          <Select defaultValue="Us (English)">
            <SelectTrigger
              id="settings-language"
              className="bg-background border-secondary w-full text-foreground h-10 rounded-xl"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </SettingsSection>
  );
}
