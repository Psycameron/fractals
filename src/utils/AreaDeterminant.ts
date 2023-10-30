export function isPointInTriangle(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
) {
  let areaTotal =
    0.5 * Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));

  let area1 = 0.5 * Math.abs(x1 * (y2 - py) + x2 * (py - y1) + px * (y1 - y2));
  let area2 = 0.5 * Math.abs(x1 * (py - y3) + px * (y3 - y1) + x3 * (y1 - py));
  let area3 = 0.5 * Math.abs(px * (y2 - y3) + x2 * (y3 - py) + x3 * (py - y2));

  return areaTotal === area1 + area2 + area3;
}

export {};
