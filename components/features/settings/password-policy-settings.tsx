"use client";

import { useState } from "react";
import { SettingsSection } from "./settings-section";
import { SettingsToggle } from "./settings-toggle";
import { Typography } from "@/components/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, CalendarDays } from "lucide-react";

const changeThresholds = [
  "Every 30 days",
  "Every 60 days",
  "Every 90 days",
  "Every 180 days",
  "Never",
];

const sessionTimeouts = [
  "15 minutes idle",
  "30 minutes idle",
  "1 hour idle",
  "2 hours idle",
  "Never",
];

interface PolicyRowProps {
  label: string;
  children: React.ReactNode;
}

function PolicyRow({ label, children }: PolicyRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border/50 last:border-0">
      <Typography
        variant="Medium_H5"
        className="text-foreground shrink-0"
      >
        {label}
      </Typography>
      <div className="w-[285px] shrink-0">{children}</div>
    </div>
  );
}

export function PasswordPolicySettings() {
  const [policyEnabled, setPolicyEnabled] = useState(true);
  const [minLength, setMinLength] = useState(8);

  return (
    <SettingsSection
      title="Password policy"
      titleExtra={
        <SettingsToggle
          id="toggle-password-policy"
          label=""
          checked={policyEnabled}
          onChange={setPolicyEnabled}
        />
      }
    >
      <div className="flex flex-col">
        {/* Minimum Length — numeric stepper */}
        <PolicyRow label="Minimum Length">
          <div className="flex items-center justify-end gap-3 px-3 py-2 bg-background border border-secondary rounded-lg h-10">
            <Typography
              variant="Medium_H5"
              className="text-foreground text-right flex-1"
              as="span"
            >
              {minLength}
            </Typography>
            <div className="flex flex-col">
              <button
                id="btn-length-up"
                aria-label="Increase minimum length"
                onClick={() => setMinLength((n) => Math.min(32, n + 1))}
                className="text-muted-foreground hover:text-foreground transition-colors leading-none"
              >
                <ChevronUp size={13} />
              </button>
              <button
                id="btn-length-down"
                aria-label="Decrease minimum length"
                onClick={() => setMinLength((n) => Math.max(4, n - 1))}
                className="text-muted-foreground hover:text-foreground transition-colors leading-none"
              >
                <ChevronDown size={13} />
              </button>
            </div>
          </div>
        </PolicyRow>

        {/* Change Threshold */}
        <PolicyRow label="Change threshold">
          <Select defaultValue="Every 60 days" >
            <SelectTrigger
              id="select-change-threshold w-full"
              className="bg-background border-secondary w-full text-foreground h-10 rounded-lg [&>span]:flex [&>span]:items-center [&>span]:justify-between [&>span]:w-full"
            >
              <SelectValue />
              <CalendarDays
                size={16}
                className="text-muted-foreground shrink-0 mr-1"
              />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              {changeThresholds.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PolicyRow>

        {/* Session Timeout */}
        <PolicyRow label="Session timeout">
          <Select defaultValue="30 minutes idle">
            <SelectTrigger
              // id="select-session-timeout"
              className="bg-background w-full border-secondary  text-foreground h-10 rounded-lg"
            >
              <SelectValue />
              <CalendarDays
                size={16}
                className="text-muted-foreground shrink-0 ml-auto mr-1"
              />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              {sessionTimeouts.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PolicyRow>
      </div>
    </SettingsSection>
  );
}
