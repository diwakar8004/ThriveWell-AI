"use client";

import { useState } from "react";
import { ChevronRight, ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, title: "What's your first name?", type: "text", placeholder: "e.g. Diwakar" },
  { id: 2, title: "How old are you?", type: "options", options: ["Under 18", "18-24", "25-34", "35-44", "45+"] },
  { id: 3, title: "What brings you to ThriveWell?", type: "options", options: ["Stress & Anxiety", "Depression", "Relationship issues", "Personal Growth", "Just exploring"] },
];

export default function OnboardingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: "", age: "", reason: "" });

  const currentStep = STEPS[step];

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else onClose(); // Final step
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />
      
      <div className="relative w-full max-w-xl bg-[#FDFBF7] p-10 md:p-16 rounded-[4rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] space-y-10 animate-in fade-in zoom-in duration-500">
        
        {/* Progress */}
        <div className="flex gap-2">
            {STEPS.map((s, i) => (
                <div key={s.id} className={cn(
                    "h-1.5 flex-1 rounded-full transition-all duration-500",
                    i <= step ? "bg-primary-lavender" : "bg-gray-100"
                )} />
            ))}
        </div>

        <div className="space-y-12">
            <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tight leading-tight">{currentStep.title}</h2>
                <p className="text-gray-400 font-medium">This helps us tailor the experience for you.</p>
            </div>

            <div className="min-h-[200px]">
                {currentStep.type === "text" ? (
                    <input 
                        type="text" 
                        placeholder={currentStep.placeholder}
                        className="w-full bg-white border-2 border-transparent focus:border-primary-lavender p-6 rounded-3xl text-2xl font-bold shadow-sm outline-none transition-all"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        autoFocus
                    />
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {currentStep.options?.map(opt => (
                            <button
                                key={opt}
                                onClick={() => {
                                    if (step === 1) setData({ ...data, age: opt });
                                    else setData({ ...data, reason: opt });
                                    handleNext();
                                }}
                                className={cn(
                                    "p-6 text-left rounded-3xl font-bold text-lg border-2 transition-all flex justify-between items-center group",
                                    (step === 1 ? data.age === opt : data.reason === opt)
                                        ? "bg-primary-lavender text-white border-primary-lavender"
                                        : "bg-white border-transparent hover:border-primary-lavender/20"
                                )}
                            >
                                {opt}
                                <ChevronRight className="opacity-0 group-hover:opacity-100 transition-all" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between">
                <button 
                    onClick={handleBack}
                    className={cn(
                        "flex items-center gap-2 font-bold text-gray-400 hover:text-foreground transition-all",
                        step === 0 && "opacity-0 pointer-events-none"
                    )}
                >
                    <ArrowLeft size={20} /> Back
                </button>
                
                {currentStep.type === "text" && (
                    <button 
                        onClick={handleNext}
                        disabled={!data.name}
                        className="bg-primary-lavender text-white px-10 py-5 rounded-3xl font-bold flex items-center gap-2 hover:shadow-xl transition-all disabled:opacity-50"
                    >
                        Continue <ChevronRight size={20} />
                    </button>
                )}
            </div>
        </div>

        <div className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
            Privacy Guaranteed • 100% Anonymous
        </div>

      </div>
    </div>
  );
}
