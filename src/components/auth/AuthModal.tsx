"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { X, Mail, Globe, Shield, UserCircle } from "lucide-react";
import Link from "next/link";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const goEmail = () => {
    onClose();
    router.push(type === "login" ? "/login" : "/signup");
  };

  const goAnonymous = () => {
    onClose();
    router.push("/chat");
  };

  const modal = (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} aria-hidden />

      <div className="relative w-full max-w-lg max-h-[min(90dvh,720px)] overflow-y-auto overscroll-contain bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 z-10 p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-8 sm:p-12 sm:pt-14 space-y-8">
          <div className="text-center space-y-2 pr-8">
            <h2 id="auth-modal-title" className="text-2xl sm:text-3xl font-bold">
              {type === "login" ? "Welcome back" : "Start your journey"}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">Choose how you&apos;d like to continue with ThriveWell AI.</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <button
              type="button"
              disabled
              title="Coming soon"
              className="flex items-center gap-4 p-4 sm:p-5 bg-gray-50 rounded-2xl text-left border border-gray-100 opacity-60 cursor-not-allowed"
            >
              <div className="bg-white p-2 text-primary-lavender rounded-xl shadow-sm shrink-0">
                <Globe size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold">Continue with Google</p>
                <p className="text-xs text-gray-400">Available soon</p>
              </div>
            </button>

            <button
              type="button"
              onClick={goEmail}
              className="flex items-center gap-4 p-4 sm:p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all text-left border border-transparent hover:border-primary-lavender/10"
            >
              <div className="bg-white p-2 text-primary-teal rounded-xl shadow-sm shrink-0">
                <Mail size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold">Continue with email</p>
                <p className="text-xs text-gray-400">
                  {type === "login" ? "Sign in with email and password" : "Create an account with email"}
                </p>
              </div>
            </button>

            {type === "signup" && (
              <Link
                href="/signup/counselor"
                onClick={onClose}
                className="flex items-center gap-4 p-4 sm:p-5 bg-primary-lavender/5 rounded-2xl hover:bg-primary-lavender/10 transition-all text-left border border-primary-lavender/10"
              >
                <div className="bg-white p-2 text-primary-lavender rounded-xl shadow-sm shrink-0">
                  <Shield size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-primary-lavender">Join as a counselor</p>
                  <p className="text-xs text-primary-lavender/60">Share your expertise and help others</p>
                </div>
              </Link>
            )}

            <button
              type="button"
              onClick={goAnonymous}
              className="flex items-center gap-4 p-4 sm:p-5 bg-black text-white rounded-2xl hover:bg-black/90 transition-all text-left"
            >
              <div className="bg-white/10 p-2 text-white rounded-xl shrink-0">
                <UserCircle size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold">Continue anonymously</p>
                <p className="text-xs text-white/50">Chat without an account</p>
              </div>
            </button>
          </div>

          <div className="text-center text-xs text-gray-400 leading-relaxed">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-primary-lavender" onClick={onClose}>
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-primary-lavender" onClick={onClose}>
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
