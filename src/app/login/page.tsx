"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <PageHeader
          title="Welcome back"
          description="Sign in to sync your journal, mood check-ins, and saved conversations across devices."
        />

        <div className="bg-white border border-gray-100 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</span>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary-lavender"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</span>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary-lavender"
                  placeholder="Your password"
                  autoComplete="current-password"
                />
              </div>
            </label>
          </div>

          <button
            type="button"
            className="w-full bg-primary-lavender text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg shadow-primary-lavender/20 transition-all"
          >
            Sign in <ArrowRight size={18} />
          </button>

          <p className="text-center text-sm text-gray-500">
            New here?{" "}
            <Link href="/signup" className="font-bold text-primary-lavender hover:underline">
              Create an account
            </Link>
          </p>

          <p className="text-center text-sm text-gray-500">
            Prefer not to sign in?{" "}
            <Link href="/chat" className="font-bold text-gray-700 hover:text-primary-lavender hover:underline">
              Continue to chat
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
