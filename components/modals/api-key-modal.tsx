"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { ExternalLink, Check, Trash2, Eye, EyeOff, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStoredApiKey, setStoredApiKey, clearStoredApiKey } from "@/lib/api-key-store";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Current usage count (number of generations used) */
  usedCount: number;
  /** Total allowed generations on the free tier */
  freeLimit: number;
  /** Called when a key is saved or cleared */
  onApiKeyChange?: (key: string | null) => void;
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ApiKeyModal({
  open,
  onOpenChange,
  usedCount,
  freeLimit,
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

  const usagePct = Math.min((usedCount / freeLimit) * 100, 100);
  const isAtLimit = usedCount >= freeLimit;
  const hasKey = Boolean(existingKey);

  // Usage bar colour: green → amber → red
  const barColor =
    usagePct >= 90
      ? "bg-red-500"
      : usagePct >= 60
      ? "bg-amber-400"
      : "bg-emerald-500";

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
        className="sm:max-w-md gap-0 p-0 overflow-hidden border-zinc-200 dark:border-zinc-800"
      >
        {/* ── Header ── */}
        <div className="px-5 pt-5 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <DialogHeader className="gap-1">
            <DialogTitle className="text-[15px] font-semibold leading-tight">
              Bring your own key
            </DialogTitle>
            <DialogDescription className="text-xs leading-relaxed">
              Add your API key — I&apos;m too broke to handle your AI requests forever 😅
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* ── Rate-limit usage block ── */}
        <div className="px-5 py-4 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
              <Zap className="w-3 h-3" />
              Free tier usage
            </span>
            <span
              className={`text-xs font-bold tabular-nums ${
                isAtLimit
                  ? "text-red-500"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {usedCount} / {freeLimit}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${barColor}`}
              style={{ width: `${usagePct}%` }}
            />
          </div>

          {isAtLimit && !hasKey && (
            <p className="mt-2 text-[11px] text-red-500 font-medium">
              ⚡ Limit reached — add your API key to keep generating.
            </p>
          )}
          {!isAtLimit && (
            <p className="mt-2 text-[11px] text-zinc-400 dark:text-zinc-500">
              {freeLimit - usedCount} generation{freeLimit - usedCount !== 1 ? "s" : ""} remaining on the free tier
            </p>
          )}
        </div>

        {/* ── Key input / status section ── */}
        <div className="px-5 py-4 flex flex-col gap-3">
          {hasKey ? (
            /* Show masked key + remove button when key is already saved */
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                Active key
              </label>
              <div className="flex items-center gap-2 h-9 px-3 rounded-lg border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/30">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300 flex-1 truncate">
                  {maskKey(existingKey!)}
                </span>
                <button
                  onClick={handleClear}
                  title="Remove key"
                  className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-950/40 text-zinc-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Your key is active — unlimited generations unlocked.
              </p>

              {/* Allow replacing the key */}
              <div className="mt-1 flex flex-col gap-2">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
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
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* No key yet — show input to add one */
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
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
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

          {/* ── Get key CTA ── */}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors group w-fit"
          >
            <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform" />
            Get your key from Google AI Studio
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
