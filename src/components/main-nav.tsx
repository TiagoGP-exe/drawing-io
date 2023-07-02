"use client";

import * as React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

import { ItemNav } from "./item-nav";

interface MainNavProps {
  items?: any[];
  children?: React.ReactNode;
  id: string;
  test?: string;
}

export const MainNav: React.FC<MainNavProps> = ({
  items,
  children,
  id,
  test,
}) => {
  return (
    <div className="flex w-20 max-w-[100vw] flex-col justify-between gap-4 bg-background pb-4">
      <div className="flex flex-col items-center gap-4 overflow-y-auto ">
        <div className="flex h-20 w-full border-b-2 border-foreground/10 py-4">
          <ItemNav
            name="Home"
            url="/channels"
            variant={!id ? "activeWithBg" : "withBg"}
            className="h-6 w-6 "
            img="/images/logo.svg"
          />
        </div>
      </div>
      <div className=" flex items-center justify-center rounded-full">
        <Link
          href="/"
          className="flex h-12  w-12  items-center justify-center rounded-full bg-foreground/10"
        >
          <LogOut className="rotate-180 " size={16} />
        </Link>
      </div>
    </div>
  );
};
