"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { ActionTooltip } from "../common/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side="right" align="center" label="create a new server">
        <button
          className="group flex items-center justify-center"
          onClick={() => onOpen("createServer")}
        >
          <div
            className={cn(
              "mx-3 flex items-center justify-center h-[48px] w-[48px] overflow-hidden",
              "bg-background dark:bg-neutral-700 rounded-[24px] group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:group-hover:bg-emerald-500 transition-all"
            )}
          >
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
