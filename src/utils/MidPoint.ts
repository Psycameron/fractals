interface IPoint {
  x: number;
  y: number;
}

export function calculateMidpoint(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): IPoint {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return { x: midX, y: midY };
}

export {};
