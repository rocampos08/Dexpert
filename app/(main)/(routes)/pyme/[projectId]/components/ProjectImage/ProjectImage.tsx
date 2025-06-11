"use client"
import { FileImage, PenBoxIcon } from "lucide-react";
import TitleBlock from "../TitleBlock/TitleBlock";
import { ProjectImageProps } from "./ProjectImage.types";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { log } from "console";
import axios from "axios";


export default function ProjectImage(props: ProjectImageProps) {
  const {idProject, imageProject} = props;
  const [isEditing, setIsEditing] = useState(false)
  const [image, setImage] = useState(imageProject)
  const onChangeImage = async (imageUrl: string) =>{
    console.log(imageUrl)
    try {
        axios.patch(`/api/project/${idProject}`,{
        imageUrl: imageUrl,
    });
    toast.success("Image updated successfully")
    } catch  {
       toast.error("Ups") 
    }
  }

    return (
    <div className="p-4 rounded-lg bg-white h-fit">
        <TitleBlock title="Project Image" icon={FileImage}/>
        {isEditing?(
            <div className="bg-slate-300 p-4 mt-2 rounded-lg">
            <UploadButton endpoint="imageUploader"
            onClientUploadComplete={(res) =>{
                onChangeImage(res[0]?.ufsUrl)
                setImage(res[0]?.ufsUrl)
                setIsEditing(false)
            }}
            onUploadError={()=>{
                toast.error("Ups")
            }}
            
            />
            </div>
        ):(
    
        <Image src={image || "/Dchoto.png" } alt="Project" className="w-full h-full rounded-lg " width={500} height={250}/>
        )}
        <Button className="w-full mt-4 text-gray-700 " variant={"outline"} size={"sm"} 
        onClick={()=> setIsEditing(!isEditing)}
        
        ><PenBoxIcon className="w-4 h-4 text-[#2196f3]"/>
        Edit image</Button>
    </div>
  )
}
