import { useRef, useEffect, useCallback } from "react";

import { isPointInTriangle } from "../../utils/AreaDeterminant";
import { calculateMidpoint } from "../../utils/MidPoint";
import { getRandomIntInclusive } from "../../utils/Random";
import { drawLine, drawPoint } from "../../utils/Drawing";

import styles from "./Canvas.module.css";

interface IPoint {
  x: number;
  y: number;
}

type Triangle = [IPoint, IPoint, IPoint];

interface ICanvasProps {
  value: number;
  setValue: (value: number) => void;
  point: IPoint;
  setPoint: ({ x, y }: IPoint) => void;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  isDrawing: boolean;
  setIsDrawing: (isDrawing: boolean) => void;
}

const TRIANGLE: Triangle = [
  { x: 250, y: 20 },
  { x: 20, y: 480 },
  { x: 480, y: 480 },
];

export function Canvas({
  value,
  setValue,
  point,
  setPoint,
  isActive,
  setIsActive,
  isDrawing,
  setIsDrawing,
}: ICanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWithDelay = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      let counter = 1;
      let numIterations = 10;

      function animate(): void {
        for (let i = 1; i < numIterations; i++) {
          const r = getRandomIntInclusive(0, TRIANGLE.length - 1);
          const newPoint = calculateMidpoint(
            point.x,
            point.y,
            TRIANGLE[r].x,
            TRIANGLE[r].y
          );

          drawPoint({ ctx, x: newPoint.x, y: newPoint.y });
          point.x = newPoint.x;
          point.y = newPoint.y;

          if (counter < value) {
            counter++;
          } else {
            setIsDrawing(false);
            setValue(0);
            return;
          }
        }

        requestAnimationFrame(animate);
      }

      animate();
    },
    [point, value, setValue, setIsDrawing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) {
      return;
    }

    drawLine({
      ctx,
      x1: TRIANGLE[1].x,
      y1: TRIANGLE[1].y,
      x2: TRIANGLE[2].x,
      y2: TRIANGLE[2].y,
    });
    drawLine({
      ctx,
      x1: TRIANGLE[0].x,
      y1: TRIANGLE[0].y,
      x2: TRIANGLE[2].x,
      y2: TRIANGLE[2].y,
    });
    drawLine({
      ctx,
      x1: TRIANGLE[0].x,
      y1: TRIANGLE[0].y,
      x2: TRIANGLE[1].x,
      y2: TRIANGLE[1].y,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) {
      return;
    }

    function handleClick(e: MouseEvent) {
      const x = e.clientX - canvas!.getBoundingClientRect().left;
      const y = e.clientY - canvas!.getBoundingClientRect().top;

      const isInner = isPointInTriangle(
        x,
        y,
        TRIANGLE[0].x,
        TRIANGLE[0].y,
        TRIANGLE[1].x,
        TRIANGLE[1].y,
        TRIANGLE[2].x,
        TRIANGLE[2].y
      );

      if (isInner) {
        if (!ctx) {
          return;
        }

        drawPoint({ ctx, x, y });
        setPoint({ x, y });
        setIsActive(!isActive);

        canvas!.removeEventListener("click", handleClick);
      } else {
        alert("Please, put a point inside the figure");
      }
    }

    if (!isActive) {
      canvas!.addEventListener("click", handleClick);
    }

    if (isActive) {
      canvas!.removeEventListener("click", handleClick);
    }
  }, [isActive, setIsActive, setPoint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) {
      return;
    }

    if (isDrawing) {
      drawWithDelay(ctx);
    }
  }, [drawWithDelay, isDrawing]);

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas!.width, canvas!.height);

    drawLine({
      ctx,
      x1: TRIANGLE[1].x,
      y1: TRIANGLE[1].y,
      x2: TRIANGLE[2].x,
      y2: TRIANGLE[2].y,
    });
    drawLine({
      ctx,
      x1: TRIANGLE[0].x,
      y1: TRIANGLE[0].y,
      x2: TRIANGLE[2].x,
      y2: TRIANGLE[2].y,
    });
    drawLine({
      ctx,
      x1: TRIANGLE[0].x,
      y1: TRIANGLE[0].y,
      x2: TRIANGLE[1].x,
      y2: TRIANGLE[1].y,
    });

    setIsActive(!isActive);
  }

  return (
    <>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={500}
        height={500}
      />
      <button type="button" onClick={clearCanvas} disabled={!isActive}>
        Clear
      </button>
    </>
  );
}

export {};
