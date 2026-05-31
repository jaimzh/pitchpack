"use client";

import React from "react";
import { Sparkle, BuildingIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { BrandInput } from "@/types";

interface CampaignBriefProps {
  brand: BrandInput;
  setBrand: (brand: BrandInput) => void;
  isGenerating: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const PLACEHOLDER_EXAMPLE = `e.g. I want to create a 30-second TikTok showing how I use this app in my daily routine. 
Their current vibe is very professional, but I think a casual, relatable approach would perform better with my audience.`;

export function CampaignBrief({
  brand,
  setBrand,
  isGenerating,
  onSubmit,
}: CampaignBriefProps) {
  const inputClass = () =>
    `w-full text-sm px-3 py-2 rounded-lg border outline-none transition-all bg-pitchpack-card border-pitchpack-border text-pitchpack-text placeholder-pitchpack-text-light focus:border-pitchpack-border-hover shadow-xs`;

  const labelClass = `block text-xs font-semibold mb-1 text-pitchpack-text-muted`;

  return (
    <div
      className="border rounded-2xl p-6 transition-colors border-pitchpack-border bg-pitchpack-card-subtle shadow-xs"
    >
      {/* Section heading */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-dashed border-pitchpack-border">
        <BuildingIcon className="w-4 h-4 text-pitchpack-text-muted" />
        <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-pitchpack-text-muted">
          Campaign Details
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
              className={inputClass()}
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
              className={inputClass()}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Your Ideas / Campaign Details{" "}
            <span className="font-normal text-pitchpack-text-light">(Optional)</span>
          </label>
          <textarea
            rows={8}
            value={brand.creative_context}
            onChange={(e) =>
              setBrand({ ...brand, creative_context: e.target.value })
            }
            placeholder={PLACEHOLDER_EXAMPLE}
            className="w-full text-sm p-3 rounded-lg border outline-none resize-y transition-all leading-relaxed bg-pitchpack-card border-pitchpack-border text-pitchpack-text placeholder-pitchpack-text-light focus:border-pitchpack-border-hover shadow-xs"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isGenerating || !brand.brand_name.trim()}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all text-sm select-none ${
              isGenerating || !brand.brand_name.trim()
                ? "bg-pitchpack-card-subtle text-pitchpack-text-light cursor-not-allowed border border-transparent"
                : "bg-pitchpack-text hover:bg-pitchpack-text-muted text-pitchpack-card shadow-sm active:scale-[0.98] cursor-pointer"
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-pitchpack-text-light border-t-pitchpack-text rounded-full animate-spin" />
                <span>Drafting Suite...</span>
              </>
            ) : (
              <>
                <EnvelopeSimpleIcon className="w-4 h-4" />
                <span>Generate PitchPack</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

