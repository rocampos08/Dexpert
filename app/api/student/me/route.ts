// app/api/student/me/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const userProfile = await prisma.userProfile.findUnique({ where: { userId } });
  if (!userProfile) return new NextResponse("User profile not found", { status: 404 });

  const student = await prisma.student.findUnique({ where: { userId: userProfile.id } });
  return NextResponse.json(student);
}

export async function PUT(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const userProfile = await prisma.userProfile.findUnique({ where: { userId } });
  if (!userProfile) return new NextResponse("User profile not found", { status: 404 });

  const data = await req.json();

  const updated = await prisma.student.update({
    where: { userId: userProfile.id },
    data,
  });

  return NextResponse.json(updated);
}
