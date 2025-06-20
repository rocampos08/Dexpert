import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const { userId } = await auth();
    const { projectId } = params;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) return new NextResponse("Student not found", { status: 404 });

    const existing = await prisma.application.findFirst({
      where: {
        studentId: student.id,
        projectId,
      },
    });

    if (existing) return new NextResponse("Already applied", { status: 400 });

    const application = await prisma.application.create({
      data: {
        studentId: student.id,
        projectId,
      },
    });

    return NextResponse.json(application);
  } catch (error: any) {
    console.error("[APPLICATION_ERROR]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
