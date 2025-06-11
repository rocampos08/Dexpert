"use client";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import dynamic from "next/dynamic";
import Lottie from "@/app/(main)/(routes)/(root)/components/ExperienceBanner/Lottie";

const LottieAnimation = dynamic(() => import('@/app/(main)/(routes)/(root)/components/ExperienceBanner/Lottie'), {
  ssr: false, 
});

export  function ExperienceBanner() {
  
  return (
    <div className="z-20 w-full">
        <div className="z-20 grid items-center h-full p-6 py-20 md:p-0 md:grid-cols-2">
            <LottieAnimation />
            <div className="flex flex-col justify-center max-w-md">
                <h1 className="mb-2 text-2xl leading-tight text-center md:text-left
                md:text-3xl md:mb-10  text-[#0A2243]
                ">Experience is built, 
                <TypeAnimation sequence={[
                  "and we provide the bricks.",
                  1500,
                
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className=" block font-bold text-[#2196f3]"
                  
                />
                </h1>
                <p className="text-md mb-2 mx-auto md:mx-0 md:mb-8 md:text-lg text-[#2196F3]">
          Discover all the projects available so you can develop your experience 
work and thus work in the company you want and achieve your professional goals.
        </p>
                <div className="flex items-center justify-center gap-3 md:justify-start md:gap-10">
                  <Link href="/projects" className="px-3 border-[#0a2243] text-[#0a2243] py-2 transition-all border-2 cursor-pointer text-md w-fit rounded-xl hover:shadow-xl hover:shadow-[#0a2243]/50"
                  >Go to projects</Link>
                </div>

            </div>
        </div>
    </div>
  );
}