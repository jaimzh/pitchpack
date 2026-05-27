"use client";

import { Sparkle, Sparkles, Target } from "lucide-react";
import { BrandInput } from "@/types";

interface CampaignBriefProps {
  brand: BrandInput;
  setBrand: (brand: BrandInput) => void;
  isGenerating: boolean;
  darkMode: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function CampaignBrief({
  brand,
  setBrand,
  isGenerating,
  darkMode,
  onSubmit,
}: CampaignBriefProps) {
  const inputClass = (dark: boolean) =>
    `w-full text-sm px-3 py-2 rounded-lg border outline-none transition-all ${
      dark
        ? "bg-[#111111] border-zinc-800 text-zinc-100 placeholder-zinc-700 focus:border-zinc-600"
        : "bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-zinc-400 shadow-xs"
    }`;

  const labelClass = `block text-xs font-semibold mb-1 ${
    darkMode ? "text-zinc-450" : "text-zinc-500"
  }`;

  return (
    <div
      className={`border rounded-2xl p-6 transition-colors ${
        darkMode
          ? "border-zinc-900 bg-zinc-950/30"
          : "border-zinc-200 bg-[#fcfcfc] shadow-xs"
      }`}
    >
      {/* Section heading */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-dashed border-zinc-200 dark:border-zinc-900">
        <Target className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-zinc-500">
          Target Collaboration Settings
        </h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Brand name + website */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Brand / Sponsor Name{" "}
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={brand.brand_name}
              onChange={(e) =>
                setBrand({ ...brand, brand_name: e.target.value })
              }
              placeholder="e.g. Oatly, Gymshark, Liquid Death..."
              className={inputClass(darkMode)}
            />
          </div>

          <div>
            <label className={labelClass}>Website / URL</label>
            <input
              type="url"
              value={brand.website}
              onChange={(e) =>
                setBrand({ ...brand, website: e.target.value })
              }
              placeholder="https://example.com"
              className={inputClass(darkMode)}
            />
          </div>
        </div>

        {/* Why this brand */}
        <div>
          <label className={labelClass}>
            What brings you to this brand?{" "}
            <span className="text-zinc-400 font-normal">
              (Your authentic affinity connection)
            </span>
          </label>
          <textarea
            rows={2}
            value={brand.why_user_likes_brand}
            onChange={(e) =>
              setBrand({ ...brand, why_user_likes_brand: e.target.value })
            }
            placeholder="Why do you genuinely love their product, creative direction, or visual branding style?"
            className={`w-full text-sm p-3 rounded-lg border outline-none resize-none transition-all ${
              darkMode
                ? "bg-[#111111] border-zinc-800 text-zinc-100 placeholder-zinc-700 focus:border-zinc-600"
                : "bg-white border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-zinc-400 shadow-xs"
            }`}
          />
        </div>

        {/* Speculative idea — Notion callout style */}
        <div
          className={`p-4 rounded-xl border flex gap-3 ${
            darkMode
              ? "bg-zinc-950 border-zinc-900"
              : "bg-zinc-50/50 border-zinc-200"
          }`}
        >
          <Sparkle className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <label className={`block text-xs font-semibold mb-1 ${darkMode ? "text-zinc-450" : "text-zinc-600"}`}>
              Speculative Animation Loop Idea{" "}
              <span className="font-normal text-zinc-400">(Optional)</span>
            </label>
            <textarea
              rows={2}
              value={brand.user_idea}
              onChange={(e) =>
                setBrand({ ...brand, user_idea: e.target.value })
              }
              placeholder="Describe a loose video sequence idea you've got. Leave empty and the AI will design fully personalized concepts."
              className={`w-full text-sm px-3 py-2 bg-transparent outline-none border-b border-transparent focus:border-zinc-500 resize-none ${
                darkMode
                  ? "text-zinc-200 placeholder-zinc-600"
                  : "text-zinc-800 placeholder-zinc-400"
              }`}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isGenerating || !brand.brand_name.trim()}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all text-sm select-none ${
              isGenerating || !brand.brand_name.trim()
                ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-700 cursor-not-allowed border border-transparent"
                : "bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 shadow-sm active:scale-[0.98] cursor-pointer"
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-zinc-400 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100 rounded-full animate-spin" />
                <span>Drafting Suite...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate PitchPack</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
