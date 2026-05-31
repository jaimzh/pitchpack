"use client";

import React, { useState } from "react";
import { Sparkle } from "@phosphor-icons/react";
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
}

export function PitchPackWorkspace({
  result,
  isGenerating,
  error,
  onErrorClear,
}: PitchPackWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<PitchPackTabType>("emails");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedSubjectIdx, setSelectedSubjectIdx] = useState(0);

  // If currently spinning or loading
  if (isGenerating) {
    return <PitchPackLoading />;
  }

  // If hit an API/server exception
  if (error) {
    return <PitchPackError error={error} onClear={onErrorClear} />;
  }

  // If no output yet
  if (!result) return null;

  return (
    <div
      className="border rounded-2xl p-6 transition-colors animate-in fade-in duration-300 border-pitchpack-border bg-pitchpack-card-subtle shadow-xs"
    >
      {/* Section heading — mirrors Campaign Brief */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-dashed border-pitchpack-border">
        <Sparkle className="w-4 h-4 text-pitchpack-text-muted" />
        <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-pitchpack-text-muted">
          Generated Outreach Suite
        </h2>
      </div>

      {/* Tab Switcher — inside the card */}
      <PitchPackTabs
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setCopiedKey(null);
          setSelectedSubjectIdx(0);
        }}
      />

      {/* Divider between tabs and content */}
      <div className="my-5 border-t border-pitchpack-border-subtle" />

      {/* Main output viewport */}
      {activeTab === "emails" && (
        <EmailsTab
          result={result}
          copiedKey={copiedKey}
          setCopiedKey={setCopiedKey}
          selectedSubjectIdx={selectedSubjectIdx}
          setSelectedSubjectIdx={setSelectedSubjectIdx}
        />
      )}

      {activeTab === "dms" && (
        <DmsTab
          result={result}
          copiedKey={copiedKey}
          setCopiedKey={setCopiedKey}
        />
      )}

      {activeTab === "strategy" && (
        <StrategyTab
          result={result}
          copiedKey={copiedKey}
          setCopiedKey={setCopiedKey}
        />
      )}
    </div>
  );
}
