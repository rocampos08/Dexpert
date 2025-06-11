import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { FormCreateProject } from "./FormCreateProject"


export function Header() {
  return (
    <div className="my-4 mx-6 border rounded-lg bg-white">
      <div className="flex justify-between items-center py-4 px-6">
          <h1 className="text-xl text-[#0A2342]">Pyme mode</h1>
          <Dialog>
  <DialogTrigger asChild>
    <Button className="bg-[#2196F3] hover:bg-[#0A2342]">Add project <Plus></Plus></Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="text-[#0A2342]">Create your project</DialogTitle>
      <FormCreateProject></FormCreateProject>
    </DialogHeader>
  </DialogContent>
</Dialog>
      </div>
    </div>
  )
}
