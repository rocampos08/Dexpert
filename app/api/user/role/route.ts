import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ role: null });
  }

  const profile = await prisma.userProfile.findUnique({
    where: { userId },
    select: { role: true },
  });

  return NextResponse.json({ role: profile?.role || null });
}
