"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import React from "react";

import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  endpoint: "serverImage" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  endpoint,
  value,
  onChange,
}) => {
  const filetype = value?.split(".").pop();
  if (value && filetype !== "pdf") {
    return (
      <div className="w-32 h-32 relative">
        <div className="relative w-full h-full overflow-hidden rounded-full">
          <Image src={value} alt="server image" fill className="object-cover" />
        </div>

        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-[2px] shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      appearance={{
        container:
          "border-none ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
      }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
