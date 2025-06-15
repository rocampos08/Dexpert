"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { UploadButton } from "@/utils/uploadthing";
import PymeForm from "./components/PymeForm/PymeForm"



export default function PymeOnboardingForm() {
  const router = useRouter()

  
    
  return (
    <div>
        <PymeForm/>
    </div>
  )
}
