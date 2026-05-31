"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import { UserIcon, BookmarksIcon, Key, FolderOpenIcon } from "@phosphor-icons/react";
import { CreatorProfileModal } from "@/components/modals/creator-profile-modal";
import { SavedPacksModal } from "@/components/modals/saved-packs-modal";
import { ApiKeyModal } from "@/components/modals/api-key-modal";

import { CampaignBrief } from "@/components/campaign-brief";
import { MainTabNav } from "@/components/main-tab-nav";
import { PitchPackWorkspace } from "@/components/features/pitch-pack/workspace";
import { Button } from "@/components/ui/button";
import { usePitchPackStore } from "@/store/usePitchPackStore";


export default function Home() {
  const [mounted, setMounted] = useState(false);

  const store = usePitchPackStore();

  useEffect(() => {
    setMounted(true);
    store.initializeStore();
  }, []);

  const line = "w-px h-5 bg-zinc-200 hidden sm:block";
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-between font-sans selection:bg-text selection:text-bg pb-16">
      <header className="w-full max-w-4xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-text-muted/10">
        <div className="flex items-center gap-3">
          <Image
            src="/images/pitchpack.svg"
            alt="PitchPack Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <div>
            <span className="font-bold tracking-tight text-xl">PitchPack</span>
            
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <Button
            variant="ghost"
            onClick={() => store.setIsProfileOpen(true)}
            className="h-9 px-3 text-sm rounded-[10px] sm:rounded-[12px] gap-1.5 font-medium text-text-muted hover:text-text hover:bg-zinc-100 transition-colors"
          >
            <UserIcon className="w-4 h-4" />
            <span>Profile</span>
          </Button>
          <div className={line}></div>
          <Button
            variant="ghost"
            onClick={() => store.setIsSavedOpen(true)}
            className="h-9 px-3 text-sm rounded-[10px] sm:rounded-[12px] gap-1.5 font-medium text-text-muted hover:text-text hover:bg-zinc-100 transition-colors"
          >
            <BookmarksIcon className="w-4 h-4" />
            <span>Recents ({store.savedPacks.length})</span>
          </Button>

          <div className={line}></div>

          {mounted && (
            <Button
              variant="ghost"
              onClick={() => store.setIsApiKeyOpen(true)}
              className="h-9 px-3 text-sm rounded-[10px] sm:rounded-[12px] gap-1.5 font-medium text-text-muted hover:text-text hover:bg-zinc-100 transition-colors"
            >
              <Key className="w-4 h-4" />
              <span>{store.apiKey ? "API Key" : "API Key"}</span>
              {store.apiKey && (
                <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
              )}
            </Button>
          )}
        </div>
      </header>

      <main className="w-full max-w-4xl flex-1 px-6 py-12 flex flex-col gap-6">
       
        <div className="flex items-center justify-between gap-3 pt-1 pb-3 border-b border-dashed border-zinc-200">
          <button
            type="button"
            onClick={() => store.setIsSavedOpen(true)}
            className="group flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-text transition-colors duration-150 cursor-pointer"
            title="Open your saved campaigns"
          >
            <FolderOpenIcon className="w-4 h-4 -mt-px text-text-muted group-hover:text-text transition-colors" />
            <span>Workspace</span>
            <span>/</span>
            <span className="font-medium text-text group-hover:underline underline-offset-2 decoration-zinc-400">
              {store.brand.brand_name || "Untitled Brand"}
            </span>
          </button>
        </div>

 
        <MainTabNav
          activeTab={store.mainTab}
          onTabChange={store.setMainTab}
          result={store.result}
          isGenerating={store.isGenerating}
        />

       
        {store.mainTab === "brief" ? (
          <CampaignBrief
            brand={store.brand}
            setBrand={store.setBrand}
            isGenerating={store.isGenerating}
            onSubmit={(e) => {
              e.preventDefault();
              store.handleGenerate();
            }}
          />
        ) : (
          <PitchPackWorkspace
            result={store.result}
            isGenerating={store.isGenerating}
            error={store.error}
            onErrorClear={() => store.setError(null)}
          />
        )}
      </main>

      <footer className="w-full flex justify-between  max-w-4xl px-6 py-8 border-t border-text-muted/10 text-center text-xs text-text-muted">
        <span>PitchPack © 2026</span>
        <span></span>
        <span>Made by Jaimz🦖</span>
      </footer>

      <CreatorProfileModal
        isOpen={store.isProfileOpen}
        onClose={() => store.setIsProfileOpen(false)}
        profile={store.profile}
        setProfile={store.setProfile}
      />

      <SavedPacksModal
        isOpen={store.isSavedOpen}
        onClose={() => store.setIsSavedOpen(false)}
        savedPacks={store.savedPacks}
        onLoadPack={store.handleLoadPack}
        onDeletePack={store.handleDeletePack}
      />

      <ApiKeyModal
        open={store.isApiKeyOpen}
        onOpenChange={store.setIsApiKeyOpen}
        onApiKeyChange={store.setApiKey}
      />
    </div>
  );
}
