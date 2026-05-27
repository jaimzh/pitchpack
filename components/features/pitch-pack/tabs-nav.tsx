"use client";

import { Mail, MessageSquare, Target } from "lucide-react";

export type PitchPackTabType = "emails" | "dms" | "strategy";

interface PitchPackTabsProps {
  activeTab: PitchPackTabType;
  onTabChange: (tab: PitchPackTabType) => void;
  darkMode: boolean;
}

export function PitchPackTabs({
  activeTab,
  onTabChange,
  darkMode,
}: PitchPackTabsProps) {
  const tabsList = [
    { id: "emails", icon: Mail, label: "Outreach Emails" },
    { id: "dms", icon: MessageSquare, label: "DMs & Fallback" },

    { id: "strategy", icon: Target, label: "Brand Notes" },
  ] as const;

  return (
    <div
      className={`p-1 border rounded-xl flex flex-wrap gap-1 transition-colors ${
        darkMode
          ? "border-zinc-800 bg-[#161616]/40"
          : "border-zinc-200 bg-zinc-100"
      }`}
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
                ? darkMode
                  ? "bg-[#252525] text-zinc-100 border-[#2D2D2D] shadow-sm"
                  : "bg-white text-zinc-900 border-[#DFDFDE] shadow-xs"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
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
