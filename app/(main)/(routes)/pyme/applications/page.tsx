import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import ApplicationsClient from "./applicationClient";

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

  return <ApplicationsClient projects={pyme.projects} />;
}
