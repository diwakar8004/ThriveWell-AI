import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import CounselorCard from "@/components/counselors/CounselorCard";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { SAMPLE_COUNSELORS } from "@/lib/counselors-sample";

export default function CounselorsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-2xl">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Connect with Support</h1>
                <p className="text-gray-500 leading-relaxed">
                    Our verified counselors are here to walk with you through your darkest moments. Choose someone you feel comfortable with.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:min-w-[280px]">
                <div className="relative flex-1 min-w-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search specialization..." 
                        className="w-full bg-white border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary-lavender"
                    />
                </div>
                <button type="button" className="shrink-0 bg-white border border-gray-200 p-3 rounded-2xl text-gray-600 hover:bg-gray-50 flex items-center justify-center" aria-label="Filter counselors">
                    <Filter size={18} />
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SAMPLE_COUNSELORS.map((c) => (
                <CounselorCard key={c.id} id={c.id} name={c.name} specialization={c.specialization} isOnline={c.isOnline} avatarUrl={c.avatarUrl} />
            ))}
        </div>

        <section className="mt-16 sm:mt-20 bg-primary-lavender/5 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-primary-lavender text-white rounded-2xl flex items-center justify-center mx-auto text-3xl font-bold">?</div>
            <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold">Not sure who to pick?</h2>
                <p className="text-gray-500 max-w-lg mx-auto leading-relaxed px-2">
                    Our AI companion can help match you with the right counselor based on what you&apos;re currently facing.
                </p>
            </div>
            <Link href="/chat">
              <button type="button" className="bg-primary-lavender text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all">
                Let ThriveWell AI Match Me
              </button>
            </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
