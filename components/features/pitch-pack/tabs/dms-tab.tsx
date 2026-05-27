"use client";

import React from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { OutreachPackResponse } from "@/types";
import { copyText } from "@/lib/copy-utils";

interface DmsTabProps {
  result: OutreachPackResponse;
  copiedKey: string | null;
  setCopiedKey: (key: string | null) => void;
  isRegeneratingSection: string | null;
  onRegenerateSection: (
    section: "initial_email" | "follow_up_email" | "dm_version" | "no_budget_response"
  ) => void;
  darkMode: boolean;
}

export function DmsTab({
  result,
  copiedKey,
  setCopiedKey,
  isRegeneratingSection,
  onRegenerateSection,
  darkMode,
}: DmsTabProps) {
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

  return (
    <div className="space-y-6">
      {/* ── STEP 3: Direct Message Pitch ── */}
      <div className={composerCardClass}>
        {/* Header */}
        <div className={headerSectionClass}>
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-md font-mono font-bold border border-zinc-200 dark:border-zinc-800">
              STEP 3
            </span>
            <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
              Direct Message Pitch
            </h3>
          </div>

          <button
            onClick={() => onRegenerateSection("dm_version")}
            disabled={isRegeneratingSection === "dm_version"}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer disabled:opacity-50"
            title="Regenerate DM"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                isRegeneratingSection === "dm_version" ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-100 dark:border-zinc-900" />

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <span className={labelClass}>Message</span>
            <div className="font-sans text-[13px] sm:text-sm whitespace-pre-wrap leading-relaxed text-zinc-800 dark:text-zinc-200 font-normal">
              {result.outreach_pack.dm_version.body}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end pt-4 border-t border-zinc-100 dark:border-zinc-900/60">
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
                  <Copy className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
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
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-md font-mono font-bold border border-zinc-200 dark:border-zinc-800">
              STEP 4
            </span>
            <div>
              <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                Zero-Budget Reply
              </h3>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                Fallback response for unpaid/gifted collaborations
              </p>
            </div>
          </div>

          <button
            onClick={() => onRegenerateSection("no_budget_response")}
            disabled={isRegeneratingSection === "no_budget_response"}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer disabled:opacity-50 shrink-0"
            title="Regenerate Reply"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                isRegeneratingSection === "no_budget_response" ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-100 dark:border-zinc-900" />

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <span className={labelClass}>Response</span>
            <div className="font-sans text-[13px] sm:text-sm whitespace-pre-wrap leading-relaxed text-zinc-800 dark:text-zinc-200 font-normal">
              {result.outreach_pack.no_budget_response.body}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end pt-4 border-t border-zinc-100 dark:border-zinc-900/60">
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
                  <Copy className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
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
