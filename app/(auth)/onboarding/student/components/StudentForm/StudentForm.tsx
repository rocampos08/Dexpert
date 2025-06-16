"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { studentFormSchema, StudentFormValues } from "./StudentForm.form";

export default function StudentForm() {
  const router = useRouter();

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
  });

  async function onSubmit(values: StudentFormValues) {
    try {
      const res = await fetch("/api/student/onboard", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to save profile");
      router.push("/student/dashboard");
    } catch (error) {
      console.error(error);
      alert("Error saving profile");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 max-w-xl text-gray-500 mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Complete your student profile</h1>
      <Input {...form.register("fullName")} placeholder="Full Name" />
      {form.formState.errors.fullName && (
        <p className="text-red-600 text-sm">{form.formState.errors.fullName.message}</p>
      )}

      <Input {...form.register("email")} placeholder="Email" type="email" />
      {form.formState.errors.email && (
        <p className="text-red-600 text-sm">{form.formState.errors.email.message}</p>
      )}

      <Textarea {...form.register("education")} placeholder="Education (optional)" />
      <Textarea {...form.register("skills")} placeholder="Skills" />
      <Input {...form.register("language")} placeholder="Language" />
      <Input {...form.register("linkedIn")} placeholder="LinkedIn Profile URL" />
      <Button type="submit">Save Profile</Button>
    </form>
  );
}
