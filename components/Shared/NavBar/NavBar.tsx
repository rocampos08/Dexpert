"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BellRing, LogIn, Search } from "lucide-react";
import EasyReadButton from "@/components/Shared/EasyToRead/page";


export function NavBar() {
  return (
    <div className="flex justify-between p-4 text-[#0A2342] bg-white h-16">
        <SidebarTrigger></SidebarTrigger>
    <div className="flex gap-4 items-center">
        
        
        <EasyReadButton />

        <Button variant="outline"> <BellRing></BellRing></Button>
        <SignedOut>
            <SignInButton>
                <Button className="bg-[#2196F3] hover:bg-[#0A2342]">
                    <LogIn/>
                    Sign In
                </Button>
            </SignInButton>
        </SignedOut>
         <SignedIn>
            <UserButton></UserButton>
         </SignedIn>
        </div>
    </div>
  )
}
