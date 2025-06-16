import { Project } from "@/generated/prisma"

export type ListProjectsProps = {
    title : string
    projects : Project[] | null
}
export type ProjectFilter = {
  level?: string;
  category?: string;
  skills?: string;
};

export type FilterOption = {
  label: string;
  value: string;
};

export type { Project };
