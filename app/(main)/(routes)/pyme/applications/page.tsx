import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ApplicationsPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-gray-600 text-lg">You must be logged in.</p>
      </div>
    );
  }

  const pyme = await prisma.pyme.findUnique({
    where: { userId: user.id },
    include: {
      projects: {
        include: {
          applications: {
            include: {
              student: true,
            },
          },
        },
      },
    },
  });

  if (!pyme) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-gray-600 text-lg">No Pyme found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#0a2243] mb-8 text-center">📄 Applications to your Projects</h1>

      {pyme.projects.map((project) => (
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
                      <span className="font-medium text-[#0a2243]">💼 Experience:</span> {app.student.experience || "N/A"}
                    </p>
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
