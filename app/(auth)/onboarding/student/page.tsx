"use client"


import { useRouter } from "next/navigation"

import StudentForm from "./components/StudentForm/StudentForm"



export default function StudentOnboardingForm() {
  const router = useRouter()

  
    
  return (
    <div>
        <StudentForm/>
    </div>
  )
}
