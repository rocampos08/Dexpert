import { Project } from "@/generated/prisma"

export type ListProjectsProps = {
    title : string
    projects : Project[] | null
}