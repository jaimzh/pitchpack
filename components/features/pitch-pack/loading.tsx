"use client";

import { useEffect, useState } from "react";

const LOADING_STEPS = [
  "Reading brand cues & style principles...",
  "Calibrating visual demographic insights...",
  "Drafting high-retention cinematic hook...",
  "Formulating professional, high-open subject line alternates...",
  "Writing cold & follow-up email templates...",
  "Polishing social direct messages (DMs)...",
  "Engineering no-budget counter-proposal strategies...",
  "Assembling final Notion Outreach Workspace...",
];

interface PitchPackLoadingProps {
  darkMode: boolean;
}

export function PitchPackLoading({ darkMode }: PitchPackLoadingProps) {
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`border rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[360px] ${
        darkMode
          ? "border-zinc-800 bg-[#161616]/20"
          : "border-zinc-200 bg-white shadow-xs"
      }`}
    >
      <div className="relative mb-6">
        <div className="w-12 h-12 border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin" />
      </div>
      <h3 className="text-base font-bold mb-1">Weaving Outreach Campaign...</h3>
      <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 h-6 animate-pulse">
        {LOADING_STEPS[loadingStepIdx]}
      </p>
      <div className="w-48 bg-zinc-200 dark:bg-zinc-850 h-1.5 rounded-full mt-4 overflow-hidden">
        <div
          className="bg-zinc-900 dark:bg-zinc-100 h-full transition-all duration-300"
          style={{
            width: `${((loadingStepIdx + 1) / LOADING_STEPS.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
