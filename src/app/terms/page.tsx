import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  {
    title: "The service",
    body: "ThriveWell AI provides digital wellness tools including an AI chat experience, educational content, and interfaces to connect with professionals. It is not medical or clinical treatment unless provided by a licensed professional through an appropriate channel.",
  },
  {
    title: "Not emergency care",
    body: "If you or someone else is in immediate danger, contact local emergency services or a crisis line. Do not rely on this app as your only source of help in an emergency.",
  },
  {
    title: "Acceptable use",
    body: "You agree not to misuse the platform, attempt to access others' data, or use automated means to overload the service. We may suspend access for violations.",
  },
  {
    title: "AI limitations",
    body: "AI responses can be incorrect or incomplete. They are for support and self-reflection, not diagnosis or legal advice. Always verify important decisions with qualified humans.",
  },
  {
    title: "Limitation of liability",
    body: "To the fullest extent permitted by law, ThriveWell AI and its team disclaim liability arising from use of the demo service. Production terms should be drafted with a lawyer for your jurisdiction.",
  },
];

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-lavender mb-3">Legal</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">Terms of Service</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-10">
          Last updated: April 11, 2026. Demo terms for ThriveWell AI—replace with jurisdiction-specific legal documents before
          launch.
        </p>
        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.title} className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{s.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-12 text-sm text-gray-500">
          Related:{" "}
          <Link href="/privacy" className="font-bold text-primary-lavender hover:underline">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/contact" className="font-bold text-primary-lavender hover:underline">
            Contact
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
