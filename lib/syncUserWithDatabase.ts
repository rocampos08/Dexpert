// lib/syncUserWithDatabase.ts
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function syncUserWithDatabase(role: "STUDENT" | "PYME") {
  const { userId } = await auth();

  if (!userId) throw new Error("No user logged in");

  await prisma.userProfile.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      role,
    },
  });
}
