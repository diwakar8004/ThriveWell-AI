"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { Plus, Book, Calendar, Search, Trash2, Edit3 } from "lucide-react";

// ReactQuill needs to be loaded client-side only
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css"; // Using bubble theme for a cleaner look

const SAMPLE_ENTRIES = [
  { id: "1", title: "Late Night Thoughts", content: "<p>The sky was unexpectedly clear tonight. I felt a sense of peace that I haven't felt in weeks...</p>", date: "Today", mood: "😊" },
  { id: "2", title: "Exam Stress", content: "<p>I'm feeling really anxious about the finals. Every time I open my books, my heart starts racing.</p>", date: "Yesterday", mood: "😔" },
];

export default function JournalPage() {
  const [entries, setEntries] = useState(SAMPLE_ENTRIES);
  const [isAdding, setIsAdding] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({ title: "", content: "", mood: "😐" });

  const handleSave = () => {
    if (!currentEntry.title || !currentEntry.content) return;
    setEntries([
      { id: Date.now().toString(), ...currentEntry, date: "Today" },
      ...entries
    ]);
    setIsAdding(false);
    setCurrentEntry({ title: "", content: "", mood: "😐" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Sidebar: Entries List */}
            <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-bold shrink-0">Your Journal</h2>
                    <div className="relative w-full sm:max-w-[200px]">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:outline-none focus:border-primary-lavender/40"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="w-full bg-primary-lavender text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                    >
                        <Plus size={20} /> New Entry
                    </button>

                    {entries.map(entry => (
                        <div key={entry.id} className="glass p-5 rounded-[2rem] border border-gray-100 space-y-3 cursor-pointer hover:border-primary-lavender/30 transition-all group">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{entry.date}</span>
                                <span className="text-xl">{entry.mood}</span>
                            </div>
                            <h3 className="font-bold group-hover:text-primary-lavender transition-colors">{entry.title}</h3>
                            <div className="text-xs text-gray-500 line-clamp-2" dangerouslySetInnerHTML={{ __html: entry.content }} />
                            <div className="flex justify-end gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-all">
                                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><Edit3 size={14} /></button>
                                <button className="p-2 hover:bg-red-50 rounded-lg text-red-300"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content: Editor */}
            <div className="lg:col-span-8 order-1 lg:order-2">
                {isAdding ? (
                    <div className="glass p-8 md:p-12 rounded-[3rem] border border-gray-100 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 min-h-[600px] flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1">
                                <input 
                                    type="text" 
                                    placeholder="Give your entry a title..."
                                    className="w-full text-3xl font-bold bg-transparent outline-none placeholder:text-gray-200"
                                    value={currentEntry.title}
                                    onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                                />
                                <p className="text-sm text-gray-400 mt-1 uppercase font-bold tracking-widest">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl self-start">
                                {["😭", "😔", "😐", "🙂", "😊"].map(m => (
                                    <button 
                                        key={m}
                                        onClick={() => setCurrentEntry({...currentEntry, mood: m})}
                                        className={`w-10 h-10 flex items-center justify-center rounded-xl text-xl transition-all ${currentEntry.mood === m ? 'bg-white shadow-sm ring-2 ring-primary-lavender/20' : 'opacity-40 hover:opacity-100'}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-hidden editor-container">
                            <ReactQuill 
                                theme="bubble"
                                value={currentEntry.content}
                                onChange={(content) => setCurrentEntry({...currentEntry, content})}
                                placeholder="Start writing from your heart..."
                                className="h-full text-lg leading-relaxed"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t">
                            <button 
                                onClick={() => setIsAdding(false)}
                                className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-gray-600"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave}
                                className="bg-primary-lavender text-white px-10 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                            >
                                Save Entry
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-24 h-24 bg-primary-lavender/10 rounded-full flex items-center justify-center text-primary-lavender">
                            <Book size={48} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">Select an entry or write something new</h2>
                            <p className="text-gray-500 max-w-sm">Every word you write is a step towards understanding yourself better.</p>
                        </div>
                        <button 
                            onClick={() => setIsAdding(true)}
                            className="bg-primary-lavender text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary-lavender/20 hover:scale-105 transition-all"
                        >
                            Write Today's Story
                        </button>
                    </div>
                )}
            </div>

        </div>
      </main>

      <SiteFooter />
      <style jsx global>{`
        .editor-container .ql-editor {
            min-height: 300px;
            padding: 0;
            font-size: 1.125rem;
            line-height: 1.75;
        }
        .editor-container .ql-editor.ql-blank::before {
            left: 0;
            color: #E2E2E0;
            font-style: normal;
        }
      `}</style>
    </div>
  );
}
