"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Filters } from "./components/filters/filters";
import ProjectsView from "./components/projectsview/projectsview";

// Define el tipo del proyecto incluyendo la pyme
interface Project {
  id: string;
  title: string;
  description: string | null;
  skills: string;
  imageUrl: string | null;
  isPublished: boolean;
  level: string | null;
  category: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  pymeId: string | null;
  startDate: string | null;
  endDate: string | null;
  status: string;
  pyme: {
    name: string;
    logoUrl: string | null;
  } | null;
}

type ProjectWithDates = Omit<Project, "createdAt" | "updatedAt" | "startDate" | "endDate"> & {
  createdAt: Date;
  updatedAt: Date;
  startDate: Date | null;
  endDate: Date | null;
};

export default function ProjectsPage() {
  const { user } = useUser();

  const [allProjects, setAllProjects] = useState<ProjectWithDates[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectWithDates[]>([]);
  const [studentSkills, setStudentSkills] = useState<string[]>([]);
  const [filters, setFilters] = useState({ level: "", category: "" });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project/filters");
        const data: Project[] = await res.json();

        const projectsWithDates: ProjectWithDates[] = data.map((project) => ({
          ...project,
          createdAt: new Date(project.createdAt),
          updatedAt: new Date(project.updatedAt),
          startDate: project.startDate ? new Date(project.startDate) : null,
          endDate: project.endDate ? new Date(project.endDate) : null,
        }));

        setAllProjects(projectsWithDates);
        setFilteredProjects(projectsWithDates);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchSkills = async () => {
      try {
        const res = await fetch(`/api/student/${user.id}`);
        const data = await res.json();
        const skillsArray = data.skills
          ? data.skills.split(",").map((s: string) => s.trim())
          : [];
        setStudentSkills(skillsArray);
      } catch (err) {
        console.error("Error fetching student skills:", err);
      }
    };

    fetchSkills();
  }, [user]);

  useEffect(() => {
    let filtered = [...allProjects];

    if (filters.level) {
      filtered = filtered.filter(
        (project) =>
          project.level &&
          project.level.toLowerCase() === filters.level.toLowerCase()
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (project) =>
          project.category &&
          project.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    setFilteredProjects(filtered);
  }, [filters, allProjects]);

  const handleFilterChange = (filterName: string, filterValue: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: filterValue }));
  };

  const clearFilters = () => {
    setFilters({ level: "", category: "" });
  };

  return (
    <div className="p-6">
      <Filters
        filters={filters}
        setFilters={handleFilterChange}
        clearFilters={clearFilters}
      />
      <ProjectsView
        title="Available Projects"
        projects={filteredProjects}
        studentSkills={studentSkills}
      />
    </div>
  );
}
