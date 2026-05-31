"use client";

import { PencilSimple, Package } from "@phosphor-icons/react";
import { OutreachPackResponse } from "@/types";

export type MainTab = "brief" | "pitchpack";

interface MainTabNavProps {
  activeTab: MainTab;
  onTabChange: (tab: MainTab) => void;
  result: OutreachPackResponse | null;
  isGenerating: boolean;
}

export function MainTabNav({
  activeTab,
  onTabChange,
  result,
  isGenerating,
}: MainTabNavProps) {
  const pitchpackEnabled = result !== null || isGenerating;

  const baseBtn =
    "w-full flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all border border-transparent";

  const activeBtn = "bg-pitchpack-card text-pitchpack-text shadow-sm ring-1 ring-pitchpack-border";

  const inactiveBtn = "text-pitchpack-text-muted hover:text-pitchpack-text hover:bg-black/5 cursor-pointer";

  const disabledBtn =
    "text-pitchpack-text-light cursor-not-allowed opacity-40";

  const lineColor = "bg-pitchpack-text";

  return (
    <div
      className="p-1.5 border rounded-xl flex gap-1 transition-all border-pitchpack-border bg-pitchpack-card-subtle"
    >
      {/* Brief tab — always clickable */}
      <div className="flex flex-col items-center flex-1">
        <button
          type="button"
          onClick={() => onTabChange("brief")}
          className={`${baseBtn} ${activeTab === "brief" ? activeBtn : inactiveBtn}`}
        >
          <PencilSimple className={`w-4 h-4 transition-colors ${activeTab === "brief" ? "text-pitchpack-text" : "text-pitchpack-text-light"}`} />
          <span>Draft Pitch</span>
        </button>

        <div className=" mt-1 h-[2px] w-[95%] flex justify-center">
          {activeTab === "brief" && (
            <div className={`w-full h-full ${lineColor} rounded-full animate-in fade-in duration-200`}></div>
          )}
        </div>
      </div>

      
      <div className="flex flex-col items-center flex-1">
        <button
          type="button"
          onClick={() => pitchpackEnabled && onTabChange("pitchpack")}
          disabled={!pitchpackEnabled}
          title={
            !pitchpackEnabled
              ? "Generate outreach material first to unlock"
              : "View generated campaign copy decks"
          }
          className={`${baseBtn} ${
            activeTab === "pitchpack"
              ? activeBtn
              : pitchpackEnabled
              ? inactiveBtn
              : disabledBtn
          }`}
        >
          <Package className={`w-4 h-4 transition-colors ${activeTab === "pitchpack" ? "text-pitchpack-text" : "text-pitchpack-text-light"}`} />
          <span>View Pack</span>
        </button>

        <div className="mt-1 h-[2px] w-[95%] flex justify-center">
          {activeTab === "pitchpack" && (
            <div className={`w-full h-full ${lineColor} rounded-full animate-in fade-in duration-200`}></div>
          )}
        </div>
      </div>
    </div>
  );
}
