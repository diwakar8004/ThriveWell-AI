"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { Check, X, MessageSquare, Clock, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const REQUESTS = [
  { id: "101", user: "Anonymous-42", age: "22", mood: "😭", topic: "Loneliness", time: "2m ago" },
  { id: "102", user: "Sara J.", age: "19", mood: "😔", topic: "Exam Anxiety", time: "5m ago" },
];

const ACTIVE_CHATS = [
  { id: "s1", user: "Rahul K.", lastMsg: "Thank you for listening...", time: "Active" },
];

export default function CounselorDashboard() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold">Counselor Portal</h1>
                <p className="text-gray-500">You're making a difference today, Dr. Aisha.</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
                <span className={cn("text-sm font-bold uppercase tracking-widest", isOnline ? "text-green-500" : "text-gray-400")}>
                    {isOnline ? "You are Online" : "You are Offline"}
                </span>
                <button 
                  onClick={() => setIsOnline(!isOnline)}
                  className={cn(
                    "relative w-14 h-8 rounded-full transition-all duration-300",
                    isOnline ? "bg-green-500" : "bg-gray-200"
                  )}
                >
                    <div className={cn(
                        "absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-sm",
                        isOnline ? "left-7" : "left-1"
                    )}></div>
                </button>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Incoming Requests */}
            <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-2">
                    <Zap size={20} className="text-primary-lavender" />
                    <h2 className="text-xl font-bold">Live Session Requests</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {REQUESTS.map(req => (
                        <div key={req.id} className="glass p-6 rounded-[2rem] border border-gray-100 space-y-4 hover:shadow-lg transition-all border-b-4 border-b-primary-lavender">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center">{req.mood}</div>
                                    <div>
                                        <h3 className="font-bold">{req.user}</h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">{req.age} years old</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-primary-lavender bg-primary-lavender/10 px-3 py-1 rounded-full uppercase">{req.time}</span>
                            </div>
                            
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-gray-400 uppercase">Primary Concern</p>
                                <p className="text-sm font-medium">{req.topic}</p>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button className="flex-1 bg-primary-lavender text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                                    <Check size={16} /> Accept
                                </button>
                                <button className="p-3 border rounded-xl text-gray-400 hover:text-red-400 hover:border-red-100 transition-all">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active & Sidebar */}
            <div className="lg:col-span-4 space-y-8">
                <section className="glass p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
                    <div className="flex items-center gap-2">
                        <MessageSquare size={20} className="text-primary-teal" />
                        <h2 className="text-xl font-bold">Active Chats</h2>
                    </div>
                    <div className="space-y-3">
                        {ACTIVE_CHATS.map(chat => (
                            <div key={chat.id} className="p-4 bg-gray-50 rounded-2xl border-l-4 border-l-primary-teal space-y-1 cursor-pointer hover:bg-white transition-all shadow-sm">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-sm">{chat.user}</h4>
                                    <span className="text-[10px] text-primary-teal font-black uppercase tracking-widest animate-pulse">{chat.time}</span>
                                </div>
                                <p className="text-xs text-gray-400 line-clamp-1 italic">"{chat.lastMsg}"</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-primary-teal/5 p-8 rounded-[2.5rem] space-y-4 border border-primary-teal/10">
                    <ShieldCheck size={32} className="text-primary-teal" />
                    <h3 className="font-bold text-lg">Privacy Reminder</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Never share personal details about users without explicit consent. 
                        Users are here because they feel vulnerable. Be their safe harbor.
                    </p>
                </section>
            </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
