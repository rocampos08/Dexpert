
import { auth } from "@clerk/nextjs/server";
import prisma  from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const user = await prisma.userProfile.findUnique({
    where: { userId },
  });

  return Response.json({ role: user?.role ?? null });
}
