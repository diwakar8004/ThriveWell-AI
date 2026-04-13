import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { getCounselorById } from "@/lib/counselors-sample";
import { MessageCircle, Calendar, Globe, Award, ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

export default async function CounselorProfilePage({ params }: Props) {
  const { id } = await params;
  const c = getCounselorById(id);
  if (!c) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href="/counselors"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-lavender transition-colors mb-8"
        >
          <ArrowLeft size={18} /> Back to counselors
        </Link>

        <div className="bg-white border border-gray-100 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-sm">
          <div className="p-6 sm:p-10 flex flex-col sm:flex-row gap-8 sm:gap-10">
            <div className="shrink-0 flex flex-col items-center sm:items-start">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[1.75rem] overflow-hidden bg-gray-100 border border-gray-100">
                {c.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : null}
              </div>
              {c.isOnline ? (
                <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-green-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Online now
                </span>
              ) : (
                <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Offline</span>
              )}
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{c.name}</h1>
                <p className="text-primary-lavender font-bold mt-1">{c.specialization}</p>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{c.bio}</p>

              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {c.sessionTypes.map((t) => (
                  <span key={t} className="text-[10px] font-bold uppercase tracking-wider bg-gray-50 px-3 py-1.5 rounded-full text-gray-600 border border-gray-100">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={`/session/${c.id}`}
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 bg-primary-teal text-white px-8 py-3.5 rounded-2xl font-bold text-sm hover:shadow-lg transition-all"
                >
                  <MessageCircle size={18} className="shrink-0" /> Book or start chat
                </Link>
                <Link
                  href="/chat"
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 bg-white border-2 border-gray-100 text-gray-700 px-8 py-3.5 rounded-2xl font-bold text-sm hover:border-primary-lavender/30 transition-all"
                >
                  Talk to ThriveWell AI first
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100 border-t border-gray-100">
            <div className="bg-[#FDFBF7] p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Award size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Credentials</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{c.credentials}</p>
            </div>
            <div className="bg-[#FDFBF7] p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Globe size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Languages</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{c.languages.join(" · ")}</p>
            </div>
          </div>
        </div>

        <p className="text-center sm:text-left text-xs text-gray-400 mt-8 flex items-center justify-center sm:justify-start gap-2">
          <Calendar size={14} /> Typical first response within one business day for booked sessions.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
