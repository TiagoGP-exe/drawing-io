"use client";

import { Canvas } from "@/components/canvas";
import { Button } from "@/components/ui/button";
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
    clear,
  } = useDraw(drawLine);
  const { height, width } = useWindowSize();

  console.log(width);

  const isMobile = width < 640;

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

  return (
    <div className="min-h-screen min-w-full flex items-center justify-center ">
      <div className="flex max-w-screen-xl h-[80vh] w-full bg-foreground-soft rounded-md sm:flex-row flex-col p-1">
        <Canvas
          canvasRef={canvasRef}
          onMouseDown={onMouseDown}
          actualColor={actualColor}
          actualSize={actualSize}
          setActualColor={setActualColor}
          setActualSize={setActualSize}
          clear={clear}
        />
      </div>
    </div>
  );
};

export default Page;
