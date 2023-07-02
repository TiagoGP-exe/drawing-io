"use client"

import React, { FC } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

interface LogoProps {
  size?: "small" | "medium" | "large"
  className?: string
}

const sizes = {
  small: {
    width: 96,
    height: 16,
  },
  medium: {
    width: 240,
    height: 40,
  },
  large: {
    width: 432,
    height: 115,
  },
}

export const Logo: FC<LogoProps> = ({ size, className }) => {
  const { theme, systemTheme } = useTheme()
  const [actualTheme, setActualTheme] = React.useState("dark")

  const correctTheme =
    (theme === "system" ? systemTheme : theme === "dark" ? "dark" : "light") ??
    "dark"

  React.useEffect(() => {
    setActualTheme(correctTheme)
  }, [correctTheme])

  return (
    <Image
      src={
        actualTheme === "dark"
          ? "/images/logomark-dark.svg"
          : "/images/logomark-light.svg"
      }
      alt="logo"
      width={sizes[size || "small"].width}
      height={sizes[size || "small"].height}
      priority
      className={className}
    />
  )
}
