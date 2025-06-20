





import { ExperienceBanner, Footer, Header,Faq,Guide,Plans,CallToAction,Testimony, Aboutus } from "./(main)/(routes)/(root)/components";





import { getHomeProjects } from "@/actions/getHomeProjects";
import ProjectsView from "./(main)/(routes)/(root)/components/ProjectsView/ProjectsView";




export default async function Home() {
  const listProjects = await getHomeProjects();


  return (
    <div>
      
      <Header/>

      <ExperienceBanner/>
      <Aboutus/>

      <Guide/>

      <ProjectsView title="Our available projects" projects={listProjects}/>
      <Plans/>
      <Testimony/>
      <Faq/>
      <CallToAction/>
      <Footer/>




    </div>
  );
}
