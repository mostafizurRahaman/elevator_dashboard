import { cn } from "@/lib/utils";
import { Typography } from "@/components/typography";
import { ReactNode } from "react";

interface SettingsSectionProps {
  title: ReactNode;
  titleExtra?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SettingsSection({
  title,
  titleExtra,
  children,
  className,
}: SettingsSectionProps) {
  return (
    <div className={cn("flex flex-col w-full rounded-xl overflow-hidden border border-border", className)}>
      {/* Section header — matches Figma: bg-secondary, min-h-[48px], px-4 py-3 */}
      <div className="bg-secondary px-4 py-3 flex items-center justify-between min-h-[48px] shrink-0">
        <Typography variant="Medium_H4" className="text-foreground leading-none whitespace-nowrap">
          {title}
        </Typography>
        {titleExtra && <div className="ml-4 shrink-0">{titleExtra}</div>}
      </div>
      {/* Section body */}
      <div className="bg-card px-4 py-3">{children}</div>
    </div>
  );
}
