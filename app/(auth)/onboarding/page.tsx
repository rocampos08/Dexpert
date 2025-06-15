
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    const createUser = async () => {
      const role = localStorage.getItem("selectedRole");

      if (!role || (role !== "STUDENT" && role !== "PYME")) {
        console.error("No valid role selected");
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
        await mutate("/api/get-role");

        router.push(role === "STUDENT" ? "/student" : "/onboarding/pyme");
      } catch (error) {
        console.error("Error creating user:", error);
        router.push("/error");
      }
    };

    createUser();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-xl font-medium text-gray-700">Creating your profile...</p>
    </div>
  );
}
