"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

export const CreateServerModal = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  return (
    <div className="p-48">
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Server</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            Give your server a personality with a custom name and image. You can
            always change them later.
          </DialogDescription>
          <DialogFooter>
            <Button type="submit">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
