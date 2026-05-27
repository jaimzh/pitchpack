"use client";

import React, { useState } from "react";
import { User, X, Link2, Sparkles, Smile, Plus } from "lucide-react";
import { CreatorProfile } from "@/types";
import { Button } from "@/components/ui/button";

// Safe, zero-dependency inline SVG brand icons
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="currentColor">
    <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z" />
  </svg>
);

interface CreatorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CreatorProfile;
  setProfile: (profile: CreatorProfile) => void;
  darkMode: boolean;
}

export function CreatorProfileModal({
  isOpen,
  onClose,
  profile,
  setProfile,
  darkMode,
}: CreatorProfileModalProps) {
  const [newService, setNewService] = useState("");
  const [newPortfolio, setNewPortfolio] = useState("");

  if (!isOpen) return null;

  const addService = () => {
    if (newService.trim() && !profile.services.includes(newService.trim())) {
      setProfile({
        ...profile,
        services: [...profile.services, newService.trim()],
      });
      setNewService("");
    }
  };

  const removeService = (index: number) => {
    setProfile({
      ...profile,
      services: profile.services.filter((_, i) => i !== index),
    });
  };

  const addPortfolio = () => {
    if (
      newPortfolio.trim() &&
      !profile.portfolioLinks.includes(newPortfolio.trim())
    ) {
      setProfile({
        ...profile,
        portfolioLinks: [...profile.portfolioLinks, newPortfolio.trim()],
      });
      setNewPortfolio("");
    }
  };

  const removePortfolio = (index: number) => {
    setProfile({
      ...profile,
      portfolioLinks: profile.portfolioLinks.filter((_, i) => i !== index),
    });
  };

  const getLinkIcon = (url: string) => {
    const lowercaseUrl = url.toLowerCase();
    if (
      lowercaseUrl.includes("youtube.com") ||
      lowercaseUrl.includes("youtu.be")
    ) {
      return <YoutubeIcon className="w-3.5 h-3.5 text-text shrink-0" />;
    }
    if (lowercaseUrl.includes("tiktok.com")) {
      return (
        <TiktokIcon className="w-3.5 h-3.5 text-text shrink-0" />
      );
    }
    return <Link2 className="w-3.5 h-3.5 text-text shrink-0" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition-colors duration-300 ${
          darkMode
            ? "bg-[#161616] border-[#292929] text-zinc-200"
            : "bg-[#FCFCFC] border-[#E4E4E3] text-zinc-800"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-dashed border-[#292929] dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 dark:bg-zinc-800 flex items-center justify-center text-primary dark:text-zinc-300">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">
                Creator Profile
              </h3>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Scrollable Form */}
        <div className="space-y-5 max-h-[460px] overflow-y-auto pr-1">
          
          {/* Section 1: Creative Persona */}
          <div
            className={`p-4 rounded-xl border space-y-4 transition-colors ${
              darkMode
                ? "bg-[#1A1A1A] border-[#292929]"
                : "bg-[#FBFBFA] border-[#DFDFDE]"
            }`}
          >
            <div className="flex items-center gap-1.5 border-b border-dashed border-[#292929] dark:border-zinc-800 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                1. Creator Info
              </h4>
            </div>

            {/* Real Name & Stage Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="group">
                <label className="block text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg border outline-none transition-all focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 ${
                    darkMode
                      ? "bg-[#252525] border-[#2D2D2D] text-zinc-200"
                      : "bg-white border-[#DFDFDE] text-zinc-800"
                  }`}
                  placeholder="e.g. James"
                />
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1 block opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
                  Used for signing off on emails & pitches
                </span>
              </div>
              <div className="group">
                <label className="block text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                  Creator / Brand Name
                </label>
                <input
                  type="text"
                  value={profile.creatorName}
                  onChange={(e) =>
                    setProfile({ ...profile, creatorName: e.target.value })
                  }
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg border outline-none transition-all focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 ${
                    darkMode
                      ? "bg-[#252525] border-[#2D2D2D] text-zinc-200"
                      : "bg-white border-[#DFDFDE] text-zinc-800"
                  }`}
                  placeholder="e.g. Jaimz Art"
                />
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1 block opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
                  What your audience knows you by
                </span>
              </div>
            </div>

            {/* Outbound Tone & Style Hook */}
            <div className="grid grid-cols-2 gap-3">
              <div className="group">
                <label className="block text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                  Pitch Tone
                </label>
                <input
                  type="text"
                  value={profile.tone}
                  onChange={(e) =>
                    setProfile({ ...profile, tone: e.target.value })
                  }
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg border outline-none transition-all focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 ${
                    darkMode
                      ? "bg-[#252525] border-[#2D2D2D] text-zinc-200"
                      : "bg-white border-[#DFDFDE] text-zinc-800"
                  }`}
                  placeholder="e.g. friendly, professional, hyped"
                />
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1 block opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
                  How should your pitches sound?
                </span>
              </div>
              <div className="group">
                <label className="block text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                  Your &quot;Secret Sauce&quot;
                </label>
                <input
                  type="text"
                  value={profile.uniqueAngle || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, uniqueAngle: e.target.value })
                  }
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg border outline-none transition-all focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 ${
                    darkMode
                      ? "bg-[#252525] border-[#2D2D2D] text-zinc-200"
                      : "bg-white border-[#DFDFDE] text-zinc-800"
                  }`}
                  placeholder="e.g. Humorous storytelling..."
                />
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1 block opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
                  What makes you unique to work with?
                </span>
              </div>
            </div>

            {/* Creative Bio */}
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Quick Bio
              </label>
              <textarea
                rows={2}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className={`w-full text-xs px-2.5 py-2 rounded-lg border outline-none resize-none transition-all focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 ${
                  darkMode
                    ? "bg-[#252525] border-[#2D2D2D] text-zinc-200"
                    : "bg-white border-[#DFDFDE] text-zinc-800"
                }`}
                placeholder="Describe your content style in one simple sentence..."
              />
            </div>
          </div>

          {/* Section 2: Audience & Reach */}
          <div
            className={`p-4 rounded-xl border space-y-4 transition-colors ${
              darkMode
                ? "bg-[#1A1A1A] border-[#292929]"
                : "bg-[#FBFBFA] border-[#DFDFDE]"
            }`}
          >
            <div className="flex items-center gap-1.5 border-b border-dashed border-[#292929] dark:border-zinc-800 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                2. Audience & Reach
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="group">
                <div className="flex items-center gap-1.5 mb-1.5">
                  {getLinkIcon("tiktok.com")}
                  <label className="block text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    TikTok
                  </label>
                </div>
                <input
                  type="text"
                  value={
                    profile.tiktokFollowers === 0
                      ? ""
                      : profile.tiktokFollowers.toLocaleString("en-US")
                  }
                  onChange={(e) => {
                    const cleanVal = e.target.value.replace(/[^0-9]/g, "");
                    const val = parseInt(cleanVal, 10);
                    setProfile({
                      ...profile,
                      tiktokFollowers: isNaN(val) ? 0 : val,
                    });
                  }}
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg border outline-none transition-all focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 ${
                    darkMode
                      ? "bg-[#252525] border-[#2D2D2D] text-zinc-200"
                      : "bg-white border-[#DFDFDE] text-zinc-800"
                  }`}
                  placeholder="0 (Optional)"
                />
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1 block opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
                  How many TikTok followers do you have?
                </span>
              </div>
              <div className="group">
                <div className="flex items-center gap-1.5 mb-1.5">
                  {getLinkIcon("youtube.com")}
                  <label className="block text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    YouTube
                  </label>
                </div>
                <input
                  type="text"
                  value={
                    profile.youtubeFollowers === 0
                      ? ""
                      : profile.youtubeFollowers.toLocaleString("en-US")
                  }
                  onChange={(e) => {
                    const cleanVal = e.target.value.replace(/[^0-9]/g, "");
                    const val = parseInt(cleanVal, 10);
                    setProfile({
                      ...profile,
                      youtubeFollowers: isNaN(val) ? 0 : val,
                    });
                  }}
                  className={`w-full text-xs px-2.5 py-1.5 rounded-lg border outline-none transition-all focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-500 ${
                    darkMode
                      ? "bg-[#252525] border-[#2D2D2D] text-zinc-200"
                      : "bg-white border-[#DFDFDE] text-zinc-800"
                  }`}
                  placeholder="0 (Optional)"
                />
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1 block opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
                  How many YouTube subscribers do you have?
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Portfolio Showcase */}
          <div
            className={`p-4 rounded-xl border space-y-4 transition-colors ${
              darkMode
                ? "bg-[#1A1A1A] border-[#292929]"
                : "bg-[#FBFBFA] border-[#DFDFDE]"
            }`}
          >
            <div className="flex items-center gap-1.5 border-b border-dashed border-[#292929] dark:border-zinc-800 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                3. Portfolio & Channels
              </h4>
            </div>

            {profile.portfolioLinks.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {profile.portfolioLinks.map((link, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all hover:scale-[1.02] ${
                      darkMode
                        ? "bg-[#252525] border-[#2D2D2D] text-zinc-300"
                        : "bg-white border-[#DFDFDE] text-zinc-700"
                    }`}
                  >
                    {getLinkIcon(link)}
                    <span className="truncate max-w-[200px]">{link}</span>
                    <Button
                      type="button"
                      onClick={() => removePortfolio(idx)}
                      variant="ghost"
                      size="icon-xs"
                      className="text-zinc-400 hover:text-red-500 h-4 w-4 p-0 ml-0.5 transition-colors animate-fade-in"
                      title="Remove"
                    >
                      <X className="w-2.5 h-2.5" />
                    </Button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 italic mb-2">
                No showcase links added yet. Let&apos;s add one below!
              </p>
            )}

            <div className="group">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. youtube.com/c/jaimzart"
                  value={newPortfolio}
                  onChange={(e) => setNewPortfolio(e.target.value)}
                  className={`flex-1 text-xs px-2.5 py-1.5 rounded-md border outline-none ${
                    darkMode
                      ? "bg-[#202020] border-[#2D2D2D] text-zinc-200"
                      : "bg-white border-[#DFDFDE] text-zinc-800"
                  }`}
                />
                <Button
                  type="button"
                  onClick={addPortfolio}
                  size="sm"
                  className="gap-1 shrink-0 font-semibold"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </Button>
              </div>
              <span className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1 block opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
                Link directly to your best social channels, playlists, or videos.
              </span>
            </div>
          </div>

          {/* Section 4: Key Offerings */}
          <div
            className={`p-4 rounded-xl border space-y-4 transition-colors ${
              darkMode
                ? "bg-[#1A1A1A] border-[#292929]"
                : "bg-[#FBFBFA] border-[#DFDFDE]"
            }`}
          >
            <div className="flex items-center gap-1.5 border-b border-dashed border-[#292929] dark:border-zinc-800 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                4. Your Services
              </h4>
            </div>

            {profile.services.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {profile.services.map((svc, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] border transition-all hover:scale-[1.02] ${
                      darkMode
                        ? "bg-[#252525] border-[#2D2D2D] text-zinc-300"
                        : "bg-white border-[#DFDFDE] text-zinc-700"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                    <span>{svc}</span>
                    <Button
                      type="button"
                      onClick={() => removeService(idx)}
                      variant="ghost"
                      size="icon-xs"
                      className="text-zinc-400 hover:text-red-500 h-4 w-4 p-0 ml-0.5 transition-colors"
                    >
                      <X className="w-2.5 h-2.5" />
                    </Button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 italic mb-2">
                No services added yet. Let&apos;s list one below!
              </p>
            )}

            <div className="group">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Character design"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className={`flex-1 text-xs px-2.5 py-1.5 rounded-md border outline-none ${
                    darkMode
                      ? "bg-[#202020] border-[#2D2D2D] text-zinc-200"
                      : "bg-white border-[#DFDFDE] text-zinc-800"
                  }`}
                />
                <Button
                  type="button"
                  onClick={addService}
                  size="sm"
                  className="gap-1 shrink-0 font-semibold"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </Button>
              </div>
              <span className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-1 block opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
                What do you offer? List services or custom creative formats.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-3 mt-4 border-t border-dashed border-[#292929] dark:border-zinc-800">
          <Button
            onClick={onClose}
            size="sm"
            className="font-bold tracking-tight shadow-sm hover:shadow-md"
          >
            Save & Close
          </Button>
        </div>
      </div>
    </div>
  );
}
