import Link from "next/link";
import { Heart } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Heart className="text-primary-lavender fill-primary-lavender" size={24} />
          <span className="font-black text-xl tracking-tighter">THRIVEWELL AI</span>
        </div>
        <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
          ThriveWell AI is not an emergency service. If you are in crisis, please call your local emergency number or use our{" "}
          <Link href="/find-help" className="text-primary-lavender font-semibold hover:underline">
            Find Help
          </Link>{" "}
          resources.
        </p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-widest text-gray-500">
          <Link href="/privacy" className="hover:text-primary-lavender transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary-lavender transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-primary-lavender transition-colors">
            Contact
          </Link>
        </div>
        <p className="text-[10px] text-gray-300 pt-8 uppercase font-bold tracking-[0.3em]">
          © {new Date().getFullYear()} ThriveWell AI • Made with care
        </p>
      </div>
    </footer>
  );
}
