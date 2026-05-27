"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { Mail, User, BookOpen } from "lucide-react";
import { CreatorProfile, BrandInput, OutreachPackResponse } from "@/types";
import { INITIAL_CREATOR_PROFILE, MOCK_OUTREACH_RESULT } from "@/constants/data";
import { INITIAL_BRAND } from "@/constants/brand";
import { CreatorProfileModal } from "@/components/modals/creator-profile-modal";
import { SavedPacksModal, SavedPack } from "@/components/modals/saved-packs-modal";
import { CampaignBrief } from "@/components/campaign-brief";
import { MainTabNav, MainTab } from "@/components/main-tab-nav";
import { PitchPackWorkspace } from "@/components/features/pitch-pack/workspace";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  
  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  
  // Core campaign state
  const [profile, setProfile] = useState<CreatorProfile>(INITIAL_CREATOR_PROFILE);
  const [brand, setBrand] = useState<BrandInput>({
    brand_name: "Oatly Drinks",
    website: "https://www.oatley.com",
    why_user_likes_brand: "I love their playful, honest, and slightly chaotic typography-based marketing. It matches my high-energy physics loop style perfectly.",
    user_idea: "An animation of an oat milk carton bursting open, with satisfies-to-watch splash physics where individual oat grains turn into miniature dancing characters."
  });
  
  // Main view tab nav state
  const [mainTab, setMainTab] = useState<MainTab>("pitchpack");

  // Output pack response state
  const [result, setResult] = useState<OutreachPackResponse | null>(MOCK_OUTREACH_RESULT);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Regeneration state
  const [isRegeneratingSection, setIsRegeneratingSection] = useState<string | null>(null);
  const [isRegeneratingSnapshot, setIsRegeneratingSnapshot] = useState(false);

  // Saved campaigns vault
  const [savedPacks, setSavedPacks] = useState<SavedPack[]>([]);

  // Load initial settings on mount
  useEffect(() => {
    setMounted(true);
    
    // Sync profile from local storage if existing
    const storedProfile = localStorage.getItem("outreach_profile");
    if (storedProfile) {
      try {
        setProfile(JSON.parse(storedProfile));
      } catch (e) {
        console.error("Failed parsing stored creator profile", e);
      }
    }

    // Sync saved packs from local storage
    const storedPacks = localStorage.getItem("saved_outreach_packs");
    if (storedPacks) {
      try {
        setSavedPacks(JSON.parse(storedPacks));
      } catch (e) {
        console.error("Failed parsing stored outreach packs", e);
      }
    }
  }, []);

  // Save profile changes to local storage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("outreach_profile", JSON.stringify(profile));
    }
  }, [profile, mounted]);

  const isDark = mounted && resolvedTheme === "dark";

  // Primary pack generation handler
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand.brand_name.trim()) return;

    setIsGenerating(true);
    setMainTab("pitchpack");
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator: profile, brand }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Generation query returned an invalid status.");
      }

      const data: OutreachPackResponse = await res.json();
      setResult(data);

      const newSavedItem: SavedPack = {
        id: Date.now().toString(),
        brandName: brand.brand_name,
        date: new Date().toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        data,
      };

      const updatedPacks = [newSavedItem, ...savedPacks];
      setSavedPacks(updatedPacks);
      localStorage.setItem("saved_outreach_packs", JSON.stringify(updatedPacks));
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to reach generator. Make sure your local Gemini server environment is online."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Section-by-section regeneration handler
  const handleRegenerateSection = async (
    section: "initial_email" | "follow_up_email" | "dm_version" | "no_budget_response"
  ) => {
    if (!result) return;
    setIsRegeneratingSection(section);
    try {
      const res = await fetch("/api/regenerate-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator: profile, brand, section }),
      });
      if (!res.ok) {
        throw new Error("Failed to regenerate segment context.");
      }
      const data = await res.json();

      const updatedResult = { ...result };
      updatedResult.outreach_pack[section] = data;
      setResult(updatedResult);

      // Keep saved vault synced
      const updatedPacks = savedPacks.map((pack) => {
        if (pack.brandName === brand.brand_name) {
          return { ...pack, data: updatedResult };
        }
        return pack;
      });
      setSavedPacks(updatedPacks);
      localStorage.setItem("saved_outreach_packs", JSON.stringify(updatedPacks));
    } catch (err: any) {
      alert("Error regenerating: " + err.message);
    } finally {
      setIsRegeneratingSection(null);
    }
  };

  // Snapshot intelligence block regeneration handler
  const handleRegenerateSnapshot = async () => {
    if (!result) return;
    setIsRegeneratingSnapshot(true);
    try {
      const res = await fetch("/api/regenerate-snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator: profile, brand }),
      });
      if (!res.ok) {
        throw new Error("Failed to generate brand snapshot.");
      }
      const data = await res.json();

      const updatedResult = { ...result, brand_snapshot: data };
      setResult(updatedResult);

      // Keep saved vault synced
      const updatedPacks = savedPacks.map((pack) => {
        if (pack.brandName === brand.brand_name) {
          return { ...pack, data: updatedResult };
        }
        return pack;
      });
      setSavedPacks(updatedPacks);
      localStorage.setItem("saved_outreach_packs", JSON.stringify(updatedPacks));
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsRegeneratingSnapshot(false);
    }
  };

  // Load stored campaign pack into active workspace
  const handleLoadPack = (pack: SavedPack) => {
    setResult(pack.data);
    setBrand({
      brand_name: pack.brandName,
      website: pack.data.brand_snapshot?.brand_name ? "" : "", // default or fallback Website if needed
      why_user_likes_brand: pack.data.brand_snapshot?.core_connection_hook || "",
      user_idea: "",
    });
    setMainTab("pitchpack");
  };

  // Delete saved campaign pack
  const handleDeletePack = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedPacks.filter((p) => p.id !== id);
    setSavedPacks(updated);
    localStorage.setItem("saved_outreach_packs", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-300 flex flex-col items-center justify-between font-sans selection:bg-text selection:text-white pb-16">
      {/* Header */}
      <header className="w-full max-w-4xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-text-muted/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-text flex items-center justify-center text-bg">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-xl">PitchPack</span>
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-bg-dark text-text-muted">
              v0.1.0
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsProfileOpen(true)}
              className="gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSavedOpen(true)}
              className="gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Library ({savedPacks.length})</span>
            </Button>
          </div>

          <div className="w-px h-6 bg-border hidden sm:block"></div>

          <ThemeToggle />
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="w-full max-w-4xl flex-1 px-6 py-12 flex flex-col gap-6">
        
        {/* Subtle Workspace Breadcrumb Controls Bar */}
        <div className="flex items-center justify-between gap-3 pt-1 pb-3 border-b border-dashed border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
            <span>Workspace</span>
            <span>/</span>
            <span className="font-semibold text-text">
              {brand.brand_name || "Untitled Brand"}
            </span>
          </div>
          
          <div className="text-[10px] font-mono select-none px-2 py-0.5 rounded-md bg-bg-dark text-text-muted">
            SYSTEM STATUS: READY
          </div>
        </div>

        {/* Modular Navigation Switcher */}
        <MainTabNav
          activeTab={mainTab}
          onTabChange={setMainTab}
          result={result}
          isGenerating={isGenerating}
          darkMode={isDark}
        />

        {/* Tab views switcher panel */}
        {mainTab === "brief" ? (
          <CampaignBrief
            brand={brand}
            setBrand={setBrand}
            isGenerating={isGenerating}
            darkMode={isDark}
            onSubmit={handleGenerate}
          />
        ) : (
          <PitchPackWorkspace
            result={result}
            isGenerating={isGenerating}
            error={error}
            onErrorClear={() => setError(null)}
            isRegeneratingSection={isRegeneratingSection}
            onRegenerateSection={handleRegenerateSection}
            isRegeneratingSnapshot={isRegeneratingSnapshot}
            onRegenerateSnapshot={handleRegenerateSnapshot}
            darkMode={isDark}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl px-6 py-8 border-t border-text-muted/10 text-center text-xs text-text-muted">
        PitchPack Design System • Clean, robust code using modern CSS.
      </footer>

      {/* Creator Profile Modal Settings Panel */}
      <CreatorProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        setProfile={setProfile}
        darkMode={isDark}
      />

      {/* Saved Pack Vault Modals List */}
      <SavedPacksModal
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedPacks={savedPacks}
        onLoadPack={handleLoadPack}
        onDeletePack={handleDeletePack}
        darkMode={isDark}
      />
    </div>
  );
}


