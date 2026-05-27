"use client";

import { Sliders, Sparkles } from "lucide-react";
import { OutreachPackResponse } from "@/types";

export type MainTab = "brief" | "pitchpack";

interface MainTabNavProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  result: OutreachPackResponse | null;
  isGenerating: boolean;
  darkMode: boolean;
}

export function MainTabNav({
  activeTab,
  onTabChange,
  result,
  isGenerating,
  darkMode,
}: MainTabNavProps) {
  const pitchpackEnabled = result !== null || isGenerating;

  const baseTab =
    "flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all border border-transparent";

  const activeClass = darkMode
    ? "bg-[#161616] text-white border-zinc-850 shadow-sm"
    : "bg-white text-zinc-950 border-zinc-200 shadow-xs";

  const inactiveClass = "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer";

  const disabledClass =
    "text-zinc-400 dark:text-zinc-700 cursor-not-allowed opacity-40";

  return (
    <div
      className={`p-1 border rounded-xl flex gap-1 transition-all ${
        darkMode
          ? "border-zinc-900 bg-zinc-950/60"
          : "border-zinc-200 bg-zinc-100/65"
      }`}
    >
      {/* Brief tab — always clickable */}
      <button
        type="button"
        onClick={() => onTabChange("brief")}
        className={`${baseTab} ${activeTab === "brief" ? activeClass : inactiveClass}`}
      >
        <Sliders className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
        <span>Campaign Brief Builder</span>
      </button>

      {/* PitchPack tab — locked until a result exists or generation is in progress */}
      <button
        type="button"
        onClick={() => pitchpackEnabled && onTabChange("pitchpack")}
        disabled={!pitchpackEnabled}
        title={
          !pitchpackEnabled
            ? "Generate outreach material first to unlock"
            : "View generated campaign copy decks"
        }
        className={`${baseTab} ${
          activeTab === "pitchpack"
            ? activeClass
            : pitchpackEnabled
            ? inactiveClass
            : disabledClass
        }`}
      >
        <Sparkles className="w-3.5 h-3.5 text-zinc-950 dark:text-zinc-100" />
        <span>Generated PitchPack Suite</span>
      </button>
    </div>
  );
}
