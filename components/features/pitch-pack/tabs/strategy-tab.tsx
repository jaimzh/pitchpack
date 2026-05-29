"use client";

import React from "react";
import { Copy, Check, Target, RefreshCw } from "lucide-react";
import { OutreachPackResponse } from "@/types";
import { copyText } from "@/lib/copy-utils";

interface StrategyTabProps {
  result: OutreachPackResponse;
  copiedKey: string | null;
  setCopiedKey: (key: string | null) => void;
  darkMode: boolean;
}

export function StrategyTab({
  result,
  copiedKey,
  setCopiedKey,
  darkMode,
}: StrategyTabProps) {
  const composerCardClass = `border rounded-2xl overflow-hidden transition-all ${
    darkMode
      ? "border-zinc-900 bg-zinc-950/40"
      : "border-zinc-200 bg-[#fcfcfc] shadow-xs"
  }`;

  const headerSectionClass = `px-5 py-4 flex items-center justify-between gap-3 ${
    darkMode ? "bg-zinc-900/10" : "bg-zinc-50/50"
  }`;

  const labelClass = `text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-extrabold block mb-1`;

  const subtleCopyBtn = `inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 text-xs font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-all cursor-pointer`;

  const snapshotItems = result.brand_snapshot
    ? [
        { label: "Brand Tone", val: result.brand_snapshot.creative_tone },
        { label: "Target Audience", val: result.brand_snapshot.target_audience },
        {
          label: "Affinity Connection",
          val: result.brand_snapshot.core_connection_hook,
        },
        {
          label: "Suggested Pitch Angle",
          val: result.brand_snapshot.suggested_angle,
        },
      ]
    : [];

  const allSnapshotText = snapshotItems
    .map((item) => `${item.label}: ${item.val || "N/A"}`)
    .join("\n");

  return (
    <div className="space-y-6">
      {/* ── Brand Intelligence Card ── */}
      {result.brand_snapshot && (
        <div className={composerCardClass}>
          {/* Header */}
          <div className={headerSectionClass}>
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-md font-mono font-bold border border-zinc-200 dark:border-zinc-800">
                <Target className="w-3 h-3 inline-block mr-1 -mt-px" />
                INTEL
              </span>
              <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                Brand Intelligence
              </h3>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-zinc-150 dark:border-zinc-900" />

          {/* Snapshot Grid */}
          <div className="px-5 py-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {snapshotItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    darkMode
                      ? "bg-zinc-900/30 border-zinc-800/60"
                      : "bg-zinc-50/60 border-zinc-150"
                  }`}
                >
                  <span className={labelClass}>{item.label}</span>
                  <p className="text-xs text-zinc-800 dark:text-zinc-200 font-normal leading-relaxed mt-1">
                    {item.val || "Awaiting calculation..."}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-end pt-4 border-t border-zinc-100 dark:border-zinc-900/60">
              <button
                onClick={() =>
                  copyText(allSnapshotText, "snapshot-all", setCopiedKey)
                }
                className={subtleCopyBtn}
              >
                {copiedKey === "snapshot-all" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold">
                      Snapshot Copied
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                    <span>Copy Snapshot</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Pitching Strategy Card ── */}
      <div className={composerCardClass}>
        {/* Header */}
        <div className={headerSectionClass}>
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-md font-mono font-bold border border-zinc-200 dark:border-zinc-800">
              <Target className="w-3 h-3 inline-block mr-1 -mt-px" />
              NOTES
            </span>
            <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
              Pitching Strategy
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* intentionally empty — matches header structure */}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-150 dark:border-zinc-900" />

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <span className={labelClass}>Strategy Notes</span>
            <div className="font-sans text-[13px] sm:text-sm whitespace-pre-wrap leading-relaxed text-zinc-800 dark:text-zinc-200 font-normal">
              {result.strategy_notes}
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="flex items-center justify-end pt-4 border-t border-zinc-100 dark:border-zinc-900/60">
            <button
              onClick={() =>
                copyText(
                  result.strategy_notes,
                  "strategy_notes_copy",
                  setCopiedKey
                )
              }
              className={subtleCopyBtn}
            >
              {copiedKey === "strategy_notes_copy" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">
                    Notes Copied
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                  <span>Copy Notes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
