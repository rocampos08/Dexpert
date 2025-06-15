
import  prisma  from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUserRole() {
  const { userId } = await auth();

  if (!userId) return null;

  const user = await prisma.userProfile.findUnique({
    where: { userId },
  });

  return user?.role ?? null;
}
