"use client";

import { WarningCircle, Key } from "@phosphor-icons/react";

interface PitchPackErrorProps {
  error: string;
  onClear: () => void;
  onOpenApiKey?: () => void;
}

function isApiKeyError(error: string): boolean {
  const lower = error.toLowerCase();
  return (
    lower.includes("default credentials") ||
    lower.includes("api key") ||
    lower.includes("api_key") ||
    lower.includes("authentication") ||
    lower.includes("unauthenticated") ||
    lower.includes("permission denied") ||
    lower.includes("invalid key")
  );
}

export function PitchPackError({ error, onClear, onOpenApiKey }: PitchPackErrorProps) {
  const apiKeyMissing = isApiKeyError(error);

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
      <WarningCircle className="w-10 h-10 text-zinc-400" weight="light" />

      <div className="space-y-1">
        <p className="text-sm font-medium text-text">
          {apiKeyMissing ? "No API key found" : "Something went wrong"}
        </p>
        <p className="text-xs text-text-muted max-w-xs">
          {apiKeyMissing
            ? "Add your Google AI Studio key to start generating."
            : error}
        </p>
      </div>

      <div className="flex items-center gap-3 text-xs">
        {apiKeyMissing && onOpenApiKey ? (
          <button
            onClick={onOpenApiKey}
            className="flex items-center gap-1.5 text-text-muted hover:text-text underline underline-offset-2 decoration-zinc-400 transition-colors cursor-pointer"
          >
            <Key className="w-3.5 h-3.5" />
            Add API Key
          </button>
        ) : (
          <button
            onClick={onClear}
            className="text-text-muted hover:text-text underline underline-offset-2 decoration-zinc-400 transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
