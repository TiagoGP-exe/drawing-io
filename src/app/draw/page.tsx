"use client";

import {
  ColorsPointer,
  SizePointer,
  SizesPointer,
  colorsPointer,
} from "@/components/ui/size-pointer";
import { Draw, useDraw } from "@/hooks/use-draw";
import { useWindowSize } from "@/hooks/use-window-size";
import { FC } from "react";

const Sizes: SizesPointer[] = ["sm", "md", "lg"];

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const {
    canvasRef,
    onMouseDown,
    actualColor,
    actualSize,
    setActualColor,
    setActualSize,
  } = useDraw(drawLine);
  const { height, width } = useWindowSize();

  function drawLine({ prevPoint, currentPoint, ctx, color, size }: Draw) {
    const { x: currX, y: currY } = currentPoint;

    const lineColor = color;
    const lineWidth = size;

    let startPoint = prevPoint ?? currentPoint;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(currX, currY, lineWidth / 2, 0, Math.PI * 2);
    // ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  if (height === 0 || width === 0) return null;

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center ">
      <div className="flex max-w-screen-xl h-[80vh] w-full bg-foreground-soft rounded-md sm:flex-row flex-col p-1">
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          className="bg-white rounded-md border"
          width={width * 0.8 - 100}
          height={height * 0.8}
        />
        <div className="flex flex-col items-center w-full pt-2">
          <h1 className="font-heading text-xl mb-2">size</h1>
          <div className="flex flex-col gap-1">
            {Sizes.map((size) => (
              <SizePointer
                color={actualColor}
                size={size}
                key={size}
                isActive={size === actualSize}
                setSize={(size: SizesPointer) => {
                  setActualSize(size);
                }}
              />
            ))}
          </div>

          <h1 className="font-heading text-xl mb-2 mt-4">color</h1>
          <div className="flex flex-col gap-1">
            {Object.keys(colorsPointer).map((color) => (
              <SizePointer
                color={color as ColorsPointer}
                size={actualSize}
                key={color}
                isActive={color === actualColor}
                setSize={() => {
                  setActualColor(color as ColorsPointer);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
