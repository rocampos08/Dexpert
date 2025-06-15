// app/(main)/(routes)/pyme/layout.tsx
import { getUserRole } from "@/lib/getUserRole";
import { redirect } from "next/navigation";

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
