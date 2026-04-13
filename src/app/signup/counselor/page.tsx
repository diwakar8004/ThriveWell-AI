"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import { Shield, Mail, Briefcase, GraduationCap, FileText, ArrowRight } from "lucide-react";

export default function CounselorSignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    license: "",
    specialization: "",
    bio: "",
  });

  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <PageHeader
          title="Join as a counselor"
          description="Share your expertise on ThriveWell AI. We review every application to keep the community safe and trustworthy."
        />

        <div className="bg-white border border-gray-100 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block space-y-2 sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Full name</span>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary-teal"
                  placeholder="As it appears on your license"
                />
              </div>
            </label>
            <label className="block space-y-2 sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Professional email</span>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary-teal"
                  placeholder="clinic@example.com"
                />
              </div>
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">License / ID</span>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={form.license}
                  onChange={(e) => set("license", e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary-teal"
                  placeholder="Registration number"
                />
              </div>
            </label>
            <label className="block space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Focus areas</span>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={form.specialization}
                  onChange={(e) => set("specialization", e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary-teal"
                  placeholder="e.g. Anxiety, grief"
                />
              </div>
            </label>
            <label className="block space-y-2 sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Short bio</span>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-4 text-gray-400" size={18} />
                <textarea
                  value={form.bio}
                  onChange={(e) => set("bio", e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-gray-200 pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:border-primary-teal resize-y min-h-[120px]"
                  placeholder="How you work, who you best support, and your therapeutic style."
                />
              </div>
            </label>
          </div>

          <button
            type="button"
            className="w-full bg-primary-teal text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
          >
            Submit application <ArrowRight size={18} />
          </button>

          <p className="text-xs text-center text-gray-400 leading-relaxed">
            This is a demo flow—wire this form to your backend when you are ready. Typical review takes 3–5 business days.
          </p>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Looking for support for yourself?{" "}
          <Link href="/signup" className="font-bold text-primary-lavender hover:underline">
            Sign up as an individual
          </Link>
          {" · "}
          <Link href="/login" className="font-bold text-gray-600 hover:underline">
            Counselor login
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
