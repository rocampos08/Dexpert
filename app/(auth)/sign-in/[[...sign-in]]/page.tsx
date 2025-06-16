"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignInPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    const redirectByRole = async () => {
      if (!isSignedIn || !user?.id) return;

      try {
        const res = await fetch(`/api/user/role?userId=${user.id}`);
        const data = await res.json();

        if (data.role === "PYME") {
          router.push("/pyme");
        } else if (data.role === "STUDENT") {
          router.push("/student/projects");
        } else {
          toast.error("You are not in our system, redirecting to sign-up.");
          router.push("/sign-up");
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        router.push("/sign-up");
      }
    };

    redirectByRole();
  }, [isSignedIn, user, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="font-semibold text-[#0A2342] text-4xl">Welcome!</h1>
      <p className="text-xl text-[#2196F3]">Sign In to continue</p>
      <SignIn />
    </div>
  );
}
