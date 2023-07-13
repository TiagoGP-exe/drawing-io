"use client";

import { Canvas } from "@/components/canvas";
import { Draw, sizeValues, useDraw } from "@/hooks/use-draw";
import { drawLine } from "@/lib/utils";
import { FC, useEffect } from "react";

import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

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
  } = useDraw(createLine);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    socket.emit("client-ready");

    socket.on("get-canvas-state", () => {
      if (!canvasRef.current?.toDataURL()) return;
      socket.emit("canvas-state", canvasRef.current.toDataURL());
    });

    socket.on("canvas-state-from-server", (state: string) => {
      const img = new Image();
      img.src = state;
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    });

    socket.on("draw-line", ({ prevPoint, currentPoint, color }: Draw) => {
      if (!ctx) return console.log("no ctx here");
      drawLine({
        prevPoint,
        currentPoint,
        ctx,
        color,
        size: sizeValues[actualSize],
      });
    });

    socket.on("clear", clear);

    return () => {
      socket.off("draw-line");
      socket.off("get-canvas-state");
      socket.off("canvas-state-from-server");
      socket.off("clear");
    };
  }, [actualSize, canvasRef, clear]);

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit("draw-line", { prevPoint, currentPoint, color: actualColor });
    drawLine({
      prevPoint,
      currentPoint,
      ctx,
      color: actualColor,
      size: sizeValues[actualSize],
    });
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
