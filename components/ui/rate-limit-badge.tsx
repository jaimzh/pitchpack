"use client";

import * as React from "react";
import { Key } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface RateLimitBadgeProps {
  /** Whether a BYOK key is currently active */
  hasApiKey: boolean;
  /** Click handler — opens the BYOK modal */
  onClick: () => void;
  className?: string;
}

export function RateLimitBadge({
  hasApiKey,
  onClick,
  className,
}: RateLimitBadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={hasApiKey ? "API key active" : "Add your Gemini API Key"}
      className={cn(
        "group relative flex items-center gap-1.5 h-8 px-3 rounded-lg border transition-all duration-200",
        "border-pitchpack-border bg-pitchpack-card",
        "hover:border-pitchpack-border-hover",
        "hover:bg-pitchpack-card-subtle",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pitchpack-ring/50",
        "shadow-xs dark:shadow-none",
        className
      )}
    >
      <Key className="w-3.5 h-3.5 text-pitchpack-text-muted group-hover:text-pitchpack-text transition-colors" />
      <span className="text-xs font-medium text-pitchpack-text-muted">
        {hasApiKey ? "Key Active" : "Add API Key"}
      </span>
      {/* Small green dot when key is active */}
      {hasApiKey && (
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      )}
    </button>
  );
}
