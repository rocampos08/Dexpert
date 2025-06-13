// app/onboarding/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr"; // Importar mutate de swr

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    const createUser = async () => {
      const role = localStorage.getItem("selectedRole");

      if (!role || (role !== "STUDENT" && role !== "PYME")) {
        console.error("No valid role selected");
        // Considerar redirigir a una página de error o al signup si no hay rol
        router.push("/sign-up");
        return;
      }

      try {
        await fetch("/api/create-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
        });

        localStorage.removeItem("selectedRole");

        // ✅ Importante: Revalidar la clave de SWR para el rol del usuario
        // Esto le dice a useSWR que la clave '/api/get-role' está obsoleta
        // y necesita ser refetcheada.
        await mutate("/api/get-role");

        // Redirige según el rol
        router.push(role === "STUDENT" ? "/student" : "/pyme");
      } catch (error) {
        console.error("Error creating user:", error);
        // Manejar el error, quizás redirigir a una página de error
        router.push("/error"); // O una página de error más específica
      }
    };

    createUser();
  }, [router]);

  return <div className="p-6 text-xl">Creando tu perfil...</div>;
}