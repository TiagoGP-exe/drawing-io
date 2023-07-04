"use client";

import { useWindowSize } from "@/hooks/use-window-size";
import { FC, use, useEffect } from "react";
import {
  ColorsPointer,
  SizePointer,
  SizesPointer,
  colorsPointer,
} from "./ui/size-pointer";
import { Button } from "./ui/button";
import { EraserIcon } from "lucide-react";

const Sizes: SizesPointer[] = ["sm", "md", "lg"];

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
  actualColor: ColorsPointer;
  actualSize: SizesPointer;
  setActualColor: (color: ColorsPointer) => void;
  setActualSize: (size: SizesPointer) => void;
  clear: () => void;
}

export const Canvas: FC<CanvasProps> = ({
  canvasRef,
  onMouseDown,
  actualColor,
  actualSize,
  setActualColor,
  setActualSize,
  clear,
}) => {
  const { height, width } = useWindowSize();

  const canvas = canvasRef.current;

  useEffect(() => {
    const isMobile = width < 640;

    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!!canvas && !!ctx) {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      if (!tempCtx) return;
      // Store the current content
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);

      // Resize the canvas
      canvas.width = isMobile ? width : width * 0.8 - 100;
      canvas.height = isMobile ? height : height * 0.8;

      // Restore the content onto the resized canvas
      ctx?.drawImage(tempCanvas, 0, 0);

      // // Cleanup the temporary canvas
      tempCanvas.width = 0;
      tempCanvas.height = 0;
    }
  }, [width, height, canvas]);

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        className="bg-white rounded-md border"
        width={750}
        height={750}
      />
      <div className="flex flex-col items-center w-full p-4 sm:pt-2 bg-foreground-soft rounded-md">
        <h1 className="font-heading text-xl mb-2">size</h1>
        <div className="flex sm:flex-col gap-1">
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
        <div className="flex sm:flex-col gap-1 items-center">
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

          <Button
            onClick={() => {
              setActualColor("white");
            }}
            className="mt-4"
            variant="outline"
            size="sm"
          >
            <EraserIcon size={16} />
          </Button>
        </div>

        <Button onClick={clear} className="mt-4" variant="ghost" size="sm">
          Clear
        </Button>
      </div>
    </>
  );
};
