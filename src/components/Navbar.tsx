"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Menu, X, Heart as HeartIcon } from "lucide-react";
import AuthModal from "./auth/AuthModal";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean, type: "login" | "signup" }>({ open: false, type: "login" });

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeAuthModal = useCallback(() => {
    setAuthModal((prev) => ({ ...prev, open: false }));
  }, []);

  const NAV_LINKS = [
    { name: "ThriveWell Bot", href: "/chat" },
    { name: "Counselors", href: "/counselors" },
    { name: "Find Help", href: "/find-help" },
    { name: "Journal", href: "/journal" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-[60] relative bg-white/70 backdrop-blur-md border-b border-[#E2E2E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
              <div className="bg-primary-lavender p-1.5 sm:p-2 rounded-lg sm:rounded-xl shrink-0 group-hover:rotate-12 transition-all">
                <HeartIcon className="text-white" size={20} fill="currentColor" />
              </div>
              <span className="text-base sm:text-2xl font-black tracking-tighter text-foreground uppercase truncate">
                THRIVEWELL<span className="text-primary-lavender">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
                <Link 
                    key={link.href}
                    href={link.href} 
                    className="text-[10px] font-black text-gray-400 hover:text-primary-lavender transition-all uppercase tracking-[0.2em]"
                >
                    {link.name}
                </Link>
            ))}
            <div className="h-6 w-[1px] bg-gray-200"></div>
            <button 
              onClick={() => setAuthModal({ open: true, type: "login" })}
              className="text-[10px] font-black text-foreground hover:text-primary-lavender transition-all uppercase tracking-[0.2em]"
            >
              Login
            </button>
            <button 
              onClick={() => setAuthModal({ open: true, type: "signup" })}
              className="bg-primary-lavender text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary-lavender/20 hover:scale-105 active:scale-95 transition-all text-xs"
            >
              Join Us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden shrink-0">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-foreground p-2 rounded-xl hover:bg-gray-50 touch-manipulation"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-16 sm:top-20 left-0 w-full max-h-[min(70dvh,calc(100dvh-4rem))] overflow-y-auto overscroll-contain bg-white border-b border-gray-100 p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-2xl animate-in slide-in-from-top-4 duration-300 pb-safe">
          <div className="grid grid-cols-1 gap-2 sm:gap-4">
              {NAV_LINKS.map(link => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="text-lg sm:text-xl font-bold py-3 px-2 border-b border-gray-50 touch-manipulation" 
                    onClick={toggleMenu}
                  >
                        {link.name}
                  </Link>
              ))}
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <button 
              onClick={() => { setAuthModal({ open: true, type: "login" }); toggleMenu(); }}
              className="w-full text-center py-4 font-bold border-2 border-gray-100 rounded-2xl"
            >
              Login
            </button>
            <button 
              onClick={() => { setAuthModal({ open: true, type: "signup" }); toggleMenu(); }}
              className="w-full text-center py-4 font-bold bg-primary-lavender text-white rounded-2xl shadow-lg shadow-primary-lavender/20"
            >
              Join Us
            </button>
          </div>
        </div>
      )}

      <AuthModal isOpen={authModal.open} onClose={closeAuthModal} type={authModal.type} />
    </nav>
  );
}
