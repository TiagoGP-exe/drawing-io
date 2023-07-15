import Link from "next/link";
import { Icons } from "./icons";
import { ModeToggle } from "./mode-toggle";
import { Button, buttonVariants } from "./ui/button";

export const Header = () => (
  <header className="flex justify-center fixed top-0 h-20 inset-x-0 border-b-2 z-10">
    <main className="flex max-w-screen-xl xl:max-w-screen-2xl w-full px-4 justify-between items-center lg:px-8 border-x-2 bg-background">
      <div className="flex justify-center items-center gap-2">
        <Icons.logo />
        <p className="font-heading text-xl">Drawing-io</p>
      </div>
      <Link
        href="/draw"
        className={buttonVariants({
          className: "font-heading",
        })}
      >
        Start Drawing
      </Link>
    </main>
  </header>
);
