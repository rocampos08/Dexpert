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
        
        <div className="flex w-full max-w-sm items-center  rounded-lg px-2.5 py-0.5">

            <Search className="w-5 h-5 mr-2.5 "></Search>
            <Input type="searh" placeholder="search" className="w-full border-0"></Input>
        </div>
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
