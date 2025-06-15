import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  const body = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.pyme.findUnique({ where: { userId } });
  if (existing) {
    return NextResponse.json({ error: "Already onboarded" }, { status: 400 });
  }

  const pyme = await prisma.pyme.create({
    data: {
      userId,
      name: body.name,
      contact: body.contact,
      description: body.description,
      website: body.website,
      location: body.location,
      logoUrl: body.logoUrl,
    },
  });

  return NextResponse.json(pyme);
}
