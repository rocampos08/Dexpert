import Link from "next/link";
import { ListProjectsProps } from "./ProjectsView.types";
import { ArrowRight, CheckCircle, FileDown } from "lucide-react";

export default function ProjectsView(props: ListProjectsProps) {
  const { title, projects } = props;

  return (
    <div className="mt-8">
      <div className="my-4 mx-6 rounded-lg p-6">
        <h2 className="text-2xl font-normal text-center text-[#0a2342] flex items-center justify-center gap-2">
          {title}
          <CheckCircle className="w-5 h-5 text-blue-600" />
        </h2>

        <div className="border-b-[1px] border-[#0a2342] py-2" />

        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-9 mt-4">
            {projects.slice(0, 6).map(({ id, imageUrl, skills, title, description, category }) => (
              <Link
                key={id}
                href={`/projects/${id}`}
                className="h-full"
              >
                <div className="min-h-[280px] bg-white rounded-xl shadow-md p-6 flex flex-col justify-between relative overflow-hidden border transition-shadow hover:shadow-lg shadow-[#0a2342]/40 ">
                  <div>
                    <h2 className="text-xl text-gray-800 font-bold mb-2">{title}</h2>
                    <p className="text-gray-600 line-clamp-4">{description}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center font-medium cursor-pointer hover:underline">
                      <ArrowRight className="mr-2 bg-blue-600 text-white rounded-full" />
                      <h1 className="text-blue-600">Go</h1>
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gray-300 rounded-tl-[100%] flex items-center justify-center">
                    <FileDown className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="">No hay</p>
        )}
      </div>
    </div>
  );
}
