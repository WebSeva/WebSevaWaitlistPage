import { PrismaClient } from '@prisma/client';

let prisma;

// Only create a single PrismaClient instance during the lifecycle of the application.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error'], // Log only errors in production to avoid unnecessary overhead.
  });
} else {
  // In development, ensure the Prisma Client is not re-initialized during hot reloading.
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'], // More extensive logging in development for debugging.
    });
  }
  prisma = global.prisma;
}

export default prisma;
