
import type { Metadata } from "next";

import "../globals.css" 
import { ClerkProvider } from '@clerk/nextjs' 
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./(routes)/(root)/components"; 
import { Footer, NavBar } from "@/components/Shared";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "Dashboard", 
  description: "Role profile management and dashboard",
};

export default function MainLayout({ // Renamed from RootLayout to avoid confusion
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <SidebarProvider>
      <AppSidebar /> 
      <div className="w-full bg-stone-100 flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-1">
          {children}
        </main>
        <Toaster />
        <Footer />
      </div>
    </SidebarProvider>
  );
}