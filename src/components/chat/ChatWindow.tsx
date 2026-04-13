"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { UIMessage } from "ai";
import { Send, Mic, Wind, Trash2, MicOff, AlertCircle, X } from "lucide-react";
import MessageBubble from "./MessageBubble";
import QuickReplyChips from "./QuickReplyChips";
import CrisisAlert from "./CrisisAlert";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { textFromUIMessage } from "@/lib/chat-message-text";
import { humanizeChatError } from "@/lib/chat-error";

const welcomeMessage = (): UIMessage => ({
  id: "welcome",
  role: "assistant",
  parts: [{ type: "text", text: "I'm here for you, always. Tell me anything that's on your mind today." }],
});

const clearedWelcome = (): UIMessage => ({
  id: "welcome",
  role: "assistant",
  parts: [{ type: "text", text: "Chat cleared. I'm ready to listen whenever you're ready." }],
});

export default function ChatWindow() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, setMessages, error, clearError } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat/stream" }),
    messages: [welcomeMessage()],
  });

  const isBusy = status === "submitted" || status === "streaming";

  const [showCrisis, setShowCrisis] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isBreatheMode, setIsBreatheMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }

    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.role === "user") {
      const text = textFromUIMessage(lastMsg).toLowerCase();
      const crisisWords = ["suicide", "hurt myself", "kill myself", "end it all"];
      if (crisisWords.some((word) => text.includes(word))) {
        setShowCrisis(true);
      }
    }
  }, [messages]);

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  const clearChat = () => {
    setMessages([clearedWelcome()]);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isBusy) return;
    setInput("");
    await sendMessage({ text: trimmed });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full min-h-[min(100%,280px)] h-full max-h-[calc(100dvh-4.75rem-env(safe-area-inset-bottom,0px))] sm:max-h-[calc(100dvh-6.25rem-env(safe-area-inset-bottom,0px))] md:max-h-[calc(100dvh-7rem-env(safe-area-inset-bottom,0px))] bg-white rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 relative group transition-all duration-500 hover:shadow-[0_48px_80px_-12px_rgba(0,0,0,0.15)]">
      {isBreatheMode && (
        <div className="absolute inset-0 z-[100] bg-primary-lavender flex items-center justify-center text-center p-4 sm:p-10 pb-safe animate-in fade-in zoom-in duration-500 overflow-y-auto overscroll-contain">
          <div className="space-y-8 sm:space-y-12 max-w-[min(100%,24rem)]">
            <div className="w-44 h-44 sm:w-64 sm:h-64 mx-auto bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-32 h-32 sm:w-48 sm:h-48 bg-white/30 rounded-full flex items-center justify-center animate-ping duration-[4000ms]">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full" />
              </div>
            </div>
            <div className="space-y-2 sm:space-y-4 px-2">
              <h2 className="text-white text-3xl sm:text-5xl font-black leading-tight">Breathe In...</h2>
              <p className="text-white/70 text-sm sm:text-xl font-medium uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                Hold for 4 seconds
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsBreatheMode(false)}
              className="w-full max-w-xs mx-auto bg-white text-primary-lavender px-8 sm:px-12 py-4 sm:py-5 rounded-full font-black text-base sm:text-lg hover:scale-105 transition-all"
            >
              I&apos;m feeling better
            </button>
          </div>
        </div>
      )}

      {showCrisis && <CrisisAlert onClose={() => setShowCrisis(false)} />}

      <div className="bg-white/80 backdrop-blur-md border-b border-gray-50 px-3 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 flex items-center justify-between gap-2 sm:gap-3 shrink-0 sticky top-0 z-20 min-w-0">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="relative shrink-0">
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-lavender to-primary-teal rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <span className="text-2xl sm:text-3xl leading-none">🌙</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 border-2 border-white rounded-full" />
          </div>
          <div className="min-w-0">
            <h2 className="font-extrabold text-base sm:text-xl tracking-tight text-foreground truncate">
              ThriveWell AI
            </h2>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest truncate">
                Always Listening • 100% Secure
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsBreatheMode(true)}
            className="p-2.5 sm:p-3 text-gray-400 hover:text-primary-teal hover:bg-primary-teal/5 rounded-xl sm:rounded-2xl transition-all touch-manipulation"
            title="Breathe Mode"
          >
            <Wind size={20} className="sm:w-[22px] sm:h-[22px]" />
          </button>
          <button
            type="button"
            onClick={clearChat}
            className="p-2.5 sm:p-3 text-gray-400 hover:text-accent-coral hover:bg-accent-coral/5 rounded-xl sm:rounded-2xl transition-all touch-manipulation"
            title="Clear Chat"
          >
            <Trash2 size={20} className="sm:w-[22px] sm:h-[22px]" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3 sm:p-6 md:p-10 space-y-4 sm:space-y-6 md:space-y-8 scroll-smooth bg-[#FDFBF7] relative overscroll-contain"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]" />

        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} content={textFromUIMessage(m)} />
        ))}

        {isBusy && (
          <div className="flex gap-2 p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl w-fit max-w-[90%] shadow-premium border border-gray-100 animate-in fade-in duration-300">
            <span className="w-2.5 h-2.5 bg-primary-lavender rounded-full animate-bounce" />
            <span className="w-2.5 h-2.5 bg-primary-lavender rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-2.5 h-2.5 bg-primary-lavender rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>

      <div className="p-3 sm:p-6 md:p-8 pb-safe bg-white/90 backdrop-blur-xl border-t border-gray-50 flex flex-col gap-3 sm:gap-6 shrink-0">
        {error && (
          <div
            role="alert"
            className="flex gap-2 sm:gap-3 items-start p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-accent-coral/30 bg-accent-coral/5 text-xs sm:text-sm text-gray-800"
          >
            <AlertCircle className="text-accent-coral shrink-0 mt-0.5" size={18} />
            <p className="flex-1 min-w-0 leading-relaxed break-words">{humanizeChatError(error)}</p>
            <button
              type="button"
              onClick={() => clearError()}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/80 shrink-0"
              aria-label="Dismiss"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <QuickReplyChips onSelect={(text) => void sendMessage({ text })} />

        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row sm:items-stretch gap-3 sm:gap-4 w-full min-w-0">
          <div className="flex-1 relative group min-w-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share what's on your mind..."
              className="w-full min-w-0 bg-gray-50 border-2 border-transparent focus:border-primary-lavender/20 focus:bg-white px-4 sm:px-8 py-3.5 sm:py-5 rounded-2xl sm:rounded-[2.5rem] text-base sm:text-lg font-medium shadow-inner transition-all outline-none pr-12 sm:pr-16 text-[16px] sm:text-lg"
            />
            <button
              type="button"
              onClick={toggleVoice}
              className={cn(
                "absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full transition-all touch-manipulation",
                isListening ? "bg-accent-coral text-white animate-pulse" : "text-gray-400 hover:text-primary-lavender"
              )}
            >
              {isListening ? <MicOff size={22} className="sm:w-6 sm:h-6" /> : <Mic size={22} className="sm:w-6 sm:h-6" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isBusy}
            className="bg-primary-lavender text-white w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 sm:p-6 rounded-2xl sm:rounded-[2rem] hover:scale-[1.02] sm:hover:scale-105 active:scale-95 transition-all shadow-glow-lavender disabled:grayscale disabled:opacity-50 group sm:self-auto shrink-0 touch-manipulation"
          >
            <Send size={22} className="sm:w-7 sm:h-7 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:group-hover:translate-x-1 sm:group-hover:-translate-y-1 transition-transform" />
            <span className="sm:hidden font-bold text-base">Send</span>
          </button>
        </form>

        <p className="text-center text-[9px] sm:text-[10px] text-gray-300 font-bold uppercase tracking-wider sm:tracking-widest px-2">
          Privacy Guaranteed • Safe Harbor
        </p>
      </div>
    </div>
  );
}
