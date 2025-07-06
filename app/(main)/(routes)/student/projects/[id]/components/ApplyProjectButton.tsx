"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ApplyProjectButtonProps = {
  projectId: string;
};

export function ApplyProjectButton({ projectId }: ApplyProjectButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    // Consultar si el estudiante ya aplicó
    async function checkApplication() {
      try {
        const res = await fetch(`/api/student/check-application?projectId=${projectId}`);
        const data = await res.json();
        setHasApplied(data.hasApplied);
      } catch (err) {
        console.error("Failed to check application status", err);
      }
    }

    checkApplication();
  }, [projectId]);

  async function handleApply() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/student/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to apply");
      }

      toast.success("Successfully applied to the project!");
      setHasApplied(true);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Error applying to project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={handleApply}
        disabled={loading || hasApplied}
        className={`w-full px-4 py-2 rounded flex items-center gap-2 transition justify-center ${
          hasApplied
            ? "bg-gray-300 text-gray-600 text-center md:text-center sm:text-center cursor-not-allowed"
            : "bg-[#0a2243] text-white hover:bg-[#0a2243]/90"
        }`}
      >
        {loading ? "Applying..." : hasApplied ? "Applied" : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M22 2L11 13"></path>
              <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
            </svg>
            Apply Now
          </>
        )}
      </button>
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </>
  );
}
