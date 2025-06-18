"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function CheckRolePage() {
  const router = useRouter();
  const { isSignedIn, isLoaded, user } = useUser();

  useEffect(() => {
    console.log("CheckRolePage - useEffect executed.");
    console.log("isLoaded:", isLoaded, "isSignedIn:", isSignedIn);

    if (!isLoaded) {
      console.log("Clerk not loaded yet, returning.");
      return;
    }

    if (!isSignedIn) {
      console.log("User not signed in, redirecting to /sign-in.");
      router.push("/sign-in");
      return;
    }

    // --- IMPORTANT: Get the Clerk userId ---
    const currentClerkUserId = user?.id; // Get the user's ID from Clerk's user object

    if (!currentClerkUserId) {
        console.warn("Clerk user ID not available, cannot check role.");
        router.push("/sign-in"); // Or redirect to an error page
        return;
    }
    console.log("Clerk User ID:", currentClerkUserId); // Log the ID for debugging

    const checkRole = async () => {
      console.log("Attempting to get user role from /api/user/role...");
      try {
        // --- IMPORTANT: Pass the userId to the API ---
        const res = await fetch(`/api/user/role?userId=${currentClerkUserId}`);
        console.log("API Response - status:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Failed to get role. Response:", errorText);
          throw new Error("Failed to get role: " + errorText);
        }

        const data = await res.json();
        console.log("Role data received:", data);
        console.log("User's role is:", data.role); // --- PAY CLOSE ATTENTION TO THIS VALUE! ---

        if (data.role === "STUDENT") {
          console.log("Role is STUDENT. Redirecting to /student...");
          router.push("/student");
        } else if (data.role === "PYME") {
          console.log("Role is PYME. Redirecting to /pyme...");
          router.push("/pyme");
        } else {
          console.log(`Unknown or null role (${data.role}). Redirecting to /onboarding...`);
          router.push("/onboarding"); // No role yet
        }
      } catch (err) {
        console.error("Error checking role:", err);
        router.push("/sign-in");
      }
    };

    checkRole();
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-sm w-full transform transition-all duration-300 hover:scale-105">
        {/* Animated Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 dark:border-blue-400 mb-6"></div>
        
        {/* Main text with style */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-2">
          Verifying your profile...
        </h1>
        
        {/* Subtler secondary text */}
        <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-4">
          Please wait a moment, we are preparing your experience.
        </p>

        
         <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div className="bg-blue-500 h-2 rounded-full animate-pulse-progress"></div>
        </div> 


        <img src="/lgo.png" alt="Logo" className="mt-6 h-12" /> 
      </div>
    </div>
  );
}