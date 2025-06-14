"use client";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs"; 
import { useState } from "react";

export function Header() {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/download.webp" alt="Dchoto" width={180} height={30} priority />
        </Link>

        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/projects" 
            className="text-[#0A2342] cursor-pointer relative after:bg-[#2196F3] after:absolute after:h-0.5 after:rounded-full after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
          >
            List of projects
          </Link>

          {!isSignedIn ? (
            <Link href="/sign-up">
              <Button className="bg-[#2196F3] hover:bg-[#0A2342] cursor-pointer flex items-center gap-2">
                Sign Up
                <User className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </nav>

        
        <div className="md:hidden relative">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-[#2196F3] text-white px-4 py-2 rounded-md"
          >
            <Menu className="w-4 h-5"/>
          </Button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
              <Link
                href="/projects"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                List of projects
              </Link>

              {!isSignedIn ? (
                <Link
                  href="/sign-up"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              ) : (
                <div className="px-4 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
