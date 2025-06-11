import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); 

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { projectName, description, skills } = await req.json();

    const project = await prisma.project.create({
      data: {
        userId,
        title: projectName,
        description,
        skills,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("[PROJECT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
