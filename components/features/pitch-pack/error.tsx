"use client";

import { Fire } from "@phosphor-icons/react";

interface PitchPackErrorProps {
  error: string;
  onClear: () => void;
}

export function PitchPackError({ error, onClear }: PitchPackErrorProps) {
  return (
    <div className="bg-rose-950/15 border border-rose-900/60 p-6 rounded-2xl text-left flex gap-3.5">
      <div className="bg-rose-900/30 p-2 rounded-lg text-rose-400 flex-shrink-0">
        <Fire className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-rose-200 text-sm mb-1">
          Worksheet Processing Error
        </h4>
        <p className="text-pitchpack-text-muted text-xs leading-relaxed mb-3">{error}</p>
        <button
          onClick={onClear}
          className="text-[11px] px-3 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded border border-rose-500/30 font-mono transition-all cursor-pointer"
        >
          Reset Workshop
        </button>
      </div>
    </div>
  );
}
