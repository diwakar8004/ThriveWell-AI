"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import { Heart, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <PageHeader
          title="Create your ThriveWell space"
          description="One account for the AI companion, journal, and mood tools. You can stay anonymous in chat whenever you prefer."
        />

        <div className="bg-white border border-gray-100 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Name or nickname</span>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary-lavender"
                  placeholder="How should we greet you?"
                  autoComplete="name"
                />
              </div>
            </label>
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
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                />
              </div>
            </label>
          </div>

          <button
            type="button"
            className="w-full bg-primary-lavender text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg shadow-primary-lavender/20 transition-all"
          >
            Continue <ArrowRight size={18} />
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary-lavender hover:underline">
              Log in
            </Link>
          </p>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest text-gray-400">
              <span className="bg-white px-3">or</span>
            </div>
          </div>

          <Link
            href="/chat"
            className="flex w-full items-center justify-center gap-2 py-4 rounded-2xl border-2 border-gray-100 font-bold text-gray-600 hover:border-primary-lavender/30 hover:text-primary-lavender transition-all"
          >
            <Heart size={18} className="text-primary-lavender" />
            Continue without an account
          </Link>

          <p className="text-xs text-center text-gray-400 leading-relaxed">
            By signing up you agree to our{" "}
            <Link href="/terms" className="underline hover:text-primary-lavender">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-primary-lavender">
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Are you a mental health professional?{" "}
          <Link href="/signup/counselor" className="font-bold text-primary-teal hover:underline">
            Join as a counselor
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
