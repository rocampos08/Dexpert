import { Project } from "@/generated/prisma"

export type ListProjectsProps = {
    title : string
    projects : Project[] | undefined
}

export type ProjectDetailsProps = {
  params: {
    id: string;
  };
};

