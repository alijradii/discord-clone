"use client";

import { Server } from "@/generated/prisma";
import Image from "next/image";
import { ActionTooltip } from "../common/action-tooltip";

import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const NavigationItem = ({ server }: { server: Server }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <ActionTooltip label={server.name} side="right">
      <button
        className="group relative flex items-center mb-3"
        onClick={() => router.push(`/servers/${server.id}`)}
      >
        <div
          className={cn(
            "bg-primary rounded-r-full w-[4px] transition-all absolute left-0",
            params?.serverid !== server.id && "group-hover:h-[20px]",
            params?.serverid === server.id && "h-[36px]"
          )}
        ></div>

        <div className="w-[48px] h-[48px] cursor-pointer rounded-[48px] overflow-hidden relative ml-[12px]">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={server.imageUrl}
              alt="server image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </button>
    </ActionTooltip>
  );
};
