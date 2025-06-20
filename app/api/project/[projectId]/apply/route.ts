import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  context: Promise<{ params: { projectId: string } }>
) {
  try {
    const { params } = await context;
    const { projectId } = params;

    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const student = await prisma.student.findUnique({ where: { userId } });
    if (!student) return new NextResponse("Student not found", { status: 404 });

    const existing = await prisma.application.findFirst({
      where: { studentId: student.id, projectId },
    });
    if (!existing) return new NextResponse("Application not found", { status: 404 });

    await prisma.application.delete({ where: { id: existing.id } });

    return NextResponse.json({ message: "Application deleted" });
  } catch (error: any) {
    console.error("[DELETE_APPLICATION_ERROR]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
