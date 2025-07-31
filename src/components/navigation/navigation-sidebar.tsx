import { currentProfile } from "@/lib/data/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="flex flex-col space-y-4 py-3 items-center h-full text-primary w-full bg-[#080808]">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md max-w-10 mx-auto" />

      <ScrollArea className="flex-1 w-full items-center">
        {servers.map((server) => {
          return <NavigationItem key={server.id} server={server} />;
        })}
      </ScrollArea>
    </div>
  );
};
