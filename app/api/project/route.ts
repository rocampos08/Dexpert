import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { projectName, description, skills, endDate, startDate,level,category } = await req.json();

    
    const pyme = await prisma.pyme.findUnique({
      where: { userId },
    });

    if (!pyme) {
      return new NextResponse("Pyme not found", { status: 404 });
    }

    
    const project = await prisma.project.create({
      data: {
        userId,
        pymeId: pyme.id, 
        title: projectName,
        description,
        skills,
        level,
        category,
        endDate,
        startDate,
      
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
