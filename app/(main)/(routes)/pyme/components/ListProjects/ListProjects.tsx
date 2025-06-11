
import { ListProjectsProps } from './ListProjects.types'
import { ProjectCard } from './ProjectCard';

export default function ListProjects(props: ListProjectsProps) {
  const {projects} = props;
  if (projects.length === 0){
    <p>Add your first project</p>
  }
  return (
  <div className='flex flex-col my-4 mx-6 border rounded-lg bg-white p-4 gap-10'><div className=' text-center text-gray-500'>List of Projects</div>
  {projects.map((project)=>(
    <div key={project.id} className='text-[#0A2342]'>
      <ProjectCard project={project}></ProjectCard>

      <div className='border-t border-gray-200 w-full mt-4'/>
    </div>
  ))}
  </div>
  )
}
