import { Metadata } from "next";
import { getUserRole } from "@/lib/getUserRole";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Pyme | Dexpert",
  description: "Pyme dashboard for managing projects, applicants and more",
};

export default async function PymeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getUserRole();

  if (role !== "PYME") {
    redirect("/not-authorized");
  }

  return <>{children}</>;
}
