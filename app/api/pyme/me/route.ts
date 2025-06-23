import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const pyme = await prisma.pyme.findUnique({ where: { userId } });

  if (!pyme) return new NextResponse("Pyme profile not found", { status: 404 });

  return NextResponse.json(pyme);
}

export async function PUT(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const data = await req.json();

  const existing = await prisma.pyme.findUnique({
    where: { userId },
  });

  let pyme;

  if (existing) {
    pyme = await prisma.pyme.update({
      where: { userId },
      data,
    });
  } else {
    pyme = await prisma.pyme.create({
      data: {
        userId,
        name: data.name,
        contact: data.contact,
        description: data.description,
        website: data.website,
        location: data.location,
        logoUrl: data.logoUrl,
      },
    });
  }

  return NextResponse.json(pyme);
}
