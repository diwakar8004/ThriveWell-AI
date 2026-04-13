"use client";

import { cn } from "@/lib/utils";

const QUICK_REPLIES = [
  "I'm feeling overwhelmed",
  "Just need someone to listen",
  "How can I manage exam stress?",
  "I feel lonely today",
  "Tell me a calming story"
];

export default function QuickReplyChips({ onSelect }: { onSelect: (text: string) => void }) {
  return (
    <div className="flex gap-2 py-2 sm:py-4 -mx-1 px-1 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory touch-pan-x">
      {QUICK_REPLIES.map((text, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(text)}
          className={cn(
            "flex-shrink-0 snap-start px-4 sm:px-6 py-2.5 sm:py-3 bg-white border border-gray-100 rounded-2xl sm:rounded-[2rem] text-xs sm:text-sm font-bold text-gray-500 touch-manipulation",
            "hover:border-primary-lavender/30 hover:bg-primary-lavender/[0.02] hover:text-primary-lavender",
            "transition-all duration-300 shadow-sm active:scale-95"
          )}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
