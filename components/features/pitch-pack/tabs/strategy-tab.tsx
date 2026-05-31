"use client";

import React from "react";
import { Copy, Check, Target } from "@phosphor-icons/react";
import { OutreachPackResponse } from "@/types";
import { copyText } from "@/lib/copy-utils";

interface StrategyTabProps {
  result: OutreachPackResponse;
  copiedKey: string | null;
  setCopiedKey: (key: string | null) => void;
}

export function StrategyTab({
  result,
  copiedKey,
  setCopiedKey,
}: StrategyTabProps) {
  const composerCardClass = "border rounded-2xl overflow-hidden transition-all border-pitchpack-border bg-pitchpack-card shadow-xs";

  const headerSectionClass = "px-5 py-4 flex items-center justify-between gap-3 bg-pitchpack-card-subtle";

  const labelClass = `text-[10px] font-mono uppercase tracking-wider text-pitchpack-text-muted font-extrabold block mb-1`;

  const subtleCopyBtn = `inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-pitchpack-border text-xs font-medium text-pitchpack-text-muted hover:text-pitchpack-text transition-all cursor-pointer`;

  const snapshotItems = result.brand_snapshot
    ? [
        { label: "Their Vibe", val: result.brand_snapshot.creative_tone },
        { label: "Who They Talk To", val: result.brand_snapshot.target_audience },
        {
          label: "Why You're a Good Fit",
          val: result.brand_snapshot.core_connection_hook,
        },
        {
          label: "What to Pitch",
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
            <div className="flex items-center gap-2.5 group">
              <span className="text-[10px] bg-pitchpack-card-subtle text-pitchpack-text-muted px-2 py-0.5 rounded-md font-mono font-bold border border-pitchpack-border">
                <Target className="w-3 h-3 inline-block mr-1 -mt-px" />
                INFO
              </span>
              <h3 className="text-sm font-bold text-pitchpack-text">
                Brand Breakdown
              </h3>
              <span className="text-[10px] text-pitchpack-text-light opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Key context and creative hooks for this brand.
              </span>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-pitchpack-border-subtle" />

          {/* Snapshot Grid */}
          <div className="px-5 py-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {snapshotItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border transition-all bg-pitchpack-card-subtle border-pitchpack-border-subtle"
                >
                  <span className={labelClass}>{item.label}</span>
                  <p className="text-xs text-pitchpack-text font-normal leading-relaxed mt-1">
                    {item.val || "Awaiting calculation..."}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-end pt-4 border-t border-pitchpack-border-subtle">
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
                    <Copy className="w-3.5 h-3.5 text-pitchpack-text-light" />
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
          <div className="flex items-center gap-2.5 group">
            <span className="text-[10px] bg-pitchpack-card-subtle text-pitchpack-text-muted px-2 py-0.5 rounded-md font-mono font-bold border border-pitchpack-border">
              <Target className="w-3 h-3 inline-block mr-1 -mt-px" />
              TIPS
            </span>
            <h3 className="text-sm font-bold text-pitchpack-text">
              How to Pitch Them
            </h3>
            <span className="text-[10px] text-pitchpack-text-light opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Actionable advice on approaching this specific brand.
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* intentionally empty — matches header structure */}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-pitchpack-border-subtle" />

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <span className={labelClass}>Advice & Next Steps</span>
            <div className="font-sans text-[13px] sm:text-sm whitespace-pre-wrap leading-relaxed text-pitchpack-text font-normal">
              {result.strategy_notes}
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="flex items-center justify-end pt-4 border-t border-pitchpack-border-subtle">
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
                  <Copy className="w-3.5 h-3.5 text-pitchpack-text-light" />
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
