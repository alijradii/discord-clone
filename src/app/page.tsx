import { ModeToggle } from "@/components/theme/mode-toggle-button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-primary">hello world</h1>
      <ModeToggle />

      <UserButton />
    </div>
  );
}
