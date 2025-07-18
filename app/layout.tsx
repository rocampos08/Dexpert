// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata: Metadata = {
  title: "Dexpert",
  description: "A platform to showcase your projects and skills",
  icons:{
    icon: {
    url: "/icon.png",
    type: "image/png",
  },
  }
};

import {Space_Grotesk, Manrope, Plus_Jakarta_Sans} from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta', // útil si usas Tailwind
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased`}>
        <ClerkProvider>
          <div className="bg-gradient-to-br from-[#E3F2FD] via-white to-[#BBDEFB] min-h-screen">
            <main>{children}</main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
