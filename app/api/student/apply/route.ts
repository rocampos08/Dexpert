import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    
    const { projectId } = await req.json();

    const userProfile = await prisma.userProfile.findUnique({
      where: { userId }, 
    });

    if (!userProfile) {
      return new NextResponse("User profile not found", { status: 404 });
    }

    
    const student = await prisma.student.findUnique({
      where: { userId: userProfile.id }, 
    });

    if (!student) {
      return new NextResponse("Student profile not found", { status: 404 });
    }

    
    const existingApplication = await prisma.application.findFirst({
      where: {
        studentId: student.id,
        projectId,
      },
    });

    if (existingApplication) {
      return new NextResponse("You already applied to this project", { status: 400 });
    }

    
    const application = await prisma.application.create({
      data: {
        studentId: student.id,
        projectId,
      },
    });

    
    return NextResponse.json(application);

  } catch (error: any) {
    console.error("[APPLICATION_POST_ERROR]", error);
    return new NextResponse(
      JSON.stringify({ message: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
