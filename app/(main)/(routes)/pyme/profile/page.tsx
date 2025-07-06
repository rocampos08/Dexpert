"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pymeFormSchema } from "@/app/(auth)/onboarding/pyme/components/PymeForm/PymeForm.form";
import { PymeFormValues } from "@/app/(auth)/onboarding/pyme/components/PymeForm/PymeForm.types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner"; // Cambia si usas otra librería de notificaciones

export default function PymeProfilePage() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

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
      toast.success("Profile updated");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  }

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

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  const logoUrl = form.watch("logoUrl");
  const isValidUrl =
    typeof logoUrl === "string" &&
    logoUrl.length > 0 &&
    /^https?:\/\/.+\..+/.test(logoUrl);

  const finalLogoSrc = isValidUrl ? logoUrl : "/lgo.png";

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
              <Input
                id="website"
                {...form.register("website")}
                placeholder="https://yourcompany.com"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...form.register("location")} placeholder="City, Country" />
            </div>

            {/* Subida de imagen */}
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-zinc-100 file:text-zinc-700
                  hover:file:bg-zinc-200"
              />
              {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}

              <div className="flex justify-center">
                <Image
                  src={finalLogoSrc}
                  alt="Logo preview"
                  width={96}
                  height={96}
                  className="h-24 object-contain border rounded-lg"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-zinc-800 transition-all"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
