
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    const { fullName, email, education, linkedIn } = data;

   
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });
    if (!userProfile) {
      return new NextResponse("User profile not found", { status: 404 });
    }

    
    const student = await prisma.student.upsert({
      where: { userId: userProfile.id },
      update: {
        fullName,
        email,
        education,
        linkedIn,
      },
      create: {
        userId: userProfile.id,
        fullName,
        email,
        education,
        linkedIn,
      },
    });

    return NextResponse.json(student);
  } catch (error: unknown) {
    
    if (error instanceof Error) {
      console.error("[STUDENT_ONBOARDING_ERROR]", error.message);
      return new NextResponse(error.message, { status: 500 });
    }

    
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
