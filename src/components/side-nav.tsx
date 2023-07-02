"use client";

import { FC } from "react";
import Image from "next/image";
import { Headphones, Mic, Minus, Settings } from "lucide-react";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

import { AvatarAndStatus } from "./avatar-and-status";
import { User } from "next-auth";

const nickChannel = "Makj3212";

interface SideNavProps {
  user?: User & {
    id: string;
    username?: string | null | undefined;
  };
}

export const SideNav: FC<SideNavProps> = ({ user }) => {
  const [_, copy] = useCopyToClipboard();

  return (
    <div className="flex w-full max-w-xs flex-col justify-between overflow-auto bg-sidebar  pb-4">
      <div className=" flex h-20 items-center border-b-2 border-foreground/10 p-4 ">
        <Image
          src="/images/channel-1.png"
          quality={100}
          width={100}
          height={100}
          alt="logomark"
          className="aspect-square h-12 w-12 rounded-full"
        />

        <div className="ml-2 flex flex-col gap-0.5">
          <h1 className="text-sm font-bold text-foreground">Channel 1</h1>
          <div
            className="select-none transition-all duration-200 active:scale-90"
            onClick={() => copy(nickChannel)}
          >
            <p className="cursor-pointer rounded-2xl bg-primary/20 px-1 text-center text-xs text-primary transition-all hover:bg-primary/30">
              @<span className="text-[0.6rem]">{nickChannel}</span>
            </p>
          </div>
        </div>
      </div>
      <main className="max-h-full flex-1 overflow-auto"></main>

      <div className="flex items-center justify-between border-t-2 border-foreground/10 pl-3 pr-4 pt-4">
        <AvatarAndStatus
          name={user?.name!}
          status="online"
          imgURL={user?.image!}
          username={user?.username!}
        />

        <div className="flex gap-3">
          <div className="relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all hover:bg-foreground/20 active:scale-90">
            <Minus
              className="absolute rotate-45  text-red-600"
              size={36}
              strokeWidth={1.2}
            />
            <Mic size={18} />
          </div>
          <div className="relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all hover:bg-foreground/20 active:scale-90">
            <Minus
              className="absolute rotate-45  text-red-600"
              size={36}
              strokeWidth={1.2}
            />

            <Headphones size={18} />
          </div>
          <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all hover:bg-foreground/20 active:scale-90">
            <Settings size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
