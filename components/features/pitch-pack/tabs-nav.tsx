"use client";

import { Envelope, ChatCircle, Target } from "@phosphor-icons/react";

export type PitchPackTabType = "emails" | "dms" | "strategy";

interface PitchPackTabsProps {
  activeTab: PitchPackTabType;
  onTabChange: (tab: PitchPackTabType) => void;
}

export function PitchPackTabs({
  activeTab,
  onTabChange,
}: PitchPackTabsProps) {
  const tabsList = [
    { id: "emails", icon: Envelope, label: "Outreach Emails" },
    { id: "dms", icon: ChatCircle, label: "DMs & Fallback" },

    { id: "strategy", icon: Target, label: "Brand Notes" },
  ] as const;

  return (
    <div
      className="p-1 border rounded-xl flex flex-wrap gap-1 transition-colors border-pitchpack-border bg-pitchpack-card-subtle"
    >
      {tabsList.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isActive
                ? "bg-pitchpack-card text-pitchpack-text border-pitchpack-border shadow-xs"
                : "text-pitchpack-text-muted hover:text-pitchpack-text"
            } border border-transparent`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
