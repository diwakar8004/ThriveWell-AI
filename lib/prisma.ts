import { PrismaClient, Role, SessionStatus, MessageType, HelplineType } from '@prisma/client';

declare global {
  // Allow global `prisma` variable in dev (avoid multiple instances)
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
