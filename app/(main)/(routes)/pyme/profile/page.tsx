"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pymeFormSchema } from "@/app/(auth)/onboarding/pyme/components/PymeForm/PymeForm.form";
import { PymeFormValues } from "@/app/(auth)/onboarding/pyme/components/PymeForm/PymeForm.types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/utils/uploadthing"; 
import Image from "next/image";

export default function PymeProfilePage() {
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function loadPyme() {
      try {
        const res = await fetch("/api/pyme/me");
        const data = await res.json();
        console.log("Loaded pyme data:", data);
        form.reset(data);
      } catch (err) {
        console.error("Failed to load pyme data", err);
      } finally {
        setLoading(false);
      }
    }
    loadPyme();
  }, [form]);

  async function onSubmit(values: PymeFormValues) {
    try {
      const res = await fetch("/api/pyme/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      alert("Profile updated");
    } catch (err) {
      alert("Failed to update profile");
    }
  }

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <Card className="shadow-2xl border rounded-2xl">
        <CardContent className="space-y-6 p-6">
          <h2 className="text-3xl font-bold text-center">Your Business Profile</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register("name")} placeholder="Business name" />
            </div>

            <div>
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" {...form.register("contact")} placeholder="Email or phone" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                placeholder="What does your business do?"
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" {...form.register("website")} placeholder="https://yourcompany.com" />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...form.register("location")} placeholder="City, Country" />
            </div>

            <div className="space-y-2">
              <Label>Company Logo</Label>

              {form.watch("logoUrl") && (
                <Image
                  src={form.watch("logoUrl") || "/placeholder-logo.png"}
                  alt="Logo preview"
                  className="h-24 object-contain border rounded-lg mx-auto"
                  width={96}
                  height={96}
                />
              )}

              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0].url) {
                    form.setValue("logoUrl", res[0].url, { shouldValidate: true });
                  }
                }}
                onUploadError={(error) => {
                  console.error("Upload error:", error);
                  alert("Failed to upload logo");
                }}
              />
            </div>

            <Button type="submit" className="w-full bg-black text-white hover:bg-zinc-800 transition-all">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
