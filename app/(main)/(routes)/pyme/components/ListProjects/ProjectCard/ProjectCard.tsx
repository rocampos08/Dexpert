'use client'
import Image from "next/image";
import { ProjectCardProps } from "./ProjectCard.types";
import { Target } from "lucide-react";
import Actions from "./Actions/Actions";


export function ProjectCard(props:ProjectCardProps) {
  const {project} = props;
  const {id, title,description,skills, imageUrl,status} = project
    return (
    <div className="relative">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col lg:flex-row gap-4 items-start">
            <Image src={imageUrl|| "/Dchoto.png"} alt="Project" width={150} height={150} 
            className="rounded-md max-w-52"/>
            <div>
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-medium">{title}</h2>
                    {project.isPublished?
                        <span className=" inline-block bg-emerald-100 text-emerald-600 text-xs font-medium px-2 py-1 rounded-md mt-1">Published :</span>: 
                        <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-md mt-1">Not pusblished </span>
                    }
                </div>
                <p className="text-gray-600 w-full max-w-lg line-clamp-3 text-sm">{description}</p>
                <h1 className="text-gray-800 w-full max-w-lg text-sm flex items-center">
                 <Target className="w-4 h-4 text-gray-800 mr-1" />
                 Skills:
                </h1>

            <ul className="list-disc list-inside mt-1 text-gray-700 text-sm">
            {skills.split(",").map((skill, index) => (
            <li key={index}>{skill.trim()}</li>
                ))}
            </ul>
            </div>
        </div>
        <Actions projectId={id} projectStatus={status}></Actions>
        </div>
        </div>
  )
}
