import { cva } from "class-variance-authority";
import { FC } from "react";

export const colorsPointer = {
  black: "bg-black",
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  gray: "bg-gray-500",
  orange: "bg-orange-500",
};

const sizePointerContainer = cva(
  "w-5 h-5 bg-white rounded-full flex justify-center items-center cursor-pointer active:scale-90 transition-transform",
  {
    variants: {
      variant: {
        active: "ring-2 ring-primary",
      },
    },
  }
);

const sizePointer = cva("rounded-full", {
  variants: {
    variant: {
      sm: "w-2 h-2",
      md: "w-2.5 h-2.5",
      lg: "w-3 h-3",
    },
  },
});

export type ColorsPointer = keyof typeof colorsPointer;

export type SizesPointer = "sm" | "md" | "lg";

export interface SizePointerProps {
  isActive: boolean;
  size: SizesPointer;
  color: ColorsPointer;
  setSize: (size: SizesPointer) => void;
}

export const SizePointer: FC<SizePointerProps> = ({
  setSize,
  isActive,
  size,
  color,
}) => (
  <div
    className={sizePointerContainer({
      variant: isActive ? "active" : undefined,
    })}
    onClick={() => setSize(size)}
  >
    <div
      className={sizePointer({
        variant: size,
        className: colorsPointer[color],
      })}
    />
  </div>
);
