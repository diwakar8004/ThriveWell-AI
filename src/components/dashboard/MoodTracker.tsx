"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const MOODS = [
  { score: 2, emoji: "😭", label: "Devastated", color: "bg-red-100 text-red-600" },
  { score: 4, emoji: "😔", label: "Sad", color: "bg-orange-100 text-orange-600" },
  { score: 6, emoji: "😐", label: "Neutral", color: "bg-yellow-100 text-yellow-600" },
  { score: 8, emoji: "🙂", label: "Good", color: "bg-primary-teal/10 text-primary-teal" },
  { score: 10, emoji: "😊", label: "Great", color: "bg-primary-lavender/10 text-primary-lavender" },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedMood === null) return;
    setSubmitted(true);
    // Real API call would go here
  };

  if (submitted) {
    return (
      <div className="glass p-8 rounded-[2.5rem] border border-gray-100 text-center space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <Check size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-xl">Mood Saved!</h3>
          <p className="text-gray-500">Your emotional journey matters. Keep reflecting.</p>
        </div>
        <button 
          onClick={() => { setSubmitted(false); setSelectedMood(null); setNote(""); }}
          className="text-primary-lavender font-bold text-sm hover:underline"
        >
          Update again
        </button>
      </div>
    );
  }

  return (
    <div className="glass p-8 rounded-[2.5rem] border border-gray-100 space-y-8 shadow-sm">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-bold">How are you feeling?</h2>
        <p className="text-gray-500">Take a moment to check in with yourself.</p>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-between items-stretch gap-4 sm:gap-2 px-0 sm:px-2">
        {MOODS.map((mood) => (
          <button
            key={mood.score}
            onClick={() => setSelectedMood(mood.score)}
            className="group flex flex-col items-center gap-2 sm:gap-3 transition-all w-[calc(33.333%-0.75rem)] sm:w-auto min-w-[4.5rem]"
          >
            <div className={cn(
              "w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-all relative",
              selectedMood === mood.score 
                ? `${mood.color} ring-2 ring-offset-2 ring-primary-lavender/30` 
                : "bg-gray-50 text-gray-400 grayscale hover:grayscale-0 hover:bg-gray-100"
            )}>
              {mood.emoji}
              {selectedMood === mood.score && (
                <div className="absolute -top-1 -right-1 bg-white rounded-full shadow-sm text-green-500">
                    <Check size={16} strokeWidth={3} />
                </div>
              )}
            </div>
            <span className={cn(
              "text-xs font-bold uppercase tracking-widest",
              selectedMood === mood.score ? mood.color.split(' ')[1] : "text-gray-400"
            )}>
              {mood.label}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">What's one word for today?</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Grateful, Exhausted, Hopeful..."
            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-primary-lavender transition-all outline-none shadow-inner"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={selectedMood === null}
          className="w-full bg-primary-lavender text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
        >
          Check In
        </button>
      </div>
    </div>
  );
}
