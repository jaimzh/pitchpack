"use client";

import React, { useEffect } from "react";
import { BookmarksIcon, X, Trash, ArrowRight } from "@phosphor-icons/react";
import { OutreachPackResponse } from "@/types";
import { Button } from "@/components/ui/button";

export interface SavedPack {
  id: string;
  brandName: string;
  date: string;
  data: OutreachPackResponse;
}

interface SavedPacksModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPacks: SavedPack[];
  onLoadPack: (pack: SavedPack) => void;
  onDeletePack: (id: string, e: React.MouseEvent) => void;
}

export function SavedPacksModal({
  isOpen,
  onClose,
  savedPacks,
  onLoadPack,
  onDeletePack,
}: SavedPacksModalProps) {
  useEffect(() => {
  if (!isOpen) return;

  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = originalOverflow;
  };
}, [isOpen]);

if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border border-pitchpack-border bg-pitchpack-bg p-6 shadow-2xl text-pitchpack-text transition-all duration-300" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-dashed border-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center text-primary">
              <BookmarksIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">Recent Campaigns</h3>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content list */}
        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          {savedPacks.length === 0 ? (
            <div className="text-center py-10">
              <BookmarksIcon className="w-8 h-8 mx-auto text-text-muted mb-2" />
              <p className="text-xs text-text-muted italic">No saved campaigns in vault yet.</p>
            </div>
          ) : (
            savedPacks.map((pack) => (
              <div
                key={pack.id}
                onClick={() => {
                  onLoadPack(pack);
                  onClose();
                }}
                className="p-3.5 rounded-xl border border-border bg-bg-lightest hover:bg-bg-lightest/70 flex items-center justify-between transition-all cursor-pointer group hover:scale-[1.01]"
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-xs font-bold truncate text-text">
                    {pack.brandName}
                  </h4>
                  <span className="text-[10px] text-text-muted font-mono">
                    Generated on {pack.date}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => onDeletePack(pack.id, e)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Delete Campaign"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                  <div className="p-1.5 rounded-lg text-text-muted group-hover:text-text group-hover:translate-x-0.5 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 mt-4 border-t border-dashed border-border">
          <Button onClick={onClose} size="sm" className="font-bold tracking-tight">
            Close Vault
          </Button>
        </div>
      </div>
    </div>
  );
}
