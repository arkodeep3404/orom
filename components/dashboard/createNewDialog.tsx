"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDashboardContent } from "@/lib/useDashboardContent";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateExistingDialog({
  trigger,
  service,
}: {
  trigger: React.ReactNode;
  service: string;
}) {
  const [newName, setNewName] = useState("");
  const setDashboardContent = useDashboardContent(service);

  async function createNewItem() {
    if (newName.trim() === "") {
      toast("enter name to create");
    } else {
      const response1 = await axios.post(
        `/api/dashboard/${service}/createNew`,
        {
          [`${service}Name`]: newName,
        }
      );

      setNewName("");
      toast(response1.data.message);

      if (setDashboardContent !== null) {
        const response2 = await axios.get("/api/dashboard/popup");
        setDashboardContent(response2.data.popups);
      } else {
        toast("service not found");
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Name</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Pedro Duarte"
              className="col-span-3"
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={createNewItem}>
              Create
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
