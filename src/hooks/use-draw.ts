"use client";

import { ColorsPointer, SizesPointer } from "@/components/ui/size-pointer";
import { useEffect, useRef, useState } from "react";

export type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
  color: string;
  size: number;
};

export const sizeValues: Record<SizesPointer, number> = {
  sm: 2,
  md: 4,
  lg: 6,
};

export type Point = {
  x: number;
  y: number;
};

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [actualColor, setActualColor] = useState<ColorsPointer>("black");
  const [actualSize, setActualSize] = useState<SizesPointer>("md");
  const prevPoint = useRef<Point | null>(null);

  const onMouseDown = () => setMouseDown(true);
  const onMouseUpHandler = () => {
    setMouseDown(false);
    prevPoint.current = null;
  };

  const clear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;
      const currentPoint = computePointInCanvas(e);

      const ctx = canvasRef.current?.getContext("2d");

      if (!ctx || !currentPoint) return;

      onDraw({
        ctx,
        currentPoint,
        prevPoint: prevPoint.current,
        color: actualColor,
        size: sizeValues[actualSize],
      });

      prevPoint.current = currentPoint;
    };

    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    canvasRef.current?.addEventListener("mousemove", handler);
    canvasRef.current?.addEventListener("mouseup", onMouseUpHandler);

    return () => {
      canvasRef.current?.removeEventListener("mousemove", handler);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      canvasRef.current?.removeEventListener("mouseup", onMouseUpHandler);
    };
  }, [actualColor, actualSize, mouseDown, onDraw]);

  return {
    canvasRef,
    onMouseDown,
    actualColor,
    setActualColor,
    actualSize,
    setActualSize,
    clear,
  };
};
