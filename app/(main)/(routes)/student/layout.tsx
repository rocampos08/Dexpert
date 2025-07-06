import type { Metadata } from "next";
import { getUserRole } from "@/lib/getUserRole";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Student | Dexpert",
  description: "Student dashboard for managing projects and skills",
};

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getUserRole();

  if (role !== "STUDENT") {
    redirect("/not-authorized");
  }

  return <>{children}</>;
}
