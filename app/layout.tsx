// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Dexpert",
  description: "A platform to showcase your projects and skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ClerkProvider>
          <div className="bg-gradient-to-br from-[#E3F2FD] via-white to-[#BBDEFB] min-h-screen">
            <main>{children}</main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
