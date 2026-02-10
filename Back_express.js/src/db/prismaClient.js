// src/db/prismaClient.js
import "dotenv/config";
import prismaPackage from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const { PrismaClient } = prismaPackage;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL manquant dans .env");
}

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });
