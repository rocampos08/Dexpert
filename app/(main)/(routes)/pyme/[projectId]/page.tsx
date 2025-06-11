import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import HeaderProject from "./components/HeaderProject/HeaderProject";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ProjectImage from "./components/ProjectImage/ProjectImage";

export default async function Projectage({params}: {params: Promise<{projectId: string}>}) {
  const {projectId} = await params;
  const {userId} = await auth();
  if(!userId){
    return <p>Unautorized</p>
  }
  const project = await prisma.project.findUnique({
    where:{
        id: projectId,
        userId: userId,
    },
    
  })
  if (!project){
     return <p>Not found</p>
  }
    return (
    <div className="m-6">
        <HeaderProject idProject={projectId} isPublished={project.isPublished}/>
        <ProjectForm project={project}/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <ProjectImage idProject={project.id} imageProject={project.imageUrl}/>
        </div>
    </div>
  )
}
