import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  const adapter = new PrismaBetterSQLite3({
    url: "file:../../prisma/dev.db"
  });
  return new PrismaClient({ adapter });
};

// Singleton pattern avoid hot reloading issues in development mode: https://www.robinwieruch.de/next-prisma-sqlite/
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;