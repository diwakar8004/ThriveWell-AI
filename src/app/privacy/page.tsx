import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  {
    title: "What we collect",
    body: "We may collect account details you choose to provide (such as email), usage data to improve the product, and content you submit in chat or journal features when those are enabled. Anonymous use may limit what we store.",
  },
  {
    title: "How we use information",
    body: "We use data to operate ThriveWell AI, keep the service secure, personalize your experience where appropriate, and comply with law. We do not sell your personal information.",
  },
  {
    title: "Crisis and safety",
    body: "ThriveWell AI is not a substitute for emergency services. Automated systems may surface crisis resources when risk patterns are detected. In a real product, consult legal counsel before logging or sharing any user content.",
  },
  {
    title: "Your choices",
    body: "You can request access, correction, or deletion of account data where applicable. You may use certain features without creating a full profile.",
  },
  {
    title: "Contact",
    body: "Questions about privacy? Reach us through the contact page and we will respond as soon as we can.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-lavender mb-3">Legal</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">Privacy Policy</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-10">
          Last updated: April 11, 2026. This is a product-style summary for the ThriveWell AI demo. Replace with counsel-reviewed
          language before production.
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
          <Link href="/terms" className="font-bold text-primary-lavender hover:underline">
            Terms of Service
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
