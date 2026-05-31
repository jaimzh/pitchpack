"use client";

import React from "react";
import { Copy, Check } from "@phosphor-icons/react";
import { OutreachPackResponse } from "@/types";
import { copyText } from "@/lib/copy-utils";

interface DmsTabProps {
  result: OutreachPackResponse;
  copiedKey: string | null;
  setCopiedKey: (key: string | null) => void;
}

export function DmsTab({
  result,
  copiedKey,
  setCopiedKey,
}: DmsTabProps) {
  const composerCardClass = "border rounded-2xl overflow-hidden transition-all border-pitchpack-border bg-pitchpack-card shadow-xs";

  const headerSectionClass = "px-5 py-4 flex items-center justify-between gap-3 bg-pitchpack-card-subtle";

  const labelClass = `text-[10px] font-mono uppercase tracking-wider text-pitchpack-text-muted font-extrabold block mb-1`;

  const subtleCopyBtn = `inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-pitchpack-border text-xs font-medium text-pitchpack-text-muted hover:text-pitchpack-text transition-all cursor-pointer`;

  return (
    <div className="space-y-6">
      {/* ── STEP 3: Direct Message Pitch ── */}
      <div className={composerCardClass}>
        {/* Header */}
        <div className={headerSectionClass}>
          <div className="flex items-center gap-2.5 group">
            <span className="text-[10px] bg-pitchpack-card-subtle text-pitchpack-text-muted px-2 py-0.5 rounded-md font-mono font-bold border border-pitchpack-border">
              STEP 3
            </span>
            <h3 className="text-sm font-bold text-pitchpack-text">
              Direct Message Pitch
            </h3>
            <span className="text-[10px] text-pitchpack-text-light opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              A casual pitch for Instagram, Twitter, or LinkedIn DMs.
            </span>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-pitchpack-border-subtle" />

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <span className={labelClass}>Message</span>
            <div className="font-sans text-[13px] sm:text-sm whitespace-pre-wrap leading-relaxed text-pitchpack-text font-normal">
              {result.outreach_pack.dm_version.body}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end pt-4 border-t border-pitchpack-border-subtle">
            <button
              onClick={() =>
                copyText(result.outreach_pack.dm_version.body, "dm-pack", setCopiedKey)
              }
              className={subtleCopyBtn}
            >
              {copiedKey === "dm-pack" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-pitchpack-text-light" />
                  <span>Copy Message</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── STEP 4: Zero-Budget Reply ── */}
      <div className={composerCardClass}>
        {/* Header */}
        <div className={headerSectionClass}>
          <div className="flex items-center gap-2.5 group">
            <span className="text-[10px] bg-pitchpack-card-subtle text-pitchpack-text-muted px-2 py-0.5 rounded-md font-mono font-bold border border-pitchpack-border">
              STEP 4
            </span>
            <h3 className="text-sm font-bold text-pitchpack-text">
              Zero-Budget Reply
            </h3>
            <span className="text-[10px] text-pitchpack-text-light opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Fallback response for unpaid/gifted collaborations.
            </span>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-pitchpack-border-subtle" />

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <span className={labelClass}>Response</span>
            <div className="font-sans text-[13px] sm:text-sm whitespace-pre-wrap leading-relaxed text-pitchpack-text font-normal">
              {result.outreach_pack.no_budget_response.body}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end pt-4 border-t border-pitchpack-border-subtle">
            <button
              onClick={() =>
                copyText(
                  result.outreach_pack.no_budget_response.body,
                  "no-budget-pack",
                  setCopiedKey
                )
              }
              className={subtleCopyBtn}
            >
              {copiedKey === "no-budget-pack" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-pitchpack-text-light" />
                  <span>Copy Response</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
