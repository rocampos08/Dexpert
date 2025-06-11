import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";


export async function PATCH(
  req: Request,
  {params}: { params: Promise<{ projectId: string }> }
) {
  try {
  
    const { projectId } = await params;

    const { userId } = await auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const project = await prisma.project.update({
      where: {
        id: projectId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT_PATCH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  {params}: { params: Promise<{ projectId: string }> }
) {
  try {
    
    const { projectId } = await params;

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const project = await prisma.project.delete({
      where: {
        id: projectId,
        userId,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT_DELETE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
