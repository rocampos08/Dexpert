import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
): Promise<NextResponse<unknown>> {
  try {
    const { projectId } = params;
    const { userId } = await auth();
    const values = await req.json();

    console.log("PATCH values:", values, "projectId:", projectId, "userId:", userId);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { startDate, endDate, ...rest } = values;

    const project = await prisma.project.update({
      where: {
        id: projectId,
        userId,
      },
      data: {
        ...rest,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("[PROJECT_PATCH_ERROR]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
