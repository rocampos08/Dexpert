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

    console.log("PATCH values:", values, "projectId:", projectId, "userId:", userId);

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