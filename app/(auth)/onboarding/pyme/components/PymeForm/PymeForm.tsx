// components/PymeForm/PymeForm.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

import { pymeFormSchema } from "./PymeForm.form"
import { PymeFormValues } from "./PymeForm.types"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function PymeForm() {
  const router = useRouter()

  const form = useForm<PymeFormValues>({
    resolver: zodResolver(pymeFormSchema),
    defaultValues: {
      name: "",
      contact: "",
      description: "",
      website: "",
      location: "",
      logoUrl: "",
    },
  })

  const onSubmit = async (values: PymeFormValues) => {
    try {
      await axios.post("/api/pyme/onboard", values)
      toast.success("Your profile has been created successfully!")
      router.push("/pyme")
    } catch (error) {
      toast.error("Error registering the business")
      console.error(error)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {["name", "contact", "description", "website", "location", "logoUrl"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as keyof PymeFormValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{field.name}</FormLabel>
                  <FormControl>
                    {field.name === "description" ? (
                      <Textarea placeholder={`Enter ${field.name}`} {...field} />
                    ) : (
                      <Input placeholder={`Enter ${field.name}`} {...field} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="bg-[#0a2342]">
            Guardar información
          </Button>
        </form>
      </Form>
    </div>
  )
}
