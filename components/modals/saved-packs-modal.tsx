"use client";

import React from "react";
import { BookOpen, X, Trash2, ArrowRight } from "lucide-react";
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
  darkMode: boolean;
}

export function SavedPacksModal({
  isOpen,
  onClose,
  savedPacks,
  onLoadPack,
  onDeletePack,
  darkMode,
}: SavedPacksModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition-colors duration-300 ${
          darkMode
            ? "bg-[#161616] border-[#292929] text-zinc-200"
            : "bg-[#FCFCFC] border-[#E4E4E3] text-zinc-800"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-dashed border-[#292929] dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 dark:bg-zinc-800 flex items-center justify-center text-primary dark:text-zinc-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">Saved Campaigns</h3>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content list */}
        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          {savedPacks.length === 0 ? (
            <div className="text-center py-10">
              <BookOpen className="w-8 h-8 mx-auto text-zinc-400 dark:text-zinc-600 mb-2" />
              <p className="text-xs text-zinc-500 italic">No saved campaigns in vault yet.</p>
            </div>
          ) : (
            savedPacks.map((pack) => (
              <div
                key={pack.id}
                onClick={() => {
                  onLoadPack(pack);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer group hover:scale-[1.01] ${
                  darkMode
                    ? "bg-[#1A1A1A] border-[#292929] hover:bg-[#202020] hover:border-[#353535]"
                    : "bg-[#FBFBFA] border-[#DFDFDE] hover:bg-white hover:border-zinc-350 shadow-xs"
                }`}
              >
                <div className="flex-1 min-w-0 pr-4">
                  <h4 className="text-xs font-bold truncate text-zinc-900 dark:text-zinc-100">
                    {pack.brandName}
                  </h4>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                    Generated on {pack.date}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => onDeletePack(pack.id, e)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 dark:hover:bg-red-950/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Delete Campaign"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="p-1.5 rounded-lg text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-zinc-50 group-hover:translate-x-0.5 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 mt-4 border-t border-dashed border-[#292929] dark:border-zinc-800">
          <Button onClick={onClose} size="sm" className="font-bold tracking-tight">
            Close Vault
          </Button>
        </div>
      </div>
    </div>
  );
}
