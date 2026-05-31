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

export function PitchPackLoading() {
  const [loadingStepIdx, setLoadingStepIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStepIdx((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="border rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[360px] border-pitchpack-border bg-pitchpack-card shadow-xs"
    >
      <div className="relative mb-6">
        <div className="w-12 h-12 border-2 border-pitchpack-border border-t-pitchpack-text rounded-full animate-spin" />
      </div>
      <h3 className="text-base font-bold mb-1">Weaving Outreach Campaign...</h3>
      <p className="text-xs font-mono text-pitchpack-text-muted h-6 animate-pulse">
        {LOADING_STEPS[loadingStepIdx]}
      </p>
      <div className="w-48 bg-pitchpack-border h-1.5 rounded-full mt-4 overflow-hidden">
        <div
          className="bg-pitchpack-text h-full transition-all duration-300"
          style={{
            width: `${((loadingStepIdx + 1) / LOADING_STEPS.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
