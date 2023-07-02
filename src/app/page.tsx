"use client";

import { Header } from "@/components/header";
import Lottie from "lottie-react";
import draw from "../../public/draw.json";
import drawDark from "../../public/draw-dark.json";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

const getProfileGithub = async (): Promise<string> => {
  const res = await fetch(`https://api.github.com/users/tiagogp-exe`, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  });
  const { avatar_url } = await res.json();
  return avatar_url;
};

export default function Home() {
  const { theme, systemTheme } = useTheme();
  const [profileGithub, setProfileGithub] = useState<string>("");

  useEffect(() => {
    (async () => {
      const url = await getProfileGithub();
      setProfileGithub(url);
    })();
  }, []);

  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <Header />
      <main className="flex items-center max-w-screen-xl w-full h-[85vh] border-x-2 px-8">
        <div className="flex flex-col items-start  ">
          <p className="text-5xl font-bold leading-normal text-balance w-full">
            Welcome to Drawing-io
          </p>
          <p className="text-2xl opacity-60 leading-tight">
            A collaborative drawing app for the web
          </p>
          <Link
            href="/draw"
            className={buttonVariants({
              className: "mt-4 font-heading",
            })}
          >
            Click here to start drawing!
          </Link>
        </div>

        <Lottie animationData={isDark ? drawDark : draw} loop={true} />
      </main>
      <div className="flex w-full justify-center  border-t-2 flex-1 ">
        <div className="flex w-full max-w-screen-xl flex-wrap items-center justify-center gap-4 border-x-2 p-8 md:justify-between flex-1 ">
          <div className="flex flex-wrap items-center justify-center gap-4 ">
            <Link href="https://github.com/tiagogp-exe">
              <Image
                unoptimized
                src={profileGithub}
                width={64}
                height={64}
                alt="logomark"
                className="h-8 w-8 rounded-full"
              />
            </Link>
            <p className="text-center text-sm leading-loose md:text-left">
              Built by{" "}
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Tiago Guimarães
              </a>
              . Hosted on{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Vercel
              </a>
              .
            </p>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
