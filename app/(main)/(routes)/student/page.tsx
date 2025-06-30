import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import StudentApplications from "./components/studentApplications";

export default async function StudentPage() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>You must be signed in to see your applications.</p>
      </div>
    );
  }

  const userProfile = await prisma.userProfile.findUnique({
    where: { userId: user.id },
  });

  if (!userProfile) {
    return <div className="p-6 text-center text-gray-600"><p>No user profile found.</p></div>;
  }

  const student = await prisma.student.findUnique({
    where: { userId: userProfile.id },
    include: {
      applications: {
        include: {
          project: {
            include: { pyme: true },
          },
        },
      },
    },
  });

  if (!student) {
    return <div className="p-6 text-center text-gray-600"><p>No student profile found.</p></div>;
  }

  // Serializar fechas (Date -> string) para poder usarlas en componentes cliente
  const serializedApplications = student.applications.map((app) => ({
    ...app,
    createdAt: app.createdAt.toISOString(),
    status: app.status as "pending" | "approved" | "rejected",
    project: {
      ...app.project,
      pyme: app.project.pyme ?? null,
    },
  }));

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-[#0A2342] mb-6">Projects You&rsquo;ve Applied To</h1>
      <StudentApplications initialApplications={serializedApplications} />
    </div>
  );
}
