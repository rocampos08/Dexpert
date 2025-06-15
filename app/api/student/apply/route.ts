import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 1. Autenticación del usuario con Clerk
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Obtener datos del body
    const { projectId } = await req.json();

    // 3. Buscar el perfil de usuario por el userId de Clerk
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId }, // este es el userId de Clerk
    });

    if (!userProfile) {
      return new NextResponse("User profile not found", { status: 404 });
    }

    // 4. Buscar el perfil de estudiante usando el ID interno del UserProfile
    const student = await prisma.student.findUnique({
      where: { userId: userProfile.id }, // ✅ CORREGIDO: usamos el ID del modelo, no el de Clerk
    });

    if (!student) {
      return new NextResponse("Student profile not found", { status: 404 });
    }

    // 5. Verificar si ya aplicó al proyecto
    const existingApplication = await prisma.application.findFirst({
      where: {
        studentId: student.id,
        projectId,
      },
    });

    if (existingApplication) {
      return new NextResponse("You already applied to this project", { status: 400 });
    }

    // 6. Crear nueva aplicación
    const application = await prisma.application.create({
      data: {
        studentId: student.id,
        projectId,
      },
    });

    // 7. Respuesta exitosa
    return NextResponse.json(application);

  } catch (error: any) {
    console.error("[APPLICATION_POST_ERROR]", error);
    return new NextResponse(
      JSON.stringify({ message: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
