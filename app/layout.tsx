
import type { Metadata } from "next";
import {  Space_Grotesk } from "next/font/google";
import "./globals.css"
import {
  ClerkProvider,
} from '@clerk/nextjs'


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Dexpert",
  description: "A platform to showcase your projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceGrotesk.className}  `}
      
      >
        <div className=" bg-gradient-to-br from-[#E3F2FD] via-white to-[#BBDEFB]">
            <main >
        {children} 
        </main>
        </div>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
