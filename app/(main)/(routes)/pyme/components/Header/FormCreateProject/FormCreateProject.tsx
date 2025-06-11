'use client'

import axios from 'axios';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./FormCreateProject.form"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function FormCreateProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      projectName: "",
      description: "",
      skills: ""
    },
  })

  const { setValue, watch } = form

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/project", values)
      toast("Project created successfully")
      router.push(`/pyme/${res.data.id}`);
    } catch (error) {
      console.error(error)
    }
  }

  const generateIdea = async () => {
    const rawPrompt = watch('prompt')
    const prompt = rawPrompt?.trim() || ""

    if (!prompt) {
      alert("Please write a prompt first.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/GenerateIdea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()

      if (data.title && data.description) {
        setValue('projectName', data.title)
        setValue('description', data.description)
        setValue('skills', data.skills)
      } else {
        alert('Idea generation failed. Try another prompt.')
      }
    } catch (err) {
      console.error(err)
      alert('Error contacting the Product Owner.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">

        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0A2342]">Project Name</FormLabel>
              <FormControl>
                <Input
                  className="text-gray-800" // o usa text-[#0A2342]
                  placeholder="E-commerce"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0A2342]">Description</FormLabel>
              <FormControl>
                <Input
                  className="text-gray-800"
                  placeholder="My project is about..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0A2342]">Required Skills</FormLabel>
              <FormControl>
                <Input
                  className="text-gray-800"
                  placeholder="React, UX, etc."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0A2342]">Write your idea or need for the AI</FormLabel>
              <FormControl>
                <Input
                  className="text-gray-800"
                  placeholder="e.g. I want an idea for a dessert business"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Button
                type="button"
                variant="link"
                className="text-blue-600 p-0 text-sm"
                onClick={generateIdea}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate with Product Owner AI"}
              </Button>
            </FormItem>
          )}
        />

        <Button
          className="bg-[#2196F3] hover:bg-[#0A2342] text-white"
          type="submit"
        >
          Publish Project
        </Button>
      </form>
    </Form>
  )
}
