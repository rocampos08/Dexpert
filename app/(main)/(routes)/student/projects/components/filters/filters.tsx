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
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Filters(props: FiltersProps) {
  const { filters, setFilters, clearFilters } = props;

  const handleFilter = (filter: string, value: string) => {
    setFilters(filter, value);
  };

  return (
    <div className="mt-5 mb-8 gap-x-4 flex flex-wrap">
      <Select
      
        value={filters.level}
        onValueChange={(value) => handleFilter("level", value)} 
      >
        <SelectTrigger className="w-[180px] text-gray-500">
          <SelectValue placeholder="Select Level" />
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

      <Select
        value={filters.category}
        onValueChange={(value) => handleFilter("category", value)}
      >
        <SelectTrigger className="w-[220px] text-gray-500">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            <SelectItem value="frontend">Frontend Development</SelectItem>
            <SelectItem value="backend">Backend Development</SelectItem>
            <SelectItem value="fullstack">Fullstack Development</SelectItem>
            <SelectItem value="ui-ux">UI/UX Design</SelectItem>
            <SelectItem value="mobile">Mobile App Development</SelectItem>
            <SelectItem value="marketing">Digital Marketing</SelectItem>
            <SelectItem value="seo">SEO Optimization</SelectItem>
            <SelectItem value="data-analysis">Data Analysis</SelectItem>
            <SelectItem value="machine-learning">Machine Learning</SelectItem>
            <SelectItem value="content-creation">Content Creation</SelectItem>
            <SelectItem value="video-editing">Video Editing</SelectItem>
            <SelectItem value="graphic-design">Graphic Design</SelectItem>
            <SelectItem value="sales">Sales & Lead Generation</SelectItem>
            <SelectItem value="customer-support">Customer Support</SelectItem>
            <SelectItem value="project-management">Project Management</SelectItem>
            <SelectItem value="copywriting">Copywriting</SelectItem>
            <SelectItem value="translation">Translation & Localization</SelectItem>
            <SelectItem value="community-management">Community Management</SelectItem>
            <SelectItem value="game-dev">Game Development</SelectItem>
            <SelectItem value="no-code">No-Code Tools (Webflow, Bubble)</SelectItem>
            <SelectItem value="wordpress">WordPress / CMS</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={clearFilters} className="ml-4 bg-red-600 hover:bg-red-700 text-white">
        <Trash className="mr-2 h-4 w-4" />
        Clear Filters
      </Button>
    </div>
  );
}
