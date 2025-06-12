import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ExploreProjects } from "./(main)/(routes)/(root)/components/ExploreProjects";
import { ExperienceBanner, Faq, Header } from "./(main)/(routes)/(root)/components";
import CoverParticles from "./(main)/(routes)/(root)/components/ExperienceBanner/CoverParticles";
import { getHomeProjects } from "@/actions/getHomeProjects";
import ProjectsView from "./(main)/(routes)/(root)/components/ProjectsView/ProjectsView";
import { Guide } from "./(main)/(routes)/(root)/components";
import { CallToAction } from "./(main)/(routes)/(root)/components/CallToAction";


export default async function Home() {
  const listProjects = await getHomeProjects();


  return (
    <div>
      
      <Header/>
      <ExperienceBanner/>
      <ProjectsView title="Our available projects" projects={listProjects}/>

      <Guide/>
      <Faq/>
      <CallToAction/>

    </div>
  );
}
