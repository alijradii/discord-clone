import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/data/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerPageLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverid: string };
}) => {
  const profile = await currentProfile();

  if (!profile) return <RedirectToSignIn />;

  const server = await db.server.findUnique({
    where: {
      id: params.serverid,
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

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="flex h-full w-full">
      <div className="hidden md:flex flex-col h-full w-60 z-20 inset-y-0">
        <ServerSidebar serverId={server.id} />
      </div>
      <main className="h-full md:pl-60 ">{children}</main>
    </div>
  );
};

export default ServerPageLayout;
