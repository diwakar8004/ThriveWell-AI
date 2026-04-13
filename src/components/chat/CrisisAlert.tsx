import { AlertCircle, Phone, Heart, X } from "lucide-react";
import Link from "next/link";

export default function CrisisAlert({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-full bg-accent-coral/10 border-2 border-accent-coral rounded-3xl p-6 mb-8 animate-in zoom-in duration-500 relative">
      <button 
        onClick={onClose}
        className="absolute right-4 top-4 p-2 hover:bg-accent-coral/10 rounded-full text-accent-coral transition-all"
      >
        <X size={20} />
      </button>
      <div className="flex items-start gap-4">
        <div className="bg-accent-coral p-3 rounded-2xl text-white">
          <AlertCircle size={32} />
        </div>
        <div className="space-y-4 min-w-0 pr-10 sm:pr-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-accent-coral leading-snug">You are not alone, and help is available.</h3>
            <p className="text-gray-700 leading-relaxed mt-1">
              What you're feeling matters. We've noticed you might be in a lot of pain. 
              Please reach out to someone who can help you right now. 
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <div className="bg-white p-4 rounded-2xl border border-accent-coral/20 flex flex-col gap-1">
                <span className="text-xs font-bold text-gray-400 uppercase">Emergency Helpline (India)</span>
                <a href="tel:9152987821" className="text-lg font-bold flex items-center gap-2 hover:text-accent-coral">
                    <Phone size={18} /> 9152987821 (iCall)
                </a>
             </div>
             <div className="bg-white p-4 rounded-2xl border border-accent-coral/20 flex flex-col gap-1">
                <span className="text-xs font-bold text-gray-400 uppercase">Emergency Helpline (USA)</span>
                <a href="tel:988" className="text-lg font-bold flex items-center gap-2 hover:text-accent-coral">
                    <Phone size={18} /> 988 (Lifeline)
                </a>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/counselors" className="flex-1">
                <button className="w-full bg-accent-coral text-white px-6 py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-accent-coral/30 transition-all flex items-center justify-center gap-2">
                    <Heart size={20} fill="white" /> Talk to a Human Now
                </button>
            </Link>
            <Link href="/find-help" className="flex-1">
                <button className="w-full bg-white text-accent-coral border-2 border-accent-coral px-6 py-4 rounded-2xl font-bold text-lg hover:bg-accent-coral/5 transition-all">
                    All Local Resources
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
