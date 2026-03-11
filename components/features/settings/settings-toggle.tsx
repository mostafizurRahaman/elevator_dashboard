"use client";

import { Typography } from "@/components/typography";
import { Switch } from "@/components/ui/switch";

interface SettingsToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SettingsToggle({
  id,
  label,
  checked,
  onChange,
}: SettingsToggleProps) {
  return (
    <div className="flex items-center justify-between w-full py-3 gap-4">
      {label && (
        <Typography variant="Medium_H5" className="text-foreground">
          {label}
        </Typography>
      )}
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        aria-label={label || id}
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground border-2 border-transparent data-[state=checked]:border-primary"
      />
    </div>
  );
}
