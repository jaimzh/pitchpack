"use client";

import * as React from "react";
import { KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface RateLimitBadgeProps {
  /** Generations used so far */
  usedCount: number;
  /** Total free-tier limit */
  freeLimit: number;
  /** Whether a BYOK key is currently active */
  hasApiKey: boolean;
  /** Click handler — opens the BYOK modal */
  onClick: () => void;
  className?: string;
}

/**
 * A compact clickable badge that shows a radial SVG arc indicating how much
 * of the free-tier rate limit has been consumed. Clicking it opens the BYOK
 * (Bring Your Own Key) dialog.
 */
export function RateLimitBadge({
  usedCount,
  freeLimit,
  hasApiKey,
  onClick,
  className,
}: RateLimitBadgeProps) {
  const pct = Math.min(usedCount / freeLimit, 1);
  const isAtLimit = usedCount >= freeLimit;

  // SVG radial arc params
  const size = 32;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Leave a small gap at the bottom (270° sweep)
  const arcLength = circumference * 0.78;
  const dashOffset = arcLength * (1 - pct);

  // Arc colour based on usage
  const arcColor = hasApiKey
    ? "#22c55e" // green — unlimited
    : isAtLimit
    ? "#ef4444" // red — exhausted
    : pct >= 0.75
    ? "#f59e0b" // amber — nearly done
    : "#3b82f6"; // blue — healthy

  // Label shown inside badge
  const label = hasApiKey ? "∞" : `${usedCount}/${freeLimit}`;

  return (
    <button
      type="button"
      onClick={onClick}
      title={
        hasApiKey
          ? "API key active — unlimited generations"
          : `${usedCount} of ${freeLimit} free generations used`
      }
      className={cn(
        "group relative flex items-center gap-1.5 h-8 px-2 rounded-lg border transition-all duration-200",
        "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80",
        "hover:border-zinc-400 dark:hover:border-zinc-600",
        "hover:bg-zinc-50 dark:hover:bg-zinc-800/80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-none",
        className
      )}
    >
      {/* Radial SVG indicator */}
      <div className="relative w-6 h-6 shrink-0">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="w-6 h-6 -rotate-[126deg]"
        >
          {/* Track ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            strokeLinecap="round"
            className="text-zinc-200 dark:text-zinc-700"
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={arcColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>

        {/* Centre icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <KeyRound
            className="w-2.5 h-2.5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors"
          />
        </div>
      </div>

      {/* Text label */}
      <span
        className={cn(
          "text-[10px] font-mono font-semibold leading-none tabular-nums select-none",
          isAtLimit && !hasApiKey
            ? "text-red-500"
            : "text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
        )}
      >
        {label}
      </span>

      {/* Pulsing dot when at limit and no key */}
      {isAtLimit && !hasApiKey && (
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
      )}

      {/* Small green dot when key is active */}
      {hasApiKey && (
        <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      )}
    </button>
  );
}
