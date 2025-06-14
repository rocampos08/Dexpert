// app/sign-up/page.tsx
"use client";

import { SignUp } from "@clerk/nextjs";
import { useState } from "react";

export default function SignUpPage() {
  const [role, setRole] = useState<string | null>(null);

  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
        <h1 className="font-semibold text-4xl">Select your role</h1>
        <select
          className="border p-2 rounded text-lg"
          defaultValue=""
          onChange={(e) => {
            const value = e.target.value;
            if (value === "STUDENT" || value === "PYME") {
              localStorage.setItem("selectedRole", value); // ✅ Guarda el rol aquí
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
      <h1 className="font-semibold text-4xl">Create your account</h1>
      <p className="text-xl mb-4">Signing up as: <strong>{role.toLowerCase()}</strong></p>
      <SignUp
        path="/sign-up"
        forceRedirectUrl="/onboarding" // ✅ Redirige al onboarding
      />
    </div>
  );
}
