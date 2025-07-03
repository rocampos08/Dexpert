import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    // Esperamos la promesa params
    const { projectId } = await context.params;
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!userProfile) {
      return new NextResponse("UserProfile not found", { status: 404 });
    }

    const student = await prisma.student.findUnique({
      where: { userId: userProfile.id },
    });

    if (!student) {
      return new NextResponse("Student not found", { status: 404 });
    }

    const existing = await prisma.application.findFirst({
      where: {
        studentId: student.id,
        projectId,
      },
    });

    if (!existing) {
      return new NextResponse("Application not found", { status: 404 });
    }

    await prisma.application.delete({
      where: {
        id: existing.id,
      },
    });

    return NextResponse.json({ message: "Application deleted" });
  } catch (error: any) {
    console.error("[DELETE_APPLICATION_ERROR]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
