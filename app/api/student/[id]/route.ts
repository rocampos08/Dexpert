import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: NextRequest,
  context: any // <- evita error de compilación
) {
  try {
    const { id: clerkUserIdFromUrl } = await context.params;


    const { userId: currentClerkUserId } = await auth();

    if (!currentClerkUserId || currentClerkUserId !== clerkUserIdFromUrl) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: { userId: clerkUserIdFromUrl },
    });

    if (!userProfile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    const student = await prisma.student.findUnique({
      where: {
        userId: userProfile.id,
      },
      select: {
        skills: true,
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
    }

    return NextResponse.json({ skills: student.skills ?? "" });
  } catch (error) {
    console.error("[API/STUDENT/ID] Error fetching student skills:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
