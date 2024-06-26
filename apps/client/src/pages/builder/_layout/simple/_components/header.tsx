import { t } from "@lingui/macro";
import { HouseSimple, Lock, SidebarSimple } from "@phosphor-icons/react";
import { Button, Tooltip } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { Link } from "react-router-dom";

import { Icon } from "@/client/components/icon";
import { LocaleSwitch } from "@/client/components/locale-switch";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore } from "@/client/stores/resume";

import { Settings } from "./settings";

export const BuilderHeader = () => {
  const title = useResumeStore((state) => state.resume.title);
  const locked = useResumeStore((state) => state.resume.locked);

  const toggle = useBuilderStore((state) => state.toggle);
  const isDragging = useBuilderStore(
    (state) => state.panel.left.handle.isDragging || state.panel.right.handle.isDragging,
  );

  const onToggle = (side: "left" | "right") => toggle(side);

  return (
    <div
      className={cn(
        "inset-x-0 top-0 z-50 w-full bg-secondary-accent/50 backdrop-blur-lg lg:z-20",
        !isDragging && "transition-[left,right]",
      )}
    >
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex">
          <Button asChild size="icon" variant="ghost" className="size-8 rounded-full">
            <Link to="/dashboard">
              <Icon />
            </Link>
          </Button>
        </div>

        {/* Hide for Small devices */}
        <div className="invisible flex items-center justify-center gap-x-1 sm:visible lg:mx-auto">
          <Button asChild size="icon" variant="ghost">
            <Link to="/dashboard/resumes">
              <HouseSimple />
            </Link>
          </Button>

          <span className="mr-2 text-xs opacity-40">{"/"}</span>

          <h1 className="font-medium">{title}</h1>

          {locked && (
            <Tooltip content={t`This resume is locked, please unlock to make further changes.`}>
              <Lock size={14} className="ml-2 opacity-75" />
            </Tooltip>
          )}
        </div>

        <div className="flex">
          <LocaleSwitch />
          <ThemeSwitch size={14} />
          <Settings />

          <Button
            size="icon"
            variant="ghost"
            className="flex sm:hidden"
            onClick={() => onToggle("right")}
          >
            <SidebarSimple className="-scale-x-100" />
          </Button>

          {/* User Sections */}
          <UserOptions>
            <Button size="icon" variant="ghost" className="rounded-full">
              <UserAvatar size={28} />
            </Button>
          </UserOptions>
        </div>
      </div>
    </div>
  );
};
