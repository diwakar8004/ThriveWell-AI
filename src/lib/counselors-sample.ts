export type SampleCounselor = {
  id: string;
  name: string;
  specialization: string;
  isOnline: boolean;
  avatarUrl?: string;
  bio: string;
  credentials: string;
  languages: string[];
  sessionTypes: string[];
};

export const SAMPLE_COUNSELORS: SampleCounselor[] = [
  {
    id: "1",
    name: "Dr. Aisha Khan",
    specialization: "Anxiety & Stress",
    isOnline: true,
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    bio: "I help students and young adults build practical tools for anxiety, burnout, and academic pressure—with warmth and zero judgment.",
    credentials: "Ph.D. Clinical Psychology, 8+ years in student mental health",
    languages: ["English", "Hindi"],
    sessionTypes: ["Video", "Chat", "In-person (Mumbai)"],
  },
  {
    id: "2",
    name: "Dr. Michael Lee",
    specialization: "Grief & Loss",
    isOnline: false,
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    bio: "Grief can feel isolating. I walk alongside you at your pace, honoring your story and supporting meaning-making after loss.",
    credentials: "LMFT, grief-focused therapy certification",
    languages: ["English"],
    sessionTypes: ["Video", "Phone"],
  },
  {
    id: "3",
    name: "Dr. Emma Patel",
    specialization: "Loneliness & Relationships",
    isOnline: true,
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    bio: "Connection and boundaries are skills we can grow. I specialize in loneliness, friendships, and family dynamics for ages 16–35.",
    credentials: "Psy.D., relational and ACT-informed care",
    languages: ["English", "Gujarati"],
    sessionTypes: ["Video", "Chat"],
  },
  {
    id: "4",
    name: "Sarah Johnson",
    specialization: "Student Academic Pressure",
    isOnline: true,
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    bio: "Perfectionism and procrastination often mask fear. Together we unpack patterns and build sustainable study and self-compassion habits.",
    credentials: "LPC, university counseling center background",
    languages: ["English"],
    sessionTypes: ["Video", "Chat"],
  },
  {
    id: "5",
    name: "David Chen",
    specialization: "Family Trauma",
    isOnline: false,
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    bio: "Trauma-informed, culturally humble care for family conflict, childhood wounds, and rebuilding safety in relationships.",
    credentials: "LCSW, EMDR-trained",
    languages: ["English", "Mandarin"],
    sessionTypes: ["Video", "In-person (Singapore)"],
  },
  {
    id: "6",
    name: "Maya Sharma",
    specialization: "Self-Esteem Coaching",
    isOnline: true,
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    bio: "You deserve to see yourself with more kindness. I blend coaching and therapeutic skills for confidence and identity work.",
    credentials: "M.Sc. Counseling Psychology",
    languages: ["English", "Hindi"],
    sessionTypes: ["Chat", "Video"],
  },
];

export function getCounselorById(id: string) {
  return SAMPLE_COUNSELORS.find((c) => c.id === id);
}
