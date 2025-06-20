// components/student/StudentApplications.tsx
"use client";

import { useState } from "react";

type Application = {
  id: string;
  createdAt: string; // ✅ ya es string
  project: {
    id: string;
    title: string;
    description: string | null;
    skills: string;
    pyme?: {
      name: string;
    } | null;
  };
};


export default function StudentApplications({ initialApplications }: { initialApplications: Application[] }) {
  const [applications, setApplications] = useState(initialApplications);

  const handleDelete = async (projectId: string) => {
    const res = await fetch(`/api/applications/${projectId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setApplications(applications.filter(app => app.project.id !== projectId));
    } else {
      const error = await res.json();
      alert("Error deleting application: " + error.message);
    }
  };

  if (applications.length === 0) {
    return <p className="text-center text-gray-600">You haven&rsquo;t applied to any projects yet.</p>;
  }

  return (
    <div className="grid gap-4">
      {applications.map((app) => (
        <div key={app.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-[#0A2342]">{app.project.title}</h2>
          <p className="text-gray-600 mb-2">{app.project.description || "No description"}</p>
          <p className="text-sm text-gray-500">🛠 Skills: {app.project.skills}</p>
          {app.project.pyme && (
            <p className="text-sm text-gray-500 mt-1">🏢 Pyme: {app.project.pyme.name}</p>
          )}
          <p className="text-sm text-gray-400 mt-2">
            📅 Applied on: {new Date(app.createdAt).toLocaleDateString()}
          </p>
          <button
            onClick={() => handleDelete(app.project.id)}
            className="mt-3 px-4 py-1 border border-red-500 text-[#0a2243] text-sm rounded hover:bg-red-600 hover:text-white transition-colors"
          >
            Cancel Application
          </button>
        </div>
      ))}
    </div>
  );
}
