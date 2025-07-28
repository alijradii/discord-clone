"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(3, {
    error: "Server name is required",
  }),
  imageUrl: z.string().min(3, {
    error: "Server image is required",
  }),
});

export const CreateServerModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=> {
    setIsMounted(true);
  }, [])


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  if(!isMounted) return null;

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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center jutsify-center text-center">
                Image Upload
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-slate-600 dark:text-slate-400/70">
                      Server Name
                    </FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className=""
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
