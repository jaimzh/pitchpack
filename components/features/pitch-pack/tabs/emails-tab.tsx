"use client";

import { Copy, Check, CaretLeft, CaretRight, Envelope } from "@phosphor-icons/react";
import { OutreachPackResponse } from "@/types";
import { copyText } from "@/lib/copy-utils";

interface EmailsTabProps {
  result: OutreachPackResponse;
  copiedKey: string | null;
  setCopiedKey: (key: string | null) => void;
  selectedSubjectIdx: number;
  setSelectedSubjectIdx: (idx: number) => void;
}

export function EmailsTab({
  result,
  copiedKey,
  setCopiedKey,
  selectedSubjectIdx,
  setSelectedSubjectIdx,
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

  const composerCardClass = "border rounded-2xl overflow-hidden transition-all border-pitchpack-border bg-pitchpack-card shadow-xs";

  const headerSectionClass = "px-5 py-4 flex items-center justify-between gap-3 bg-pitchpack-card-subtle";

  const labelClass = `text-[10px] font-mono uppercase tracking-wider text-pitchpack-text-muted font-extrabold block mb-1`;

  return (
    <div className="space-y-6">
      {/* ── STEP 1: Initial Pitch Email ── */}
      <div className={composerCardClass}>
        {/* Header */}
        <div className={headerSectionClass}>
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm font-bold text-pitchpack-text">
              Initial Pitch Email
            </h3>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-pitchpack-border-subtle" />

        {/* Subject */}
        <div className="px-5 py-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <span className={labelClass}>Subject</span>
              <p className="text-[13px] sm:text-sm font-normal text-pitchpack-text leading-relaxed font-sans">
                &ldquo;{subjectsList[selectedSubjectIdx] || "No subject alternatives found."}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-start">
              {/* Subtle Carousel */}
              {subjectsList.length > 1 && (
                <div className="flex items-center gap-1.5 text-pitchpack-text-light bg-pitchpack-card-subtle p-0.5 rounded-md border border-pitchpack-border">
                  <button
                    onClick={() =>
                      setSelectedSubjectIdx(
                        selectedSubjectIdx > 0
                          ? selectedSubjectIdx - 1
                          : subjectsList.length - 1
                      )
                    }
                    className="p-1 rounded hover:bg-pitchpack-card transition-colors text-pitchpack-text-muted cursor-pointer disabled:opacity-40"
                    title="Previous Subject"
                  >
                    <CaretLeft className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] font-mono text-pitchpack-text-muted font-bold min-w-[20px] text-center">
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
                    className="p-1 rounded hover:bg-pitchpack-card transition-colors text-pitchpack-text-muted cursor-pointer disabled:opacity-40"
                    title="Next Subject"
                  >
                    <CaretRight className="w-3 h-3" />
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
                className="inline-flex items-center gap-1.5 text-xs font-medium text-pitchpack-text-muted hover:text-pitchpack-text transition-all cursor-pointer border border-transparent hover:border-pitchpack-border px-2 py-0.5 rounded-md"
              >
                {copiedKey === "initial-subject" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" />
                    <span className="text-emerald-500 font-semibold text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-pitchpack-text-light" />
                    <span className="text-[11px]">Copy Subject</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-pitchpack-border-subtle" />

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <span className={labelClass}>Body</span>
            <div className="font-sans text-[13px] sm:text-sm whitespace-pre-wrap leading-relaxed text-pitchpack-text font-normal">
              {result.outreach_pack.initial_email.body}
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-pitchpack-border-subtle">
            <button
              onClick={() =>
                copyText(
                  initialEntireText,
                  "initial-entire",
                  setCopiedKey
                )
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-pitchpack-border text-xs font-medium text-pitchpack-text-muted hover:text-pitchpack-text transition-all cursor-pointer"
            >
              {copiedKey === "initial-entire" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Entire Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-pitchpack-text-light" />
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
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-pitchpack-border text-xs font-semibold text-pitchpack-text-muted hover:text-pitchpack-text transition-all cursor-pointer"
            >
              {copiedKey === "initial-body" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Body Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-pitchpack-text-light" />
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
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-pitchpack-border text-xs font-semibold text-pitchpack-text-muted hover:text-pitchpack-text transition-all cursor-pointer"
            >
              <Envelope className="w-3.5 h-3.5 text-pitchpack-text-light" />
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
            <h3 className="text-sm font-bold text-pitchpack-text">
              Follow-Up Email
            </h3>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-pitchpack-border-subtle" />

        {/* Subject */}
        <div className="px-5 py-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <span className={labelClass}>Subject</span>
              <p className="text-[13px] sm:text-sm font-normal text-pitchpack-text leading-relaxed font-sans">
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
              className="inline-flex items-center gap-1.5 text-xs font-medium text-pitchpack-text-muted hover:text-pitchpack-text transition-all cursor-pointer shrink-0 mt-4 sm:mt-1 border border-transparent hover:border-pitchpack-border px-2 py-0.5 rounded-md"
            >
              {copiedKey === "follow-subject" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" />
                  <span className="text-emerald-500 font-semibold text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-pitchpack-text-light" />
                  <span className="text-[11px]">Copy Subject</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-pitchpack-border-subtle" />

        {/* Body */}
        <div className="px-5 py-5 space-y-4">
          <div className="space-y-1.5">
            <span className={labelClass}>Body</span>
            <div className="font-sans text-[13px] sm:text-sm whitespace-pre-wrap leading-relaxed text-pitchpack-text font-normal">
              {result.outreach_pack.follow_up_email.body}
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-pitchpack-border-subtle">
            <button
              onClick={() =>
                copyText(
                  followEntireText,
                  "follow-entire",
                  setCopiedKey
                )
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-pitchpack-border text-xs font-medium text-pitchpack-text-muted hover:text-pitchpack-text transition-all cursor-pointer"
            >
              {copiedKey === "follow-entire" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Entire Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-pitchpack-text-light" />
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
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-pitchpack-border text-xs font-semibold text-pitchpack-text-muted hover:text-pitchpack-text transition-all cursor-pointer"
            >
              {copiedKey === "follow-body" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Body Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-pitchpack-text-light" />
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
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-pitchpack-border text-xs font-semibold text-pitchpack-text-muted hover:text-pitchpack-text transition-all cursor-pointer"
            >
              <Envelope className="w-3.5 h-3.5 text-pitchpack-text-light" />
              <span>Open in Gmail</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
