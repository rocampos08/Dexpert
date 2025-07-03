import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Share2} from "lucide-react";

import { ApplyProjectButton } from "./ApplyProjectButton";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ProjectDetailPage({ params }: Props) {
  const user = await currentUser();
  const id = params.id;

  if (!user) {
    return <p className="p-6 text-center text-gray-600">Please log in to view this project.</p>;
  }

  const project = await prisma.project.findUnique({
    where: { id },
    include: { pyme: true },
  });

  if (!project) notFound();

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 bg-white rounded-xl shadow-lg animate-fade-in">
      
      <div>
        <h1 className="text-4xl font-extrabold text-[#0a2243] tracking-tight mb-4">
          {project.title}
        </h1>

        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={1000}
            height={600}
            className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-md"
          />
        )}
      </div>

      
      <div className="grid gap-6 sm:grid-cols-2 text-gray-800">
        <div>
          <h2 className="text-lg font-semibold text-[#2196F3]">Description</h2>
          <p className="mt-1 text-sm leading-relaxed">
            {project.description || "No description available."}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#2196F3]">Skills Required</h2>
          <p className="mt-1 text-sm">{project.skills}</p>
        </div>

        {project.category && (
          <div>
            <h2 className="text-lg font-semibold text-[#2196F3]">Category</h2>
            <p className="mt-1 text-sm">{project.category}</p>
          </div>
        )}

        {project.level && (
          <div>
            <h2 className="text-lg font-semibold text-[#2196F3]">Level</h2>
            <p className="mt-1 text-sm">{project.level}</p>
          </div>
        )}
        {project.startDate && (
          <div>
            <h2 className="text-lg font-semibold text-green-500">Start Date</h2>
            <p className="mt-1 text-sm ">{project.startDate instanceof Date ? project.startDate.toLocaleDateString() : project.startDate}</p>
          </div>
        )}
        {project.endDate && (
          <div>
            <h2 className="text-lg font-semibold text-red-500">End Date</h2>
            <p className="mt-1 text-sm ">{project.endDate instanceof Date ? project.endDate.toLocaleDateString() : project.endDate}</p>
          </div>
        )}
      </div>

      
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <ApplyProjectButton projectId={project.id} />

        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" /> Share
        </Button>
      </div>

      
      {project.pyme && (
        <div className="pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Published by</h2>
          <div className="flex items-start sm:items-center gap-4">
            {project.pyme.logoUrl ? (
              <Image
                src={project.pyme.logoUrl}
                alt={project.pyme.name}
                width={72}
                height={72}
                className="rounded-full object-cover border shadow-sm"
              />
            ) : (
              <div className="w-18 h-18 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
                Logo
              </div>
            )}

            <div>
              <p className="text-lg font-bold text-gray-900">{project.pyme.name}</p>
              <p className="text-sm text-gray-600">{project.pyme.contact}</p>
              {project.pyme.website && (
                <a
                  href={project.pyme.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline block"
                >
                  {project.pyme.website}
                </a>
              )}
              {project.pyme.location && (
                <p className="text-sm text-gray-500">{project.pyme.location}</p>
              )}
              {project.pyme.description && (
                <p className="text-sm text-gray-500 mt-1">{project.pyme.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
