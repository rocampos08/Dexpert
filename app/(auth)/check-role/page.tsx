// app/auth/check-role/page.tsx
"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CheckRolePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/auth/sign-in");
      return;
    }

    const checkRole = async () => {
      try {
        const res = await fetch("/api/get-role");
        const data = await res.json();

        if (data.role === "STUDENT") {
          router.push("/student");
        } else if (data.role === "PYME") {
          router.push("/pyme");
        } else {
          router.push("/auth/sign-up");
        }
      } catch (err) {
        console.error("Error checking role:", err);
        router.push("/auth/sign-in");
      }
    };

    checkRole();
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg text-blue-600">Loading...</p>
    </div>
  );
}
