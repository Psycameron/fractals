import { getRandomHexColor } from "./Random";

interface ICanvas {
  ctx: CanvasRenderingContext2D;
}

interface IDrawPointProps extends ICanvas {
  x: number;
  y: number;
}

interface IDrawLineProps extends ICanvas {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function drawPoint({ ctx, x, y }: IDrawPointProps): void {
  ctx.beginPath();
  ctx.arc(x, y, 1, 0, 2 * Math.PI);
  ctx.fillStyle = getRandomHexColor();
  ctx.fill();
}

export function drawLine({ ctx, x1, y1, x2, y2 }: IDrawLineProps): void {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "#afafaf";
  ctx.stroke();
}

export {};
