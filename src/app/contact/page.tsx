"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <PageHeader
          title="Contact us"
          description="Questions about ThriveWell AI, partnerships, or accessibility—we read every message. This form is a UI demo until you connect it to email or a help desk."
        />

        {sent ? (
          <div className="bg-white border border-gray-100 rounded-[2rem] p-10 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-primary-teal/10 text-primary-teal rounded-full flex items-center justify-center mx-auto">
              <Send size={28} />
            </div>
            <h2 className="text-xl font-bold">Thanks for reaching out</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              In a live app, we would send you a confirmation email. For now, this is a visual preview only.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="text-primary-lavender font-bold text-sm hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            className="bg-white border border-gray-100 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-sm space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Your email</span>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  required
                  type="email"
                  className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary-lavender"
                  placeholder="you@example.com"
                />
              </div>
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</span>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
                <textarea
                  required
                  rows={5}
                  className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary-lavender resize-y min-h-[140px]"
                  placeholder="How can we help?"
                />
              </div>
            </label>
            <button
              type="submit"
              className="w-full bg-primary-lavender text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              Send message <Send size={18} />
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
