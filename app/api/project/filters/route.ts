import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        pyme: {
          select: {
            name: true,
            logoUrl: true,
          },
        },
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
