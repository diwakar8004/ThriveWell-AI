import { PrismaClient, Role, SessionStatus, MessageType, HelplineType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample counselors (and associated users)
  const counselorUsers = await Promise.all([
    prisma.user.create({
      data: {
        email: 'counselor1@example.com',
        name: 'Dr. Aisha Khan',
        role: Role.COUNSELOR,
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        isAnonymous: false,
        location: 'India',
        counselor: {
          create: {
            specialization: 'Anxiety & Stress',
            bio: 'Licensed therapist with 5 years experience helping students.',
            isOnline: true,
            isVerified: true,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'counselor2@example.com',
        name: 'Dr. Michael Lee',
        role: Role.COUNSELOR,
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
        isAnonymous: false,
        location: 'USA',
        counselor: {
          create: {
            specialization: 'Grief & Loss',
            bio: 'Psychologist specializing in bereavement counseling.',
            isOnline: false,
            isVerified: true,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'counselor3@example.com',
        name: 'Dr. Emma Patel',
        role: Role.COUNSELOR,
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
        isAnonymous: false,
        location: 'UK',
        counselor: {
          create: {
            specialization: 'Loneliness & Relationships',
            bio: 'Counselor focusing on social connection and relationship skills.',
            isOnline: true,
            isVerified: true,
          },
        },
      },
    }),
  ]);

  // Helpline seed data
  const helplines = [
    { countryCode: 'IN', name: 'iCall', number: '9152987821', forType: HelplineType.SUICIDE },
    { countryCode: 'IN', name: 'Vandrevala Foundation', number: '1860-2662-345', forType: HelplineType.SUICIDE },
    { countryCode: 'IN', name: 'AASRA', number: '9820466627', forType: HelplineType.SUICIDE },
    { countryCode: 'US', name: '988 Suicide & Crisis Lifeline', number: '988', forType: HelplineType.SUICIDE },
    { countryCode: 'US', name: 'Crisis Text Line', number: 'Text HOME to 741741', forType: HelplineType.SUICIDE },
    { countryCode: 'GB', name: 'Samaritans', number: '116 123', forType: HelplineType.SUICIDE },
    { countryCode: 'GB', name: 'Mind Infoline', number: '0300 123 3393', forType: HelplineType.SUICIDE },
    { countryCode: 'GLOBAL', name: 'International Association for Suicide Prevention', number: 'https://www.iasp.info/resources/Crisis_Centres/', forType: HelplineType.SUICIDE },
  ];

  await prisma.helpline.deleteMany();
  await prisma.helpline.createMany({
    data: helplines,
  });

  // Demo user for mood & journal entries
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      name: 'Demo User',
      role: Role.USER,
      avatarUrl: 'https://i.pravatar.cc/150?img=4',
      isAnonymous: false,
      location: 'India',
    },
  });

  // Mood entries (last 5 days)
  const moods = [
    { moodScore: 8, emoji: '😊', note: 'Feeling good after a walk' },
    { moodScore: 5, emoji: '😐', note: 'Average day' },
    { moodScore: 3, emoji: '😔', note: 'A bit stressed with exams' },
    { moodScore: 6, emoji: '🙂', note: 'Improved after talking to a friend' },
    { moodScore: 2, emoji: '😞', note: 'Very low energy' },
  ];

  await Promise.all(
    moods.map((m, i) =>
      prisma.moodEntry.create({
        data: {
          userId: demoUser.id,
          moodScore: m.moodScore,
          emoji: m.emoji,
          note: m.note,
          createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        },
      })
    )
  );

  // Journal entries
  const journals = [
    { title: 'First Thoughts', content: 'I started using ThriveWell AI today. It feels safe.' },
    { title: 'Mid‑Week Reflections', content: 'The quick‑reply chips helped me articulate my anxiety.' },
  ];

  await Promise.all(
    journals.map((j) =>
      prisma.journalEntry.create({
        data: {
          userId: demoUser.id,
          title: j.title,
          content: j.content,
        },
      })
    )
  );

  console.log('🌱 Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
