import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // 1️⃣ Auth
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2️⃣ Body parsing
  let body: any;
  try {
    body = await req.json();
    console.log("Received body:", body);
  } catch (err) {
    console.error("Error parsing JSON:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 3️⃣ Duplicate check
  const existing = await prisma.pyme.findUnique({ where: { userId } });
  if (existing) {
    return NextResponse.json({ error: "Already onboarded" }, { status: 400 });
  }

  // 4️⃣ Clean optional strings → null
  const clean = <T extends Record<string, unknown>>(obj: T) =>
    Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, typeof v === "string" && v.trim() === "" ? null : v])
    ) as T;

  const data = clean({
    userId,
    name: body.name,
    contact: body.contact,
    description: body.description,
    website: body.website,
    location: body.location,
    logoUrl: body.logoUrl,
  });

  // 5️⃣ Create
  try {
    const pyme = await prisma.pyme.create({ data });
    return NextResponse.json(pyme, { status: 201 });
  } catch (err: any) {
    console.error("Error creating Pyme:", err);
    return NextResponse.json({ error: err.message || "Database error" }, { status: 400 });
  }
}
