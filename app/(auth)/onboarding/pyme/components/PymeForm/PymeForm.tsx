"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { pymeFormSchema } from "./PymeForm.form";
import { PymeFormValues } from "./PymeForm.types";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PymeForm() {
  const router = useRouter();

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
  });

  
  const onSubmit = async (values: PymeFormValues) => {
    
    try {
      console.log("Sending cleaned values:", values);
      await axios.post("/api/pyme/onboard", values);
      toast.success("Your business profile was created successfully! 🎉");
      router.push("/pyme");
    } catch (err: any) {
      const backendMsg = err.response?.data?.error;
      if (backendMsg === "Already onboarded") {
        toast.error("A pyme for this user already exists.");
      } else {
        toast.error(backendMsg || "Error registering the business.");
      }
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-gray-600">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Complete your business profile</h1>
          {(
            [
              "name",
              "contact",
              "description",
              "website",
              "location",
              "logoUrl",
            ] as const
          ).map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{fieldName}</FormLabel>
                  <FormControl>
                    {fieldName === "description" ? (
                      <Textarea
                        placeholder={`Enter ${fieldName}`}
                        {...field}
                        value={field.value ?? ""}
                      />
                    ) : (
                      <Input placeholder={`Enter ${fieldName}`} {...field} value={field.value ?? ""} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="bg-[#0a2342] text-white">
            Save information
          </Button>
        </form>
      </Form>
    </div>
  );
}
