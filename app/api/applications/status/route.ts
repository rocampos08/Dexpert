import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { applicationId, newStatus } = await req.json();

    if (!["approved", "rejected"].includes(newStatus)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: { status: newStatus },
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
