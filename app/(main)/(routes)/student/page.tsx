import { currentUser } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma";


export default async function StudentPage() {
    
 
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
    hola
    
    </div>
  )
}
