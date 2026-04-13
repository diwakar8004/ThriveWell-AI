"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import HelplineCard from "@/components/HelplineCard";
import { MapPin, Search, Navigation } from "lucide-react";

const HELPLINES = [
  { name: "iCall", number: "9152987821", country: "India", description: "Professional psychosocial helpline by TISS." },
  { name: "Vandrevala Foundation", number: "1860-2662-345", country: "India", description: "24/7 mental health support." },
  { name: "AASRA", number: "9820466627", country: "India", description: "24/7 suicide prevention helpline." },
  { name: "988 Suicide & Crisis Lifeline", number: "988", country: "USA", description: "24/7, free and confidential support." },
  { name: "Crisis Text Line", number: "Text HOME to 741741", country: "USA", description: "Text support for any crisis." },
  { name: "Samaritans", number: "116 123", country: "UK", description: "Talk to us any time you like." },
  { name: "Mind Infoline", number: "0300 123 3393", country: "UK", description: "Information and support on mental health." },
  { name: "Crisis Centres (IASP)", number: "https://www.iasp.info/resources/Crisis_Centres/", country: "Global", description: "International directory of crisis centres.", isGlobal: true },
];

export default function FindHelpPage() {
  const [location, setLocation] = useState("");
  const [useGeo, setUseGeo] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-16">
        {/* Location Prompt */}
        <section className="bg-primary-lavender text-white rounded-[3rem] p-10 md:p-16 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold">Help is one call away</h1>
                    <p className="text-white/80 text-lg leading-relaxed">
                        Where are you located? We use this information only to show you the most relevant local helplines and professionals.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                    <div className="relative flex-1 min-w-0">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-lavender pointer-events-none" size={20} />
                        <input 
                            type="text" 
                            placeholder="Enter your city or country..." 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-white text-foreground rounded-2xl pl-12 pr-4 py-4 focus:outline-none shadow-sm"
                        />
                    </div>
                    <button 
                        onClick={() => setUseGeo(true)}
                        className="bg-primary-teal text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-md"
                    >
                        <Navigation size={18} /> Use Geolocation
                    </button>
                </div>
            </div>
            
            {/* Background pattern */}
            <div className="absolute right-[-5%] top-[-10%] w-[40%] h-[120%] bg-white/10 skew-x-12 blur-3xl pointer-events-none"></div>
        </section>

        {/* Helplines Grid */}
        <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="space-y-2 text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold">Emergency Helplines</h2>
                    <p className="text-gray-500">Pick up the phone. There is someone waiting to listen to you.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {HELPLINES.map((h, i) => (
                    <HelplineCard key={i} {...h} />
                ))}
            </div>
        </section>

        {/* Nearby Professionals (Placeholder for Google Places) */}
        <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="space-y-2 text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold">Therapists Near You</h2>
                    <p className="text-gray-500">Professional support in your local neighborhood.</p>
                </div>
            </div>

            <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                    <Search size={32} />
                </div>
                <div className="space-y-2">
                    <h3 className="font-bold text-xl">Find Local Support</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Once you provide your location, we'll suggest mental health professionals near you using Google Maps.
                    </p>
                </div>
                <button className="text-primary-lavender font-bold border-b-2 border-primary-lavender pb-1 hover:text-opacity-70 transition-all">
                    Search for mental health professionals
                </button>
            </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
