"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Heart, Smile, Check } from "lucide-react";

interface MessageBubbleProps {
  content: string;
  role: string | "user" | "assistant" | "system";
  isCrisis?: boolean;
}

export default function MessageBubble({ content, role, isCrisis }: MessageBubbleProps) {
  const [reaction, setReaction] = useState<string | null>(null);
  const isBot = role === "assistant" || role === "bot";
  const isSystem = role === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center my-6">
        <span className="text-[10px] font-black px-6 py-2 bg-gray-100 text-gray-400 rounded-full uppercase tracking-[0.2em] border border-gray-50">
          {content}
        </span>
      </div>
    );
  }

  return (
    <div className={cn(
        "flex w-full mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500", 
        isBot ? "justify-start" : "justify-end"
    )}>
      <div
        className={cn(
          "group flex flex-col gap-2 max-w-[min(92vw,42rem)] sm:max-w-[75%]",
          isBot ? "items-start" : "items-end"
        )}
      >
        
        <div
          className={cn(
            "relative px-5 sm:px-7 py-4 sm:py-5 rounded-[1.75rem] sm:rounded-[2.5rem] text-base sm:text-lg leading-relaxed shadow-premium transition-all hover:shadow-lg",
            isBot 
              ? "bg-white border text-foreground rounded-tl-none border-gray-100 font-medium" 
              : "bg-primary-lavender text-white rounded-tr-none font-bold",
            isCrisis && "border-4 border-accent-coral bg-accent-coral/5",
            reaction && "ring-2 ring-primary-teal/20"
          )}
        >
          {isBot && (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-primary-teal animate-pulse" />
              <span className="text-[10px] font-black text-primary-teal uppercase tracking-widest">ThriveWell</span>
            </div>
          )}
          
          <span className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{content}</span>

          {/* User Reactions for Bot messages */}
          {isBot && !isSystem && (
              <div className="absolute -bottom-4 right-6 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  <button 
                    onClick={() => setReaction(reaction === "heart" ? null : "heart")}
                    className={cn(
                        "p-2 rounded-full border shadow-sm transition-all hover:scale-110 active:scale-95",
                        reaction === "heart" ? "bg-accent-coral text-white border-accent-coral" : "bg-white text-gray-400 hover:text-accent-coral"
                    )}
                  >
                      <Heart size={14} fill={reaction === "heart" ? "currentColor" : "none"} />
                  </button>
                  <button 
                    onClick={() => setReaction(reaction === "smile" ? null : "smile")}
                    className={cn(
                        "p-2 rounded-full border shadow-sm transition-all hover:scale-110 active:scale-95",
                        reaction === "smile" ? "bg-primary-teal text-white border-primary-teal" : "bg-white text-gray-400 hover:text-primary-teal"
                    )}
                  >
                      <Smile size={14} />
                  </button>
              </div>
          )}

          {/* Individual Message Status */}
          {!isBot && (
              <div className="flex justify-end mt-2 opacity-50">
                  <Check size={12} className="text-white" />
              </div>
          )}
        </div>

        {/* Reaction badge */}
        {reaction && (
            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100 animate-in pop-in">
                {reaction === "heart" && <Heart size={10} className="text-accent-coral fill-accent-coral" />}
                {reaction === "smile" && <Smile size={10} className="text-primary-teal" />}
                <span className="text-[10px] font-bold text-gray-400 italic">Helpful</span>
            </div>
        )}

      </div>
    </div>
  );
}
