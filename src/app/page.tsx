"use client";

import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { MessageSquare, Heart, Shield, ArrowRight, Quote, Star } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: <MessageSquare size={32} />,
    title: "Empathetic AI Chat",
    desc: "Available 24/7. No judgment, just pure empathy and scientific coping mechanisms.",
    color: "bg-primary-lavender",
  },
  {
    icon: <Heart size={32} />,
    title: "Expert Counselors",
    desc: "Connect with verified professionals who specialize in student mental health.",
    color: "bg-primary-teal",
  },
  {
    icon: <Shield size={32} />,
    title: "Crystal Privacy",
    desc: "Your data is encrypted. Choose to stay 100% anonymous throughout your journey.",
    color: "bg-accent-coral",
  },
];

const TESTIMONIALS = [
  {
    text: "ThriveWell AI felt like the only one listening during my finals. The AI bot is surprisingly human.",
    author: "Preeti, 21",
  },
  {
    text: "Finally, a platform that understands the pressure of being a student in this fast-paced world.",
    author: "Arjun, 19",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-grow">
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-28 lg:pb-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
            <div className="absolute top-10 right-0 w-96 h-96 bg-primary-lavender/5 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-10 left-0 w-96 h-96 bg-primary-teal/5 blur-[120px] rounded-full animate-pulse" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="flex h-2 w-2 rounded-full bg-primary-teal shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 text-left">
                Trusted by 5,000+ Students
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95] sm:leading-[0.9] text-foreground transition-all duration-1000">
              Your mind <br />
              <span className="text-primary-lavender italic serif">deserves to thrive.</span>
            </h1>
            <p className="max-w-xl mx-auto text-base sm:text-lg md:text-xl text-gray-500 mb-12 font-medium leading-relaxed px-1">
              Experience the world&apos;s most empathetic AI companion designed to understand, comfort, and guide you through
              life&apos;s toughest moments.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto">
              <Link href="/chat" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto bg-primary-lavender text-white px-8 sm:px-10 py-4 sm:py-5 rounded-[2rem] font-bold text-base sm:text-lg shadow-2xl shadow-primary-lavender/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  Start Talking Now <ArrowRight size={20} className="shrink-0" />
                </button>
              </Link>
              <Link href="/find-help" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto bg-white border-2 border-gray-100 px-8 sm:px-10 py-4 sm:py-5 rounded-[2rem] font-bold text-base sm:text-lg hover:border-primary-lavender/20 transition-all flex items-center justify-center gap-3"
                >
                  Find Support
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {FEATURES.map((feature, i) => (
              <div key={i} className="group space-y-5 text-center md:text-left">
                <div
                  className={`${feature.color} w-20 h-20 rounded-[2.5rem] flex items-center justify-center text-white shadow-xl transition-all group-hover:rotate-6 mx-auto md:mx-0`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium max-w-sm mx-auto md:mx-0">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-10 tracking-tight">Voices from our community</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-[2rem] p-8 sm:p-10 shadow-sm flex flex-col gap-4 h-full"
              >
                <div className="flex gap-1 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill="currentColor" className="shrink-0" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed font-medium flex-1">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-bold text-primary-lavender">{t.author}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary-lavender py-20 sm:py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
            <Quote className="text-white/20 mx-auto" size={64} />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight px-2">
              &ldquo;Recovery is not linear. It&apos;s a journey, and you don&apos;t have to walk it alone.&rdquo;
            </h2>
            <div className="h-1 w-20 bg-primary-teal mx-auto rounded-full" />
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32 blur-3xl" />
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center space-y-10 sm:space-y-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight">Ready to heal?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
            <Link href="/signup" className="block h-full">
              <div className="p-8 bg-white border-2 border-gray-100 rounded-[2.5rem] sm:rounded-[3rem] hover:border-primary-lavender/40 cursor-pointer transition-all space-y-4 shadow-sm h-full flex flex-col">
                <div className="p-3 bg-primary-lavender/10 text-primary-lavender rounded-2xl w-fit">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-foreground">For Individuals</h4>
                  <p className="text-sm text-gray-400 mt-1">I need support for myself.</p>
                </div>
              </div>
            </Link>
            <Link href="/signup/counselor" className="block h-full">
              <div className="p-8 bg-white border-2 border-gray-100 rounded-[2.5rem] sm:rounded-[3rem] hover:border-primary-teal/40 cursor-pointer transition-all space-y-4 shadow-sm h-full flex flex-col">
                <div className="p-3 bg-primary-teal/10 text-primary-teal rounded-2xl w-fit">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-foreground">For Professionals</h4>
                  <p className="text-sm text-gray-400 mt-1">I want to provide support.</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
