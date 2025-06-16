"use client";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import dynamic from "next/dynamic";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const LottieAnimation = dynamic(
  () => import('@/app/(main)/(routes)/(root)/components/ExperienceBanner/Lottie'),
  { ssr: false }
);

export function ExperienceBanner() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [role, setRole] = useState<"STUDENT" | "PYME" | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(`/api/user/role?userId=${user.id}`);
        const data = await res.json();
        setRole(data.role);
      } catch (error) {
        console.error("Error fetching user role", error);
      }
    };
    fetchRole();
  }, [user]);

  const panelHref = role === "PYME" ? "/pyme" : "/student/projects";

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl w-full">
        
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <LottieAnimation />
          </div>
        </div>

        {/* Text on the right */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold leading-tight text-[#0A2243] mb-6">
            Experience is built,{" "}
            <TypeAnimation
              sequence={["and we provide the bricks.", 1500]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="block font-bold text-[#2196f3]"
            />
          </h1>
          <p className="text-md md:text-lg text-[#2196F3] mb-8">
            Discover all the projects available so you can develop your experience
            and thus work in the company you want and achieve your professional goals.
          </p>
          <Link
            href={isSignedIn ? panelHref : "/sign-up"}
            className="px-4 py-2 border-2 border-[#0a2243] text-[#0a2243] rounded-xl text-md hover:shadow-xl hover:shadow-[#0a2243]/30 transition"
          >
            {isSignedIn ? "Go to your panel" : "Start now"}
          </Link>
        </div>
      </div>
    </div>
  );
}
