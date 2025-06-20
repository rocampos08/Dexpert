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

  const updated = await prisma.pyme.update({
    where: { userId },
    data,
  });

  return NextResponse.json(updated);
}
