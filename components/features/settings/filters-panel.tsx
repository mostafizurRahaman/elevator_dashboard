"use client";

import { useState } from "react";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FilterSelectProps {
  id: string;
  label: string;
  options: string[];
  defaultValue?: string;
}

function FilterSelect({ id, label, options, defaultValue = "All" }: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Typography variant="Medium_H5" className="text-foreground">
        {label}
      </Typography>
      <Select defaultValue={defaultValue}>
        <SelectTrigger
          id={id}
          className="bg-transparent border border-secondary text-foreground h-10 rounded-xl w-full"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-card border-border text-foreground z-50">
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface FiltersPanelProps {
  onApply?: () => void;
  onReset?: () => void;
}

export function FiltersPanel({ onApply, onReset }: FiltersPanelProps) {
  return (
    <div className="bg-card rounded-xl overflow-hidden flex flex-col border border-border min-h-[640px]">
      {/* Panel header */}
      <div className="bg-secondary border-b border-border px-4 py-3 flex items-center justify-between shrink-0 min-h-[48px]">
        <Typography variant="Medium_H4" className="text-foreground leading-none">
          Filters
        </Typography>
        <button
          id="filters-reset"
          onClick={onReset}
          className="hover:opacity-80 transition-opacity"
          aria-label="Reset filters"
        >
          <Typography variant="Medium_H5" className="text-primary" as="span">
            Reset
          </Typography>
        </button>
      </div>

      {/* Filter dropdowns — centered vertically in the available space */}
      <div className="flex flex-col gap-5 px-6 py-8 flex-1">
        <FilterSelect
          id="filter-role"
          label="Role"
          options={["All", "Admin", "User", "Moderator", "Viewer"]}
        />
        <FilterSelect
          id="filter-status"
          label="Status"
          options={["All", "Active", "Inactive", "Pending", "Suspended"]}
        />
        <FilterSelect
          id="filter-last-active"
          label="Last active"
          options={["All", "Today", "This week", "This month", "Over 30 days"]}
        />
      </div>

      {/* Action buttons — pinned to bottom */}
      <div className="px-6 pb-6 flex gap-4 shrink-0">
        <Button
          id="filters-cancel"
          variant="secondary"
          className="flex-1 h-11 rounded-xl font-semibold text-foreground"
          onClick={onReset}
        >
          Cancel
        </Button>
        <Button
          id="filters-apply"
          className="flex-1 h-11 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onApply}
        >
          Apply filters
        </Button>
      </div>
    </div>
  );
}
