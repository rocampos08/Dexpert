"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

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

    
    const currentClerkUserId = user?.id; 

    if (!currentClerkUserId) {
        console.warn("Clerk user ID not available, cannot check role.");
        router.push("/sign-in"); 
        return;
    }
    console.log("Clerk User ID:", currentClerkUserId); 

    const checkRole = async () => {
      console.log("Attempting to get user role from /api/user/role...");
      try {
       
        const res = await fetch(`/api/user/role?userId=${currentClerkUserId}`);
        console.log("API Response - status:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Failed to get role. Response:", errorText);
          throw new Error("Failed to get role: " + errorText);
        }

        const data = await res.json();
        console.log("Role data received:", data);
        console.log("User's role is:", data.role); 

        if (data.role === "STUDENT") {
          console.log("Role is STUDENT. Redirecting to /student...");
          router.push("/student");
        } else if (data.role === "PYME") {
          console.log("Role is PYME. Redirecting to /pyme...");
          router.push("/pyme");
        } else {
          console.log(`Unknown or null role (${data.role}). Redirecting to /onboarding...`);
          router.push("/onboarding"); 
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
       
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 dark:border-blue-400 mb-6"></div>
        
        
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-2">
          Verifying your profile...
        </h1>
        
        
        <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-4">
          Please wait a moment, we are preparing your experience.
        </p>

        
         <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div className="bg-blue-500 h-2 rounded-full animate-pulse-progress"></div>
        </div> 


        <Image src="/lgo.png" alt="Logo" height={20} width={70} className="mt-6 h-12" /> 
      </div>
    </div>
  );
}