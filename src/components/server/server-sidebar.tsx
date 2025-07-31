import { ChannelType } from "@/generated/prisma";
import { currentProfile } from "@/lib/data/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const ServerSidebar = async ({ serverId }: { serverId: string }) => {
  const profile = await currentProfile();

  if (!profile) return redirect("/");

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    (c) => (c.type = ChannelType.TEXT)
  );
  const audioChannels = server?.channels.filter(
    (c) => (c.type = ChannelType.AUDIO)
  );

  if (!server) return redirect("/");

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return <div className="flex flex-col w-full h-full text-primary dark:bg-[#080408]">Server</div>;
};
