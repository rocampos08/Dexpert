import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const { userId: clerkUserId } = await auth(); 
  if (!clerkUserId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId: clerkUserId },
    });

    if (!userProfile) {
      return new NextResponse("User profile not found", { status: 404 });
    }

    
    const student = await prisma.student.findUnique({
      where: { userId: userProfile.id }, 
    });

    
    if (!student) {
      return NextResponse.json({
        fullName: "",
        email: "",
        education: "",
        skills: "",
        language: "",
        linkedIn: "",
      });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error("Error in GET /api/student/me:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { userId: clerkUserId } = await auth(); 
  if (!clerkUserId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await req.json(); 

  try {
    
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId: clerkUserId },
    });

    if (!userProfile) {
      return new NextResponse("User profile not found", { status: 404 });
    }

    
    const updatedStudent = await prisma.student.update({
      where: { userId: userProfile.id },
      data: {
        fullName: data.fullName,
        email: data.email,
        education: data.education,
        skills: data.skills,
        language: data.language,
        linkedIn: data.linkedIn,
        
      },
    });

    return NextResponse.json(updatedStudent);
  } catch (error: any) {
    console.error("Error in PUT /api/student/me:", error);

    
    if (error.code === 'P2002') {
      return new NextResponse(JSON.stringify({ message: "A profile with this LinkedIn URL already exists." }), {
        status: 409, 
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse(JSON.stringify({ message: "Failed to update profile", error: error.message || "Unknown error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}