"use client"
import { FileImage, PenBoxIcon } from "lucide-react";
import TitleBlock from "../TitleBlock/TitleBlock";
import { ProjectImageProps } from "./ProjectImage.types";
import { useState, useRef } from "react"; // Import useRef
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

export default function ProjectImage(props: ProjectImageProps) {
  const { idProject, imageProject } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(imageProject);
  const [isUploading, setIsUploading] = useState(false); // To manage upload state
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

  const onChangeImage = async (imageUrl: string) => {
    try {
      await axios.patch(`/api/project/${idProject}`, {
        imageUrl: imageUrl,
      });
      toast.success("Image updated successfully");
    } catch (error) {
      console.error("Error updating project image:", error);
      toast.error("Error al actualizar la imagen del proyecto.");
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64data = reader.result;
      try {
        // Send the base64 image to your own API endpoint
        const response = await axios.post("/api/upload-image", {
          imageBase64: base64data,
        });

        const newImageUrl = response.data.imageUrl;
        await onChangeImage(newImageUrl); // Update the project with the new Cloudinary URL
        setImage(newImageUrl);
        setIsEditing(false);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading to Cloudinary via API:", error);
        toast.error("Error al subir la imagen.");
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 rounded-lg bg-white h-fit">
      <TitleBlock title="Project Image" icon={FileImage} />
      {isEditing ? (
        <div className="bg-slate-300 p-4 mt-2 rounded-lg flex flex-col items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden" // Hide the default input
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? "Uploading..." : "Select Image"}
          </Button>
          {isUploading && <p className="mt-2 text-sm text-gray-600">Please wait while the image uploads...</p>}
        </div>
      ) : (
        <Image
          src={image || "/lgo.png"}
          alt="Project"
          className="w-full h-full rounded-lg"
          width={500}
          height={250}
        />
      )}
      <Button
        className="w-full mt-4 text-gray-700"
        variant={"outline"}
        size={"sm"}
        onClick={() => setIsEditing(!isEditing)}
        disabled={isUploading} // Disable while uploading
      >
        <PenBoxIcon className="w-4 h-4 text-[#2196f3]" />
        {isEditing ? "Cancel" : "Edit image"}
      </Button>
    </div>
  );
}