"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import MoodTracker from "@/components/dashboard/MoodTracker";
import { Calendar, Book, ArrowUpRight, MessageSquare, AlertTriangle } from "lucide-react";
import Link from "next/link";

// Recharts doesn't handle SSR well, so we load it dynamically
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false });
const LineChart = dynamic(() => import("recharts").then((mod) => mod.LineChart), { ssr: false });
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then((mod) => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false });

const MOOD_DATA = [
  { date: "Apr 01", score: 8 },
  { date: "Apr 02", score: 6 },
  { date: "Apr 03", score: 4 },
  { date: "Apr 04", score: 3 },
  { date: "Apr 05", score: 5 },
  { date: "Apr 06", score: 7 },
  { date: "Apr 07", score: 8 },
  { date: "Apr 08", score: 4 },
  { date: "Apr 09", score: 2 },
  { date: "Apr 10", score: 3 },
];

const RECENT_JOURNALS = [
  { id: "1", title: "Midnight Reflections", date: "Today", preview: "Sometimes the silence is louder than the noise..." },
  { id: "2", title: "A better day", date: "Yesterday", preview: "I managed to finish my assignment without panicking." },
];

export default function DashboardPage() {
  const latestMood = MOOD_DATA[MOOD_DATA.length - 1].score;
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    // Ensure chart renders after component mounts
    setChartReady(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold">Welcome back, Diwakar</h1>
                <p className="text-gray-500">Your wellness journey is looking steady. How's your heart today?</p>
            </div>
            <div className="flex gap-3">
                <button className="bg-white border p-3 rounded-2xl shadow-sm hover:bg-gray-50 transition-all">
                    <Calendar size={20} className="text-gray-500" />
                </button>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Mood Tracking */}
            <div className="lg:col-span-2 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="glass p-6 rounded-[2rem] border border-gray-100 flex flex-col justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Mood</span>
                        <div className="flex items-end justify-between mt-4">
                            <span className="text-4xl font-bold">{latestMood < 4 ? 'Low' : latestMood < 7 ? 'Stable' : 'Good'}</span>
                            <span className="text-3xl">
                                {latestMood < 4 ? '😔' : latestMood < 7 ? '😐' : '😊'}
                            </span>
                        </div>
                    </div>
                    <div className="glass p-6 rounded-[2rem] border border-gray-100 flex flex-col justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Journal Streak</span>
                        <div className="flex items-end justify-between mt-4">
                            <span className="text-4xl font-bold">5 Days</span>
                            <span className="text-primary-lavender bg-primary-lavender/10 p-2 rounded-xl">
                                <ArrowUpRight size={20} />
                            </span>
                        </div>
                    </div>
                    <div className="glass p-6 rounded-[2rem] border border-gray-100 flex flex-col justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Next Session</span>
                        <div className="flex items-end justify-between mt-4">
                            <span className="text-lg font-bold">None Appointed</span>
                            <Link href="/counselors" className="text-xs font-bold text-primary-teal underline">Book Now</Link>
                        </div>
                    </div>
                </div>

                {/* Mood Chart */}
                <div className="glass p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xl">Emotional History</h3>
                        <select className="bg-transparent border-none text-sm font-bold text-gray-400 outline-none">
                            <option>Last 10 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    
                    <div className="h-[300px] w-full mt-4 relative" style={{ minHeight: '200px', minWidth: '300px' }}>
                        {chartReady ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={MOOD_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E2E0" />
                                    <XAxis 
                                        dataKey="date" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fontSize: 12, fill: '#94a3b8' }} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        domain={[0, 10]} 
                                        hide 
                                    />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="score" 
                                        stroke="#7C69EF" 
                                        strokeWidth={4} 
                                        dot={{ r: 6, fill: '#7C69EF', strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-gray-400">Loading chart...</div>
                            </div>
                        )}
                    </div>

                    {latestMood < 4 && (
                        <div className="bg-accent-coral/5 border border-accent-coral/20 p-4 rounded-2xl flex items-center gap-4">
                            <div className="bg-accent-coral p-2 rounded-xl text-white">
                                <AlertTriangle size={20} />
                            </div>
                            <p className="text-sm text-gray-700">
                                We've noticed you've been having a tough time. <Link href="/chat" className="font-bold text-accent-coral underline">Want to talk to someone?</Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Mood Tracker & Quick Actions */}
            <div className="space-y-8">
                <MoodTracker />

                <div className="glass p-8 rounded-[2.5rem] border border-gray-100 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xl">Recent Journals</h3>
                        <Link href="/journal" className="text-primary-lavender">
                            <ArrowUpRight size={20} />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {RECENT_JOURNALS.map(j => (
                            <div key={j.id} className="p-4 bg-gray-50 rounded-2xl space-y-2 border border-transparent hover:border-primary-lavender/20 transition-all cursor-pointer">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-sm">{j.title}</h4>
                                    <span className="text-[10px] uppercase font-bold text-gray-400">{j.date}</span>
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-1">{j.preview}</p>
                            </div>
                        ))}
                    </div>
                    <Link href="/journal">
                        <button className="w-full bg-white border-2 border-primary-lavender/20 text-primary-lavender py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mt-4">
                            <Book size={18} /> New Entry
                        </button>
                    </Link>
                </div>
            </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
