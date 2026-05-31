import { create } from "zustand";
import { CreatorProfile, BrandInput, OutreachPackResponse } from "@/types";
import { SavedPack } from "@/components/modals/saved-packs-modal";
import { INITIAL_CREATOR_PROFILE } from "@/constants/data";
import { INITIAL_BRAND } from "@/constants/brand";
import { getStoredApiKey } from "@/lib/api-key-store";
import { MainTab } from "@/components/main-tab-nav";



interface PitchPackState {
  // Modals state
  isProfileOpen: boolean;
  setIsProfileOpen: (isOpen: boolean) => void;
  isSavedOpen: boolean;
  setIsSavedOpen: (isOpen: boolean) => void;
  isApiKeyOpen: boolean;
  setIsApiKeyOpen: (isOpen: boolean) => void;

  // BYOK / rate-limit state
  apiKey: string | null;
  setApiKey: (key: string | null) => void;


  // Core campaign state
  profile: CreatorProfile;
  setProfile: (profile: CreatorProfile) => void;
  brand: BrandInput;
  setBrand: (brand: BrandInput) => void;

  // Main view tab nav state
  mainTab: MainTab;
  setMainTab: (tab: MainTab) => void;

  // Output pack response state
  result: OutreachPackResponse | null;
  setResult: (result: OutreachPackResponse | null) => void;

  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;

  // Saved campaigns vault
  savedPacks: SavedPack[];
  setSavedPacks: (packs: SavedPack[]) => void;

  // Actions
  initializeStore: () => void;
  handleGenerate: () => Promise<void>;
  handleLoadPack: (pack: SavedPack) => void;
  handleDeletePack: (id: string) => void;
}

export const usePitchPackStore = create<PitchPackState>((set, get) => ({
  // Modals state
  isProfileOpen: false,
  setIsProfileOpen: (isOpen) => set({ isProfileOpen: isOpen }),
  isSavedOpen: false,
  setIsSavedOpen: (isOpen) => set({ isSavedOpen: isOpen }),
  isApiKeyOpen: false,
  setIsApiKeyOpen: (isOpen) => set({ isApiKeyOpen: isOpen }),

  // BYOK / rate-limit state
  apiKey: null,
  setApiKey: (key) => set({ apiKey: key }),


  // Core campaign state
  profile: INITIAL_CREATOR_PROFILE,
  setProfile: (profile) => {
    set({ profile });
    localStorage.setItem("outreach_profile", JSON.stringify(profile));
  },
  brand: INITIAL_BRAND,
  setBrand: (brand) => set({ brand }),

  // Main view tab nav state
  mainTab: "brief",
  setMainTab: (tab) => set({ mainTab: tab }),

  // Output pack response state
  result: null,
  setResult: (result) => set({ result }),

  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  error: null,
  setError: (error) => set({ error }),

  // Saved campaigns vault
  savedPacks: [],
  setSavedPacks: (packs) => set({ savedPacks: packs }),

  // Actions
  initializeStore: () => {
    // Sync profile
    const storedProfile = localStorage.getItem("outreach_profile");
    if (storedProfile) {
      try {
        set({ profile: JSON.parse(storedProfile) });
      } catch (e) {
        console.error("Failed parsing stored creator profile", e);
      }
    }

    // Sync saved packs
    const storedPacks = localStorage.getItem("saved_outreach_packs");
    if (storedPacks) {
      try {
        set({ savedPacks: JSON.parse(storedPacks) });
      } catch (e) {
        console.error("Failed parsing stored outreach packs", e);
      }
    }

    // Load BYOK API key + generation count
    set({ apiKey: getStoredApiKey() });

  },

  handleGenerate: async () => {
    const state = get();
    const { brand, apiKey, profile, savedPacks } = state;

    if (!brand.brand_name.trim()) return;

    set({ isGenerating: true, mainTab: "pitchpack", error: null, result: null });

    console.log("[PitchPack] 🚀 Sending generate request", {
      brand: brand.brand_name,
      hasByokKey: Boolean(apiKey),
      byokKeyPrefix: apiKey?.slice(0, 8) ?? "(none — using server key)",
      creatorName: profile.creatorName,
      timestamp: new Date().toISOString(),
    });

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "X-Google-Api-Key": apiKey } : {}),
        },
        body: JSON.stringify({ creator: profile, brand }),
      });

      console.log("[PitchPack] 📡 Response received", {
        status: res.status,
        statusText: res.statusText,
        ok: res.ok,
      });

      if (res.status === 429) {
        const errMsg = "Google Gemini API quota exceeded (Rate Limit reached). Add your own Google AI Studio key via the badge in the header to unlock unlimited generations.";
        console.warn("[PitchPack] ⚠️ 429 Rate limit hit");
        set({ error: errMsg, isGenerating: false });
        return;
      }

      if (!res.ok) {
        let errMsg = "Generation query returned an invalid status.";
        try {
          const errorData = await res.json();
          errMsg = errorData.error || errMsg;
        } catch {
          try {
            const rawText = await res.text();
            console.error("[PitchPack] ❌ Non-JSON error body:", rawText.slice(0, 500));
            if (rawText.trim()) errMsg = rawText.slice(0, 300);
          } catch { /* ignore */ }
        }
        console.error("[PitchPack] ❌ Non-OK response", { status: res.status, errMsg });
        if (
          errMsg.includes("429") ||
          errMsg.toLowerCase().includes("quota") ||
          errMsg.toLowerCase().includes("limit") ||
          errMsg.toLowerCase().includes("resource_exhausted")
        ) {
          set({
            error: "Google Gemini API quota exceeded (Rate Limit reached). Add your own Google AI Studio key via the badge in the header to unlock unlimited generations.",
            isGenerating: false,
          });
          return;
        }
        throw new Error(errMsg);
      }

      const data: OutreachPackResponse = await res.json();
      console.log("[PitchPack] ✅ Generation success", {
        hasBrandSnapshot: Boolean(data.brand_snapshot),
        sections: data.outreach_pack ? Object.keys(data.outreach_pack) : [],
      });
      set({ result: data });



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
      set({ savedPacks: updatedPacks });
      localStorage.setItem("saved_outreach_packs", JSON.stringify(updatedPacks));
    } catch (err: any) {
      console.error("[PitchPack] 💥 Generate caught error", err);
      set({
        error: err.message || "Failed to reach generator. Make sure your local Gemini server environment is online.",
      });
    } finally {
      set({ isGenerating: false });
    }
  },

  handleLoadPack: (pack) => {
    set({
      result: pack.data,
      brand: {
        brand_name: pack.brandName,
        website: pack.data.brand_snapshot?.brand_name ? "" : "",
        creative_context: pack.data.brand_snapshot?.core_connection_hook || "",
      },
      mainTab: "pitchpack",
    });
  },

  handleDeletePack: (id) => {
    const updated = get().savedPacks.filter((p) => p.id !== id);
    set({ savedPacks: updated });
    localStorage.setItem("saved_outreach_packs", JSON.stringify(updated));
  },
}));
