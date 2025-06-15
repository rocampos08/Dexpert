import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import Image from "next/image";

export const dynamic = 'force-dynamic';

type Props = {
  params: {
    id: string;
  };
};

export default async function ProjectDetailPage({ params }: Props) {
  const user = await currentUser();
  const id = params.id;

  if (!user) {
    return <p className="p-6 text-center">No has iniciado sesión</p>;
  }

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      pyme: true,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl text-[#0a2243] font-bold">{project.title}</h1>

      {project.imageUrl && (
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-64 object-cover rounded-xl"
        />
      )}

      <div className="space-y-2">
        <p className="text-[#2196F3]">
          <span className="font-semibold text-[#0a2243]">Description:</span><br />
          {project.description || "No description available."}
        </p>
        <p>
          <span className="font-semibold text-[#2196F3]">Skills required:</span> {project.skills}
        </p>
        {project.category && (
          <p>
            <span className="font-semibold text-[#2196F3]">Category:</span> {project.category}
          </p>
        )}
        {project.level &&(
            <p>
                <span className="font-semibold text-[#2196F3]">Level:</span> {project.level}
            </p>
        )}
        
      </div>

      {project.pyme && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl text-gray-800 font-semibold mb-4">Publish by:</h2>
          <div className="flex items-center gap-4">
            {project.pyme.logoUrl ? (
              <Image
                src={project.pyme.logoUrl}
                alt={project.pyme.name}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Hello!
              </div>
            )}
            <div>
              <p className="text-lg text-gray-800 font-bold">{project.pyme.name}</p>
              <p className="text-sm text-gray-600">{project.pyme.contact}</p>
              {project.pyme.website && (
                <a
                  href={project.pyme.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {project.pyme.website}
                </a>
              )}
              {project.pyme.location && (
                <p className="text-sm text-gray-500">{project.pyme.location}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {project.pyme.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
