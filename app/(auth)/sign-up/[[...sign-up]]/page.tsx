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
    // First, check if a role is already stored in localStorage (from a previous selection attempt)
    const storedRole = localStorage.getItem("selectedRole");
    if (storedRole === "STUDENT" || storedRole === "PYME") {
      setRole(storedRole);
      setChecking(false); // We have a stored role, no need to fetch
      return;
    }

    // If no role in localStorage, then check the user's role from the backend
    const checkUserRole = async () => {
      try {
        const res = await fetch("/api/get-role");
        const data = await res.json();

        if (data.role === "STUDENT") {
          router.push("/student");
          return; // Exit early as user is redirected
        } else if (data.role === "PYME") {
          router.push("/pyme");
          return; // Exit early as user is redirected
        } else {
          // No role from backend and no stored role, so allow selection
          setChecking(false);
        }
      } catch (err) {
        console.error("Error checking role:", err);
        setChecking(false);
      }
    };

    checkUserRole();
  }, [router]);

  // Show a loading spinner while checking the user's role or stored role
  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // If no role is selected yet, prompt the user to choose
  // This is the key change: this block now executes BEFORE the Clerk form
  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center border border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            Welcome!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Please select your role to continue.
          </p>
          <select
            className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg text-gray-700 bg-white cursor-pointer transition duration-300 ease-in-out hover:border-blue-400"
            defaultValue=""
            onChange={(e) => {
              const value = e.target.value;
              if (value === "STUDENT" || value === "PYME") {
                localStorage.setItem("selectedRole", value); // Store the selected role
                setRole(value); // Update state to trigger Clerk form display
              }
            }}
          >
            <option value="" disabled>
              Choose your role
            </option>
            <option value="STUDENT">Student</option>
            <option value="PYME">Pyme</option>
          </select>
        </div>
      </div>
    );
  }

  // Once a role is selected (either from localStorage or by user interaction),
  // display the Clerk SignUp component
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center border border-gray-200">
       
        <p className="text-lg text-gray-600 mb-6">
          Signing up as:{" "}
          <strong className="text-blue-600 capitalize">
            {role.toLowerCase()}
          </strong>
        </p>
        <SignUp
          path="/sign-up"
          // Pass the selected role as a query parameter or use Clerk's metadata if applicable
          // For now, we'll assume /onboarding can handle reading the role from local storage or
          // you'll set up Clerk metadata in a webhook or custom action.
          forceRedirectUrl={`/onboarding?role=${role.toLowerCase()}`}
        />
      </div>
    </div>
  );
}