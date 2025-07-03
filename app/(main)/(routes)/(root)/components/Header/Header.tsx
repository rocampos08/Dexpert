"use client";
import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth, useUser, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import EasyReadButton from "@/components/Shared/EasyToRead/page";

export function Header() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [role, setRole] = useState<"STUDENT" | "PYME" | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/user/role?userId=${user.id}`);
        const data = await res.json();
        setRole(data.role); 
      } catch (error) {
        console.error("Failed to fetch user role", error);
      }
    };

    fetchUserRole();
  }, [user]);

  const renderNavLink = () => {
    if (!role) return null;

    if (role === "STUDENT") {
      return (
        <Link
          href="/student/projects"
          className="text-[#0A2342] cursor-pointer relative after:bg-[#2196F3] after:absolute after:h-0.5 after:rounded-full after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
        >
          List of Projects
        </Link>
      );
    }

    if (role === "PYME") {
      return (
        <>
          <EasyReadButton />
          <Link
            href="/pyme"
            className="text-[#0A2342] cursor-pointer relative after:bg-[#2196F3] after:absolute after:h-0.5 after:rounded-full after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Dashboard
        </Link> </>
      );
    }

    return null;
  };

  return (
    <header className="mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/lgo.png" alt="Dexpert" width={180} height={30} priority />
        </Link>

       
        <nav className="hidden md:flex items-center gap-6">
          {isSignedIn && renderNavLink()}

          {!isSignedIn ? (
            <>

            <EasyReadButton />
            <Link href="/sign-up">
              <Button className="bg-[#2196F3] hover:bg-blue-700 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out flex items-center gap-2">
                Sign Up
                <User className="w-4 h-4" />
              </Button>
            </Link>
            <span className="text-[#0a2342]"> | </span>
            <Link href="/sign-in">
                <Button className="bg-[#0A2342] hover:bg-[#353c5e] hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out flex items-center gap-2">
                  Sign In
                  <User className="w-4 h-4" />
                </Button>
              </Link></>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </nav>

       
        <div className="md:hidden relative">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-[#2196F3] text-white px-4 py-2 rounded-md"
          >
            <Menu className="w-4 h-5" />
          </Button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
              {isSignedIn && renderNavLink() && (
                <><Link
                  href={role === "PYME" ? "/pyme" : "/student/projects"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {role === "PYME" ? "Dashboard" : "List of Projects"}
                </Link><EasyReadButton /></>
              )}

              {!isSignedIn ? (
                <><Link
                  href="/sign-up"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link><Link
                  href="/sign-in"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                    Sign In
                  </Link>
                  <EasyReadButton /></>
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
