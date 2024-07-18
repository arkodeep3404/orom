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

  async function createNewItem() {
    const response = await axios.post(`/api/dashboard/${service}/createNew`, {
      [`${service}Name`]: newName,
    });

    toast(response.data.message);
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
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={createNewItem}>
            {" "}
            Create{" "}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
