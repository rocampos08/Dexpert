"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 min-h-screen">
      <h1 className="font-semibold text-[#0A2342] text-4xl">Welcome!</h1>
      <p className="text-xl text-gray-600">Please sign in to continue</p>
      <SignIn
        redirectUrl="/auth/check-role" 
        
        
      />
    </div>
  );
}
