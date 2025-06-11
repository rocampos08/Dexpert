"use client"

import React, { useState } from 'react'
import { HeaderProjectProps } from './HeaderProject.types'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, MoveLeft, Trash } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export default function HeaderProject(props: HeaderProjectProps) {
  const { idProject, isPublished } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onPublish = async (state: boolean) => {
    setIsLoading(true);
    try {
      await axios.patch(`/api/project/${idProject}`, {
        isPublished: state,
      });

      toast.success(state ? "Project published" : "Project hidden");
      router.refresh();
    } catch (error: any) {
      console.error("Publish error:", error);
      toast.error(error?.response?.data?.message || "Error publishing project");
    } finally {
      setIsLoading(false);
    }
  };

  const removeProject = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/project/${idProject}`);
      toast.success("Project deleted correctly");
      router.push("/pyme");
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error?.response?.data?.message || "Error deleting project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Button className='bg-[#0a2342]' onClick={() => router.push("/pyme")} disabled={isLoading}>
            <MoveLeft className="mr-2" />
            Return
          </Button>
          <div className="gap-2 flex items-center">
            {isPublished ? (
              <Button
                variant="outline"
                disabled={isLoading}
                onClick={() => onPublish(false)}
              >
                Unpublish <EyeOff className="ml-2" />
              </Button>
            ) : (
              <Button className='bg-green-400 hover:bg-[#0a2342]' disabled={isLoading} onClick={() => onPublish(true)}>
                Publish <Eye className="ml-2" />
              </Button>
            )}
            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={removeProject}
            >
              <Trash className="mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
