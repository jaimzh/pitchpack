"use client";

import { Copy, Check, RefreshCw, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { OutreachPackResponse } from "@/types";
import { copyText } from "@/lib/copy-utils";

interface EmailsTabProps {
  result: OutreachPackResponse;
  copiedKey: string | null;
  setCopiedKey: (key: string | null) => void;
  selectedSubjectIdx: number;
  setSelectedSubjectIdx: (idx: number) => void;
  isRegeneratingSection: string | null;
  onRegenerateSection: (
    section: "initial_email" | "follow_up_email" | "dm_version" | "no_budget_response"
  ) => void;
  darkMode: boolean;
}

export function EmailsTab({
  result,
  copiedKey,
  setCopiedKey,
  selectedSubjectIdx,
  setSelectedSubjectIdx,
  isRegeneratingSection,
  onRegenerateSection,
  darkMode,
}: EmailsTabProps) {
  const subjectsList = Array.from(
    new Set([
      result.outreach_pack.initial_email.subject,
      ...(result.subject_lines || []),
    ])
  ).filter(Boolean);

  const initialEntireText = `Subject: ${subjectsList[selectedSubjectIdx] || ""}\n\n${result.outreach_pack.initial_email.body}`;
  const followUpSubject = result.outreach_pack.follow_up_email.subject || `Re: ${subjectsList[selectedSubjectIdx] || ""}`;
  const followEntireText = `Subject: ${followUpSubject}\n\n${result.outreach_pack.follow_up_email.body}`;

  const composerCardClass = `border rounded-2xl overflow-hidden transition-all ${
    darkMode
      ? "border-zinc-900 bg-zinc-950/40"
      : "border-zinc-200 bg-[#fcfcfc] shadow-xs"
  }`;

  const headerSectionClass = `px-5 py-4 flex items-center justify-between gap-3 ${
    darkMode ? "bg-zinc-900/10" : "bg-zinc-50/50"
  }`;

  const labelClass = `text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-extrabold block mb-1`;

  return (
    <div className="space-y-6">
      {/* ── STEP 1: Initial Pitch Email ── */}
      <div className={composerCardClass}>
        {/* Header */}
        <div className={headerSectionClass}>
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-md font-mono font-bold border border-zinc-200 dark:border-zinc-800">
              STEP 1
            </span>
            <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
              Initial Pitch Email
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Regenerate Section */}
            <button
              onClick={() => onRegenerateSection("initial_email")}
              disabled={isRegeneratingSection === "initial_email"}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer disabled:opacity-50"
              title="Regenerate Email"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  isRegeneratingSection === "initial_email" ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-150 dark:border-zinc-900" />

        {/* Subject */}
        <div className="px-5 py-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <span className={labelClass}>Subject</span>
              <p className="text-[13px] sm:text-sm font-normal text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans">
                &ldquo;{subjectsList[selectedSubjectIdx] || "No subject alternatives found."}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-start">
              {/* Subtle Carousel */}
              {subjectsList.length > 1 && (
                <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 p-0.5 rounded-md border border-zinc-205 dark:border-zinc-800">
                  <button
                    onClick={() =>
                      setSelectedSubjectIdx(
                        selectedSubjectIdx > 0
                          ? selectedSubjectIdx - 1
                          : subjectsList.length - 1
                      )
                    }
                    className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400 cursor-pointer disabled:opacity-40"
                    title="Previous Subject"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 font-bold min-w-[20px] text-center">
                    {selectedSubjectIdx + 1}/{subjectsList.length}
                  </span>
                  <button
                    onClick={() =>
                      setSelectedSubjectIdx(
                        selectedSubjectIdx < subjectsList.length - 1
                          ? selectedSubjectIdx + 1
                          : 0
                      )
                    }
                    className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400 cursor-pointer disabled:opacity-40"
                    title="Next Subject"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Inline Copy Action */}
              <button
                onClick={() =>
                  copyText(
                    subjectsList[selectedSubjectIdx] || "",
                    "initial-subject",
                    setCopiedKey
                  )
                }
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-all cursor-pointer border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 px-2 py-0.5 rounded-md"
              >
                {copiedKey === "initial-subject" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" />
                    <span className="text-emerald-500 font-semibold text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                    <span className="text-[11px]">Copy Subject</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-150 dark:border-zinc-900" />

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <span className={labelClass}>Body</span>
            <div className="font-sans text-[13px] sm:text-sm whitespace-pre-wrap leading-relaxed text-zinc-800 dark:text-zinc-200 font-normal">
              {result.outreach_pack.initial_email.body}
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-900/60">
            <button
              onClick={() =>
                copyText(
                  initialEntireText,
                  "initial-entire",
                  setCopiedKey
                )
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 text-xs font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-all cursor-pointer"
            >
              {copiedKey === "initial-entire" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Entire Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                  <span>Copy Entire Email</span>
                </>
              )}
            </button>

            <button
              onClick={() =>
                copyText(
                  result.outreach_pack.initial_email.body,
                  "initial-body",
                  setCopiedKey
                )
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-all cursor-pointer"
            >
              {copiedKey === "initial-body" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Body Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                  <span>Copy Body</span>
                </>
              )}
            </button>

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
                subjectsList[selectedSubjectIdx] || ""
              )}&body=${encodeURIComponent(result.outreach_pack.initial_email.body)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
              <span>Open in Gmail</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── STEP 2: Follow-Up Email ── */}
      <div className={composerCardClass}>
        {/* Header */}
        <div className={headerSectionClass}>
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-md font-mono font-bold border border-zinc-200 dark:border-zinc-800">
              STEP 2
            </span>
            <h3 className="text-sm font-bold text-zinc-955 dark:text-zinc-50">
              Follow-Up Email
            </h3>
            <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
              Wait 3–5 days
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Regenerate Section */}
            <button
              onClick={() => onRegenerateSection("follow_up_email")}
              disabled={isRegeneratingSection === "follow_up_email"}
              className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer disabled:opacity-50"
              title="Regenerate Follow-Up"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  isRegeneratingSection === "follow_up_email" ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-150 dark:border-zinc-900" />

        {/* Subject */}
        <div className="px-5 py-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <span className={labelClass}>Subject</span>
              <p className="text-[13px] sm:text-sm font-normal text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans">
                &ldquo;{followUpSubject}&rdquo;
              </p>
            </div>
            <button
              onClick={() =>
                copyText(
                  followUpSubject,
                  "follow-subject",
                  setCopiedKey
                )
              }
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-all cursor-pointer shrink-0 mt-4 sm:mt-1 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 px-2 py-0.5 rounded-md"
            >
              {copiedKey === "follow-subject" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" />
                  <span className="text-emerald-500 font-semibold text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                  <span className="text-[11px]">Copy Subject</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-150 dark:border-zinc-900" />

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <span className={labelClass}>Body</span>
            <div className="font-sans text-[13px] sm:text-sm whitespace-pre-wrap leading-relaxed text-zinc-800 dark:text-zinc-200 font-normal">
              {result.outreach_pack.follow_up_email.body}
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-900/60">
            <button
              onClick={() =>
                copyText(
                  followEntireText,
                  "follow-entire",
                  setCopiedKey
                )
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 text-xs font-medium text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-all cursor-pointer"
            >
              {copiedKey === "follow-entire" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Entire Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                  <span>Copy Entire Email</span>
                </>
              )}
            </button>

            <button
              onClick={() =>
                copyText(
                  result.outreach_pack.follow_up_email.body,
                  "follow-body",
                  setCopiedKey
                )
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 text-xs font-semibold text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 transition-all cursor-pointer"
            >
              {copiedKey === "follow-body" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Body Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                  <span>Copy Body</span>
                </>
              )}
            </button>

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
                followUpSubject
              )}&body=${encodeURIComponent(result.outreach_pack.follow_up_email.body)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 text-xs font-semibold text-zinc-500 hover:text-zinc-955 dark:text-zinc-400 dark:hover:text-zinc-50 transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
              <span>Open in Gmail</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
