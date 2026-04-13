"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { getCounselorById } from "@/lib/counselors-sample";
import { Calendar, Clock, Video, MessageSquare, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const SLOTS = ["Today · 4:00 PM", "Today · 6:30 PM", "Tomorrow · 10:00 AM", "Tomorrow · 2:00 PM"];

export default function SessionBookingPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const counselor = getCounselorById(id);
  const [step, setStep] = useState<"pick" | "confirm">("pick");
  const [slot, setSlot] = useState<string | null>(null);

  if (!counselor) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
        <Navbar />
        <main className="flex-1 max-w-lg mx-auto px-4 py-20 text-center space-y-4">
          <h1 className="text-2xl font-bold">Counselor not found</h1>
          <p className="text-gray-500">This link may be outdated.</p>
          <Link href="/counselors" className="text-primary-lavender font-bold hover:underline">
            Browse counselors
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href={`/counselor/${counselor.id}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-lavender transition-colors mb-8"
        >
          <ArrowLeft size={18} /> Back to profile
        </Link>

        {step === "confirm" ? (
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 sm:p-10 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-primary-teal/10 text-primary-teal rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">You&apos;re scheduled</h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                Demo only—connect this flow to your calendar or telehealth provider.{" "}
                <span className="font-semibold text-foreground">{counselor.name}</span> · {slot}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard"
                className="w-full py-3.5 rounded-2xl bg-primary-lavender text-white font-bold text-center hover:shadow-lg transition-all"
              >
                View dashboard
              </Link>
              <Link href="/counselors" className="w-full py-3.5 rounded-2xl border-2 border-gray-100 font-bold text-gray-600 text-center hover:border-primary-lavender/20 transition-all">
                Book another
              </Link>
            </div>
          </div>
        ) : (
          <>
            <header className="mb-8 text-center sm:text-left space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-teal">Session</p>
              <h1 className="text-2xl sm:text-3xl font-bold">Book with {counselor.name}</h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                Choose a time. Video and chat options depend on what this counselor offers.
              </p>
            </header>

            <div className="bg-white border border-gray-100 rounded-[2rem] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                  <Video size={16} className="text-primary-lavender" /> Video
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                  <MessageSquare size={16} className="text-primary-teal" /> Chat
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                  <Clock size={16} className="text-accent-coral" /> 45 min
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Available slots</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`rounded-2xl border-2 py-3.5 px-4 text-left text-sm font-bold transition-all ${
                        slot === s
                          ? "border-primary-lavender bg-primary-lavender/5 text-primary-lavender"
                          : "border-gray-100 hover:border-primary-lavender/30 text-gray-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={!slot}
                onClick={() => setStep("confirm")}
                className="w-full bg-primary-lavender text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirm session
              </button>
            </div>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
