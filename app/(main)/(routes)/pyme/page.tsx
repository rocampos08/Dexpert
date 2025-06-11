import { currentUser } from "@clerk/nextjs/server"
import { Header } from "./components";
import prisma from "@/lib/prisma";
import ListProjects from "./components/ListProjects/ListProjects";

export default async function PymePage() {
    const user = await currentUser();
    if(!user){
        <p>Not signed in</p>
    }
    const projects = await prisma.project.findMany({
      where: {
        userId : user?.id,
      }
    })
    console.log(projects)
  return (
    <div>
    <Header/>
    <ListProjects projects={projects}/>
    </div>
  )
}
