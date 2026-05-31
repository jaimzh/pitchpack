"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { ArrowSquareOut, Check, Trash, Eye, EyeSlash } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getStoredApiKey,
  setStoredApiKey,
  clearStoredApiKey,
} from "@/lib/api-key-store";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called when a key is saved or cleared */
  onApiKeyChange?: (key: string | null) => void;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ApiKeyModal({
  open,
  onOpenChange,
  onApiKeyChange,
}: ApiKeyModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [existingKey, setExistingKey] = useState<string | null>(null);

  // Load stored key on mount / open
  useEffect(() => {
    if (open) {
      const stored = getStoredApiKey();
      setExistingKey(stored);
      setInputValue("");
      setSaved(false);
      setShowKey(false);
    }
  }, [open]);

  const hasKey = Boolean(existingKey);

  function handleSave() {
    if (!inputValue.trim()) return;
    setStoredApiKey(inputValue.trim());
    setExistingKey(inputValue.trim());
    setSaved(true);
    onApiKeyChange?.(inputValue.trim());
    setTimeout(() => setSaved(false), 2000);
  }

  function handleClear() {
    clearStoredApiKey();
    setExistingKey(null);
    setInputValue("");
    onApiKeyChange?.(null);
  }

  // Mask the stored key for display
  function maskKey(key: string) {
    if (key.length <= 8) return "••••••••";
    return key.slice(0, 6) + "••••••••••••" + key.slice(-4);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-md gap-0 p-0 overflow-hidden bg-pitchpack-bg border-pitchpack-border"
      >
        {/* ── Header ── */}
        <div className="px-5 pt-5 pb-4 border-b border-pitchpack-border-subtle">
          <DialogHeader className="gap-1">
            <DialogTitle className="text-[15px] font-semibold leading-tight">
              Gemini API Key
            </DialogTitle>
            <DialogDescription className="text-xs leading-relaxed">
              Add your Google Gemini API key to use PitchPack. Your key is
              stored securely in your browser and never sent to our servers.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* ── Key input / status section ── */}
        <div className="px-5 py-4 flex flex-col gap-3">
          {hasKey ? (
            /* Show masked key + remove button when key is already saved */
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-pitchpack-text-muted uppercase tracking-wide">
                Active key
              </label>
              <div className="flex items-center gap-2 h-9 px-3 rounded-lg border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-xs font-mono text-pitchpack-text flex-1 truncate">
                  {maskKey(existingKey!)}
                </span>
                <button
                  onClick={handleClear}
                  title="Remove key"
                  className="p-1 rounded hover:bg-red-100 text-pitchpack-text-light hover:text-red-500 transition-colors"
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Your key is active and ready to use.
              </p>

              {/* Allow replacing the key */}
              <div className="mt-1 flex flex-col gap-2">
                <label className="text-xs font-semibold text-pitchpack-text-muted">
                  Replace key
                </label>
                <div className="relative">
                  <Input
                    type={showKey ? "text" : "password"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="AIza..."
                    className="pr-9 font-mono text-xs"
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-pitchpack-text-light hover:text-pitchpack-text transition-colors"
                  >
                    {showKey ? (
                      <EyeSlash className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* No key yet — show input to add one */
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-pitchpack-text-muted uppercase tracking-wide">
                Your API key
              </label>
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="AIza..."
                  className="pr-9 font-mono text-xs"
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowKey((v) => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-pitchpack-text-light hover:text-pitchpack-text transition-colors"
                >
                  {showKey ? (
                    <EyeSlash className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ── Get key CTA ── */}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-pitchpack-text-light hover:text-pitchpack-text transition-colors group w-fit"
          >
            <ArrowSquareOut className="w-3 h-3 group-hover:scale-110 transition-transform" />
            Get your free key from Google AI Studio
          </a>
        </div>

        {/* ── Footer actions ── */}
        <div className="px-5 pb-5 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            {hasKey && !inputValue ? "Done" : "Cancel"}
          </Button>
          <Button
            size="sm"
            disabled={!inputValue.trim()}
            onClick={handleSave}
            className="gap-1.5 min-w-[80px]"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Saved!
              </>
            ) : (
              "Save key"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
