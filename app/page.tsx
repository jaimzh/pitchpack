"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { Mail, User, BookOpen } from "lucide-react";
import { CreatorProfile } from "@/types";
import { INITIAL_CREATOR_PROFILE } from "@/constants/data";
import { CreatorProfileModal } from "@/components/creator-profile-modal";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profile, setProfile] = useState<CreatorProfile>(INITIAL_CREATOR_PROFILE);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-300 flex flex-col items-center justify-between font-sans selection:bg-text selection:text-white">
      {/* Header */}
      <header className="w-full max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-text-muted/10">
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
             
              size="sm"
              onClick={() => setIsProfileOpen(true)}
            >
              <User className="w-3.5 h-3.5 text-bg" />
              <span>Profile</span>
            </Button>

            <Button  size="sm">
              <BookOpen className="w-3.5 h-3.5 text-bg" />
              <span>Library</span>
            </Button>
          </div>

          <div className="w-px h-6 bg-border hidden sm:block"></div>

          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl flex-1 px-6 py-12 flex flex-col gap-16">
        {/* Hero Section */}
        <section className="flex flex-col gap-4 max-w-2xl"></section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl px-6 py-8 border-t border-text-muted/10 text-center text-xs text-text-muted">
        PitchPack Design System • Clean, robust code using modern CSS.
      </footer>

      {/* Creator Profile Modal */}
      <CreatorProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        setProfile={setProfile}
        darkMode={isDark}
      />
    </div>
  );
}

