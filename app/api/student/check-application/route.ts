import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  const { userId } = await auth();
  if (!userId || !projectId) {
    return NextResponse.json({ hasApplied: false });
  }

  const userProfile = await prisma.userProfile.findUnique({
    where: { userId },
  });

  if (!userProfile) {
    return NextResponse.json({ hasApplied: false });
  }

  const student = await prisma.student.findUnique({
    where: { userId: userProfile.id },
  });

  if (!student) {
    return NextResponse.json({ hasApplied: false });
  }

  const application = await prisma.application.findFirst({
    where: {
      studentId: student.id,
      projectId,
    },
  });

  return NextResponse.json({ hasApplied: !!application });
}
