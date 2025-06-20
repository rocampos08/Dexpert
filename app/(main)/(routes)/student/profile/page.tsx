"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StudentFormValues,
  studentFormSchema,
} from "@/app/(auth)/onboarding/student/components/StudentForm/StudentForm.form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DownloadIcon, PencilIcon } from "lucide-react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

export default function StudentProfilePage() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      education: "",
      skills: "",
      language: "",
      linkedIn: "",
    },
  });

  useEffect(() => {
    fetch("/api/student/me")
      .then((res) => res.json())
      .then((data) => {
        form.reset(data);
        setLoading(false);
      });
  }, [form]);

  async function onSubmit(values: StudentFormValues) {
    console.log("Submitting form with values:", values); 
    try {
      const res = await fetch("/api/student/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Profile updated successfully");
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Something went wrong.");
    }
  }

  const handleDownloadPDF = async () => {
    if (!profileRef.current) return;

    try {
      const dataUrl = await toPng(profileRef.current);
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("student-profile.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl text-gray-800 font-bold">My Curriculum</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditing(!editing)}>
            <PencilIcon className="w-4 h-4 mr-1" />
            {editing ? "Cancel" : "Edit"}
          </Button>
          <Button onClick={handleDownloadPDF} variant="secondary">
            <DownloadIcon className="w-4 h-4 mr-1" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="p-6" ref={profileRef}>
        {editing ? (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input {...form.register("fullName")} placeholder="Full Name" />
            <Input {...form.register("email")} placeholder="Email" />
            <Input {...form.register("linkedIn")} placeholder="LinkedIn" />
            <Input {...form.register("language")} placeholder="Language" />
            <Textarea {...form.register("education")} placeholder="Education" />
            <Textarea {...form.register("skills")} placeholder="Skills" />
            <Button type="submit">Save Changes</Button>
          </form>
        ) : (
          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold">
                {form.watch("fullName")}
              </h3>
              <p className="text-gray-600">{form.watch("email")}</p>
              {form.watch("linkedIn") && (
                <a
                  href={
                    form.watch("linkedIn")?.startsWith("http")
                      ? form.watch("linkedIn")
                      : `https://${form.watch("linkedIn")}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {form.watch("linkedIn")}
                </a>
              )}
            </div>
            <div>
              <h4 className="font-semibold">Education</h4>
              <p>{form.watch("education") || "No info"}</p>
            </div>
            <div>
              <h4 className="font-semibold">Skills</h4>
              <p>{form.watch("skills") || "No info"}</p>
            </div>
            <div>
              <h4 className="font-semibold">Languages</h4>
              <p>{form.watch("language") || "No info"}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
