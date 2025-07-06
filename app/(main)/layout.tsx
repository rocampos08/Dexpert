import type { Metadata } from "next";

import "../globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./(routes)/(root)/components";
import { Footer, NavBar } from "@/components/Shared";
import { Toaster } from "@/components/ui/sonner";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Dexpert",
  description: "Role profile management and dashboard",
  icons:{
    icon: {
    url: "/icon.png",
    type: "image/png",
  },
  }
};

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = (await headers()).get("x-pathname") || "";
  const hideLayout = pathname.startsWith("/terms") || pathname.startsWith("/privacy");

  if (hideLayout) {
    // Renderizar SOLO contenido sin sidebar, navbar, footer
    return (
      <ClerkProvider>
        <main className="font-sans bg-gradient-to-br from-[#E3F2FD] via-white to-[#BBDEFB] min-h-screen">
          {children}
        </main>
      </ClerkProvider>
    );
  }

  // Layout completo con sidebar, navbar, footer
  return (
    <ClerkProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full bg-stone-100 flex flex-col min-h-screen font-sans">
          <NavBar />
          <main className="flex-1">{children}</main>
          <Toaster />
          <Footer />
        </div>
      </SidebarProvider>
    </ClerkProvider>
  );
}
