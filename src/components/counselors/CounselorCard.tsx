import { User, MessageCircle, Calendar, Star } from "lucide-react";
import Link from "next/link";

interface CounselorCardProps {
  id: string;
  name: string;
  specialization: string;
  isOnline: boolean;
  avatarUrl?: string;
}

export default function CounselorCard({ id, name, specialization, isOnline, avatarUrl }: CounselorCardProps) {
  return (
    <div className="glass p-6 rounded-[2rem] hover:shadow-xl transition-all border border-gray-100 group">
      <div className="flex items-start justify-between mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 border">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <User size={32} />
              </div>
            )}
          </div>
          {isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-full">
            <Star size={12} fill="currentColor" />
            <span className="text-[10px] font-bold">4.9</span>
        </div>
      </div>

      <div className="space-y-1 mb-6">
        <h3 className="font-bold text-lg group-hover:text-primary-lavender transition-colors">{name}</h3>
        <p className="text-sm text-gray-500 font-medium">{specialization}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          href={`/session/${id}`}
          className="w-full bg-primary-teal text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all text-center"
        >
          <MessageCircle size={14} className="shrink-0" /> Chat Now
        </Link>
        <Link
          href={`/counselor/${id}`}
          className="w-full bg-white text-gray-600 border border-gray-200 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-center"
        >
          <Calendar size={14} className="shrink-0" /> Profile
        </Link>
      </div>
    </div>
  );
}
