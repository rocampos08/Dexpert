"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

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
  const [uploading, setUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

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

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      if (typeof base64 !== "string") return;

      try {
        setUploading(true);
        const res = await axios.post("/api/upload-image", {
          imageBase64: base64,
        });

        const imageUrl = res.data.imageUrl;
        form.setValue("logoUrl", imageUrl);
        setLogoPreview(imageUrl);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload image");
        console.error(error);
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-gray-600">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Complete your business profile</h1>
          {(["name", "contact", "description", "website", "location"] as const).map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{fieldName}</FormLabel>
                  <FormControl>
                    {fieldName === "description" ? (
                      <Textarea placeholder={`Enter ${fieldName}`} {...field} value={field.value ?? ""} />
                    ) : (
                      <Input placeholder={`Enter ${fieldName}`} {...field} value={field.value ?? ""} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Campo personalizado para logo */}
          <FormField
            control={form.control}
            name="logoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Upload Logo</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input type="file" accept="image/*" onChange={handleImageUpload} />
                    {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                    {logoPreview && (
                      <div className="mt-2">
                        <Image src={logoPreview} alt="Logo preview" width={120} height={120} className="rounded" />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-[#0a2342] text-white">
            Save information
          </Button>
        </form>
      </Form>
    </div>
  );
}