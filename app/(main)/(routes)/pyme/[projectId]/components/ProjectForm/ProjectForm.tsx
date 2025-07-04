"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "./ProjectForm.form"
import { Cog, Loader2 } from "lucide-react"
import TitleBlock from "../TitleBlock/TitleBlock"
import { ProjectFormProps } from "./ProjectForm.types"
import axios from "axios"
import { toast } from "sonner"

export default function ProjectForm({ project }: ProjectFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project.title || "",
      description: project.description || "",
      category: project.category || "",
      level: project.level || "",
      skills: project.skills || "",
      startDate: project.startDate
        ? typeof project.startDate === "string"
          ? project.startDate
          : project.startDate.toISOString().slice(0, 10)
        : "",
      endDate: project.endDate
        ? typeof project.endDate === "string"
          ? project.endDate
          : project.endDate.toISOString().slice(0, 10)
        : "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/project/${project.id}`, values)
      toast.success("Project updated successfully")
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong")
    }
  }

  return (
    <div className="p-6 bg-white rounded-md">
      <TitleBlock title="Project Configuration" icon={Cog} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Project title</FormLabel>
                  <FormControl>
                    <Input className="text-gray-500" placeholder="Mr.Cookies" {...field} />
                  </FormControl>
                  <FormDescription>This is what the user will see as the project title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Project skills</FormLabel>
                  <FormControl>
                    <Input className="text-gray-500" placeholder="JavaScript, React" {...field} />
                  </FormControl>
                  <FormDescription>This is what the user will see as the project skills.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-gray-700">Project description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about your project"
                      className="resize-none text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is what the user will see as the project description.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the level of your project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-gray-500">
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="open-to-all">Open to all levels</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the category of your project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-gray-700">
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
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Project start date</FormLabel>
                  <FormControl>
                    <Input className="text-gray-500" type="date" {...field} />
                  </FormControl>
                  <FormDescription>This is what the user will see as the project start date.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Project end date</FormLabel>
                  <FormControl>
                    <Input className="text-gray-500" type="date" {...field} />
                  </FormControl>
                  <FormDescription>This is what the user will see as the project end date.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="bg-[#0a2342]"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save basic information"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
