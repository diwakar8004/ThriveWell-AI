"use client";

import { createContext, useContext, useState, useEffect } from "react";
import OnboardingModal from "./OnboardingModal";

interface AuthContextType {
  user: any | null;
  onboarded: boolean;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [onboarded, setOnboarded] = useState(true); // Default to true for now
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check local storage for onboarding status
    const isNew = localStorage.getItem("thrivewell_onboarded") === null;
    if (isNew) {
      setShowOnboarding(true);
    }
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("thrivewell_onboarded", "true");
    setShowOnboarding(false);
    setOnboarded(true);
  };

  return (
    <AuthContext.Provider value={{ user, onboarded, completeOnboarding }}>
      {children}
      {showOnboarding && <OnboardingModal onClose={completeOnboarding} />}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
