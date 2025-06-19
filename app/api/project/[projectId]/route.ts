import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";


export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
): Promise<NextResponse> {
  try {
    const { projectId } = params;
    const { userId } = await auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { startDate, endDate, ...rest } = values;

    const dataToUpdate: any = { ...rest };

    if (startDate) {
      const parsedStart = new Date(startDate);
      if (isNaN(parsedStart.getTime())) {
        return NextResponse.json({ error: "Invalid startDate" }, { status: 400 });
      }
      dataToUpdate.startDate = parsedStart;
    }

    if (endDate) {
      const parsedEnd = new Date(endDate);
      if (isNaN(parsedEnd.getTime())) {
        return NextResponse.json({ error: "Invalid endDate" }, { status: 400 });
      }
      dataToUpdate.endDate = parsedEnd;
    }

    const project = await prisma.project.update({
      where: {
        id: projectId,
        userId,
      },
      data: dataToUpdate,
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("[PROJECT_PATCH_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
): Promise<NextResponse> {
  try {
    const { projectId } = params;
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.userId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    
    await prisma.application.deleteMany({
      where: {
        projectId: projectId,
      },
    });

    
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json({ message: "Project and related applications deleted" }, { status: 200 });
  } catch (error: any) {
    console.error("[PROJECT_DELETE_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

