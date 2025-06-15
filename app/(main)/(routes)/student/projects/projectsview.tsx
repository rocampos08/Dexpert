"use client";

import Link from "next/link";
import { ListProjectsProps } from "./projects.types";
import { ArrowRight, CheckCircle, FileDown } from "lucide-react";
import Image from "next/image";

export default function ProjectsView(props: ListProjectsProps) {
  const { title, projects } = props;

  return (
    <div className="mt-8">
      <div className="my-4 mx-6 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-[#0a2342] flex items-center justify-center gap-2">
          {title}
          <CheckCircle className="w-5 h-5 text-blue-600" />
        </h2>

        <div className="border-b border-[#0a2342] my-4" />

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {projects.slice(0, 6).map(({ id, imageUrl, skills, title, description }) => (
              <Link
                key={id}
                href={`/student/projects/${id}`}
                className="transition-shadow hover:shadow-lg shadow-[#0a2342]/20 border border-gray-200 rounded-2xl overflow-hidden bg-white flex flex-col"
              >
                {imageUrl && (
                  <div className="relative w-full h-48">
                    <Image
                      src={imageUrl|| "/Dchoto.png"} alt="Project" 
                      
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}

                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-[#0a2342] mb-1">{title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">{description}</p>
                  {skills && (
                    <p className="text-xs text-blue-600 font-medium mt-auto">{skills}</p>
                  )}

                  <div className="mt-4 flex items-center justify-between text-sm font-medium text-blue-600">
                    <span className="flex items-center gap-1 hover:underline">
                      <ArrowRight className="w-4 h-4" />
                      Go
                    </span>
                    <FileDown className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-6">No hay proyectos aún.</p>
        )}
      </div>
    </div>
  );
}
