import { Draw } from "@/hooks/use-draw";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const drawLine = ({
  prevPoint,
  currentPoint,
  ctx,
  color,
  size,
}: Draw) => {
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
};
