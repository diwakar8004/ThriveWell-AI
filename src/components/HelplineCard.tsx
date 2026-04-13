import { Phone, ExternalLink, ShieldCheck } from "lucide-react";

interface HelplineCardProps {
  name: string;
  number: string;
  country: string;
  description: string;
  isGlobal?: boolean;
}

function isDialablePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 3 && digits.length <= 15 && !value.toLowerCase().includes("text ");
}

export default function HelplineCard({ name, number, country, description, isGlobal }: HelplineCardProps) {
  const isUrl = number.startsWith("http");
  const canTel = !isUrl && isDialablePhone(number);
  const telHref = canTel ? `tel:${number.replace(/\D/g, "")}` : null;

  return (
    <div className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <span className="text-xl">{isGlobal ? "🌐" : "📍"}</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{country}</span>
        </div>
        <div className="text-primary-teal">
            <ShieldCheck size={20} />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-lg text-foreground leading-tight">{name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>

      <div className="pt-2">
        {isUrl ? (
            <a 
                href={number} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-primary-lavender/5 text-primary-lavender border border-primary-lavender/20 py-3 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-primary-lavender hover:text-white transition-all text-sm text-center"
            >
                Visit Crisis Portal <ExternalLink size={14} className="shrink-0" />
            </a>
        ) : telHref ? (
            <a 
                href={telHref} 
                className="w-full bg-accent-coral/5 text-accent-coral border border-accent-coral/20 py-3 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-accent-coral hover:text-white transition-all text-sm text-center"
            >
                <Phone size={14} fill="currentColor" className="shrink-0" /> <span className="break-all">{number}</span>
            </a>
        ) : (
            <div className="w-full bg-gray-50 text-foreground border border-gray-200 py-3 px-4 rounded-xl text-sm font-bold text-center leading-snug">
                {number}
            </div>
        )}
      </div>
    </div>
  );
}
