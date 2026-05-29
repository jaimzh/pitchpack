"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { Mail, User, BookOpen } from "lucide-react";
import { CreatorProfileModal } from "@/components/modals/creator-profile-modal";
import { SavedPacksModal } from "@/components/modals/saved-packs-modal";
import { ApiKeyModal } from "@/components/modals/api-key-modal";
import { RateLimitBadge } from "@/components/ui/rate-limit-badge";
import { CampaignBrief } from "@/components/campaign-brief";
import { MainTabNav } from "@/components/main-tab-nav";
import { PitchPackWorkspace } from "@/components/features/pitch-pack/workspace";
import { Button } from "@/components/ui/button";
import { usePitchPackStore, FREE_TIER_LIMIT } from "@/store/usePitchPackStore";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  
  const store = usePitchPackStore();

  // Load initial settings on mount
  useEffect(() => {
    setMounted(true);
    store.initializeStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

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
              onClick={() => store.setIsProfileOpen(true)}
              className="gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => store.setIsSavedOpen(true)}
              className="gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Library ({store.savedPacks.length})</span>
            </Button>
          </div>

          <div className="w-px h-6 bg-border hidden sm:block"></div>

          {/* Rate-limit badge — opens BYOK modal */}
          {mounted && (
            <RateLimitBadge
              usedCount={store.generationCount}
              freeLimit={FREE_TIER_LIMIT}
              hasApiKey={Boolean(store.apiKey)}
              onClick={() => store.setIsApiKeyOpen(true)}
            />
          )}

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
              {store.brand.brand_name || "Untitled Brand"}
            </span>
          </div>
          
          <div className="text-[10px] font-mono select-none px-2 py-0.5 rounded-md bg-bg-dark text-text-muted">
            SYSTEM STATUS: READY
          </div>
        </div>

        {/* Modular Navigation Switcher */}
        <MainTabNav
          activeTab={store.mainTab}
          onTabChange={store.setMainTab}
          result={store.result}
          isGenerating={store.isGenerating}
          darkMode={isDark}
        />

        {/* Tab views switcher panel */}
        {store.mainTab === "brief" ? (
          <CampaignBrief
            brand={store.brand}
            setBrand={store.setBrand}
            isGenerating={store.isGenerating}
            darkMode={isDark}
            onSubmit={(e) => { e.preventDefault(); store.handleGenerate(); }}
          />
        ) : (
          <PitchPackWorkspace
            result={store.result}
            isGenerating={store.isGenerating}
            error={store.error}
            onErrorClear={() => store.setError(null)}
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
        isOpen={store.isProfileOpen}
        onClose={() => store.setIsProfileOpen(false)}
        profile={store.profile}
        setProfile={store.setProfile}
        darkMode={isDark}
      />

      {/* Saved Pack Vault Modals List */}
      <SavedPacksModal
        isOpen={store.isSavedOpen}
        onClose={() => store.setIsSavedOpen(false)}
        savedPacks={store.savedPacks}
        onLoadPack={store.handleLoadPack}
        onDeletePack={store.handleDeletePack}
        darkMode={isDark}
      />

      {/* BYOK — Rate limit & API Key Modal */}
      <ApiKeyModal
        open={store.isApiKeyOpen}
        onOpenChange={store.setIsApiKeyOpen}
        usedCount={store.generationCount}
        freeLimit={FREE_TIER_LIMIT}
        onApiKeyChange={store.setApiKey}
      />
    </div>
  );
}


