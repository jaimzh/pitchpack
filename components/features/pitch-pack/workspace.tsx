"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { OutreachPackResponse } from "@/types";
import { PitchPackTabs, PitchPackTabType } from "./tabs-nav";
import { EmailsTab } from "./tabs/emails-tab";
import { DmsTab } from "./tabs/dms-tab";

import { StrategyTab } from "./tabs/strategy-tab";
import { PitchPackLoading } from "./loading";
import { PitchPackError } from "./error";

interface PitchPackWorkspaceProps {
  result: OutreachPackResponse | null;
  isGenerating: boolean;
  error: string | null;
  onErrorClear: () => void;
  darkMode: boolean;
}

export function PitchPackWorkspace({
  result,
  isGenerating,
  error,
  onErrorClear,
  darkMode,
}: PitchPackWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<PitchPackTabType>("emails");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState(0);

  // If currently spinning or loading
  if (isGenerating) {
    return <PitchPackLoading darkMode={darkMode} />;
  }

  // If hit an API/server exception
  if (error) {
    return <PitchPackError error={error} onClear={onErrorClear} />;
  }

  // If no output yet
  if (!result) return null;

  return (
    <div
      className={`border rounded-2xl p-6 transition-colors animate-in fade-in duration-300 ${
        darkMode
          ? "border-zinc-900 bg-zinc-950/30"
          : "border-zinc-200 bg-[#fcfcfc] shadow-xs"
      }`}
    >
      {/* Section heading — mirrors Campaign Brief */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-dashed border-zinc-200 dark:border-zinc-900">
        <Sparkles className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-zinc-500">
          Generated Outreach Suite
        </h2>
      </div>

      {/* Tab Switcher — inside the card */}
      <PitchPackTabs
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          // Auto-reset copying & subject indexes when switching tabs for best UX
          setCopiedKey(null);
          setSelectedSubjectIdx(0);
        }}
        darkMode={darkMode}
      />

      {/* Divider between tabs and content */}
      <div className="my-5 border-t border-zinc-100 dark:border-zinc-900" />

      {/* Main output viewport */}
      {activeTab === "emails" && (
        <EmailsTab
          result={result}
          copiedKey={copiedKey}
          setCopiedKey={setCopiedKey}
          selectedSubjectIdx={selectedSubjectIdx}
          setSelectedSubjectIdx={setSelectedSubjectIdx}
          darkMode={darkMode}
        />
      )}

      {activeTab === "dms" && (
        <DmsTab
          result={result}
          copiedKey={copiedKey}
          setCopiedKey={setCopiedKey}
          darkMode={darkMode}
        />
      )}

      {activeTab === "strategy" && (
        <StrategyTab
          result={result}
          copiedKey={copiedKey}
          setCopiedKey={setCopiedKey}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
