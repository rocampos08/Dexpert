// app/sign-up/page.tsx
"use client";

import { SignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [role, setRole] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const res = await fetch("/api/get-role");
        const data = await res.json();

        if (data.role === "STUDENT") {
          router.push("/student");
        } else if (data.role === "PYME") {
          router.push("/pyme");
        } else {
          setChecking(false); // No tiene rol, mostrar selector
        }
      } catch (err) {
        console.error("Error checking role:", err);
        setChecking(false);
      }
    };

    checkUserRole();
  }, [router]);

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
        <h1 className="font-semibold text-4xl text-gray-700">Select your role</h1>
        <select
          className="border p-2 rounded text-lg text-gray-500"
          defaultValue=""
          onChange={(e) => {
            const value = e.target.value;
            if (value === "STUDENT" || value === "PYME") {
              localStorage.setItem("selectedRole", value);
              setRole(value);
            }
          }}
        >
          <option value="" disabled>Choose your role</option>
          <option value="STUDENT">Student</option>
          <option value="PYME">Pyme</option>
        </select>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="font-semibold text-4xl text-gray-700">Create your account</h1>
      <p className="text-xl mb-4 text-gray-600">Signing up as: <strong>{role.toLowerCase()}</strong></p>
      <SignUp
        path="/sign-up"
        forceRedirectUrl="/onboarding"
      />
    </div>
  );
}
