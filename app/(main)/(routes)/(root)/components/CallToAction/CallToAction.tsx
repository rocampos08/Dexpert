"use client";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

export function CallToAction() {
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
        console.error("Error fetching user role:", error);
      }
    };

    fetchRole();
  }, [user]);

  const href = !isSignedIn ? "/sign-up" : role === "PYME" ? "/pyme" : "/student/projects";
  const label = !isSignedIn ? "Join us now!" : "Go to your panel";

  return (
    <section className="bg-blue-600 text-white py-16 px-6 text-center rounded-2xl shadow-xl max-w-4xl mx-auto my-12">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        Ready to take the first step?
      </h2>
      <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
        Whether you're a young talent looking for experience or a small business needing real solutions — Dexpert is your bridge to growth.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href={href}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
        >
          {label}
        </a>
      </div>
      <p className="mt-6 text-sm text-white/80 italic">
        ✨ Your talent is enough. Experience starts here.
      </p>
    </section>
  );
}
