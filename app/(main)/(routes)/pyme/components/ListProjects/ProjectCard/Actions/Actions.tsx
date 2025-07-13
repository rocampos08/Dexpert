'use client'
import React from 'react'
import { ActionsProps } from './Actions.types'
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

export default function Actions(props: ActionsProps) {
  const { projectId, projectStatus } = props; // Destructure projectStatus from props
  const router = useRouter();

  const isClosed = projectStatus === "closed"; // Check if the project is closed

  const onEdit = () => {
    router.push(`/pyme/${projectId}`)
  };

  const deleteProject = () => {
    axios.delete(`/api/project/${projectId}`);
    toast("Project deleted");
    router.refresh();
  }

  const closeProject = async () => {
    try {
      await axios.post(`/api/project/${projectId}/close`);
      toast.success("Project closed and certificates generated");
      router.refresh(); // Refresh to reflect the new status
    } catch (error) {
      console.error(error);
      toast.error("Error closing project");
    }
  };

  return (
    <div className='flex flex-col gap-2 items-center w-full lg:max-w-42'>
      <Button className='w-full bg-[#0A2342]' onClick={onEdit}>
        Edit <Edit className='w-4 h-4'></Edit>
      </Button>

      {/* Conditional rendering and props for the Close Project button */}
      <Button
        variant="destructive"
        className="w-full"
        onClick={closeProject}
        disabled={isClosed} // Disable the button if isClosed is true
      >
        {isClosed ? "Closed" : "Close Project"} {/* Change text based on status */}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={'outline'} disabled={isClosed} className='w-full text-red-500 border-red-500 hover:bg-red-100 hover:text-red-500'>
            Remove <Trash className='w-4 h-4'></Trash> 
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-700">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProject}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}