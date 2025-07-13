import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiltersProps } from "./filters.types";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Filters(props: FiltersProps) {
  const { filters, setFilters, clearFilters } = props;

  const handleFilter = (filter: string, value: string) => {
    setFilters(filter, value);
  };

  return (
    <div className="mt-6 mb-8 flex flex-col md:flex-row flex-wrap gap-4 items-end">
      {/* Level Filter */}
      <div className="flex flex-col space-y-1 w-full sm:w-[220px]">
        <label className="text-sm font-medium text-gray-700">Level</label>
        <Select
          value={filters.level}
          onValueChange={(value) => handleFilter("level", value)}
        >
          <SelectTrigger className="w-full bg-white text-gray-700 shadow-sm border-gray-300">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Level</SelectLabel>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="open-to-all">Open to All</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Category Filter */}
      <div className="flex flex-col space-y-1 w-full sm:w-[260px]">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <Select
          value={filters.category}
          onValueChange={(value) => handleFilter("category", value)}
        >
          <SelectTrigger className="w-full bg-white text-gray-700 shadow-sm border-gray-300">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {[
                { value: "frontend", label: "Frontend Development" },
                { value: "backend", label: "Backend Development" },
                { value: "fullstack", label: "Fullstack Development" },
                { value: "ui-ux", label: "UI/UX Design" },
                { value: "mobile", label: "Mobile App Development" },
                { value: "marketing", label: "Digital Marketing" },
                { value: "seo", label: "SEO Optimization" },
                { value: "data-analysis", label: "Data Analysis" },
                { value: "machine-learning", label: "Machine Learning" },
                { value: "content-creation", label: "Content Creation" },
                { value: "video-editing", label: "Video Editing" },
                { value: "graphic-design", label: "Graphic Design" },
                { value: "sales", label: "Sales & Lead Generation" },
                { value: "customer-support", label: "Customer Support" },
                { value: "project-management", label: "Project Management" },
                { value: "copywriting", label: "Copywriting" },
                { value: "translation", label: "Translation & Localization" },
                { value: "community-management", label: "Community Management" },
                { value: "game-dev", label: "Game Development" },
                { value: "no-code", label: "No-Code Tools" },
                { value: "wordpress", label: "WordPress / CMS" },
              ].map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters Button */}
      <div className="w-full sm:w-auto">
        <Button
          variant="destructive"
          onClick={clearFilters}
          className="w-full sm:w-auto"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
