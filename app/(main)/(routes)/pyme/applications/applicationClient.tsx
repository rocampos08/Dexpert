"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Link from "next/link";
import { useState } from "react";

type Student = {
  fullName: string;
  email: string;
  education?: string | null;
  language?: string | null;
  skills?: string | null;
  linkedIn?: string | null;
};

type Application = {
  id: string;
  status: string;
  student: Student;
};

type Project = {
  id: string;
  title: string;
  applications: Application[];
};

type Props = {
  projects: Project[];
};

export default function ApplicationsClient({ projects }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const downloadPDF = (applicant: Student) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Applicant Information", 14, 22);

    autoTable(doc, {
      startY: 30,
      theme: "striped",
      head: [["Field", "Value"]],
      body: [
        ["Name", applicant.fullName],
        ["Email", applicant.email],
        ["Education", applicant.education || "N/A"],
        ["Language", applicant.language || "N/A"],
        ["Skills", applicant.skills || "N/A"],
        ["LinkedIn", applicant.linkedIn || "N/A"],
      ],
    });

    doc.save(`${applicant.fullName.replaceAll(" ", "_")}_Application.pdf`);
  };

  const updateStatus = async (applicationId: string, status: "approved" | "rejected") => {
    setLoadingId(applicationId);
    try {
      const res = await fetch("/api/applications/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, newStatus: status }),
      });

      if (res.ok) {
        window.location.reload(); // Podés mejorar con estado local
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#0a2243] mb-8 text-center">
        Applications to your Projects
      </h1>

      {projects.map((project) => (
        <div
          key={project.id}
          className="mb-10 bg-white rounded-2xl shadow-sm border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-100 bg-[#0a2243] text-white rounded-t-2xl">
            <h2 className="text-lg font-semibold">{project.title}</h2>
          </div>

          <div className="px-6 py-4">
            {project.applications.length === 0 ? (
              <p className="text-gray-500 italic">No applications yet.</p>
            ) : (
              <div className="grid gap-4">
                {project.applications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-gray-50 p-4 text-gray-700 rounded-xl border border-gray-200 hover:shadow transition"
                  >
                    <p className="text-sm">
                      <span className="font-medium text-[#0a2243]">👤 Name:</span> {app.student.fullName}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-[#0a2243]">✉️ Email:</span> {app.student.email}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-[#0a2243]">🎓 Education:</span> {app.student.education || "N/A"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-[#0a2243]">🗣️ Language:</span> {app.student.language || "N/A"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-[#0a2243]">🛠️ Skills:</span> {app.student.skills || "N/A"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-[#0a2243]">🌐 LinkedIn:</span>{" "}
                      {app.student.linkedIn ? (
                        <Link
                          href={app.student.linkedIn}
                          target="_blank"
                          className="text-blue-600 hover:underline"
                        >
                          {app.student.linkedIn}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4 items-center">
                      {app.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(app.id, "approved")}
                            disabled={loadingId === app.id}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                          >
                            ✅ {loadingId === app.id ? "Approving..." : "Approve"}
                          </button>
                          <button
                            onClick={() => updateStatus(app.id, "rejected")}
                            disabled={loadingId === app.id}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                          >
                            ❌ {loadingId === app.id ? "Rejecting..." : "Reject"}
                          </button>
                        </>
                      )}

                      {app.status === "approved" && (
                        <span className="text-green-700 font-medium">✔️ Approved</span>
                      )}
                      {app.status === "rejected" && (
                        <span className="text-red-600 font-medium">✖️ Rejected</span>
                      )}

                      <button
                        onClick={() => downloadPDF(app.student)}
                        className="bg-[#0a2243] text-white px-3 py-1 rounded hover:bg-[#163a66] transition"
                      >
                        📥 Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
