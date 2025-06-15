import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import ProjectsView from "./projectsview";
import { getStudentProjects } from "@/actions/getStudentProjects";

export default async function ProjectsPage() {
  const user = await currentUser();
  const listProjects = await getStudentProjects();

  if (!user) {
    return <p className="p-6 text-center">Not signed in</p>;
  }

  

  return (
    <div className="p-6">
      <ProjectsView title="Your Projects" projects={listProjects} />
    </div>
  );
}
