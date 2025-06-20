import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.warn("[GET-ROLE] Usuario no autenticado");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    console.log("[GET-ROLE] userId:", userId);

    const user = await prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!user) {
      console.warn("[GET-ROLE] No se encontró perfil para userId:", userId);
      return new Response(
        JSON.stringify({ error: "User profile not found", role: null }),
        {
          status: 404,
          statusText: "User profile not found",
        }
      );
    }

    console.log("[GET-ROLE] Role:", user.role);

    return new Response(JSON.stringify({ role: user.role }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("[GET-ROLE] Error inesperado:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
