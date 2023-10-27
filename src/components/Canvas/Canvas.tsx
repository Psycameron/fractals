import { useRef, useEffect, useCallback } from "react";

import { isPointInTriangle } from "../../utils/AreaDeterminant";

import styles from "./Canvas.module.css";
import { calculateMidpoint } from "../../utils/MidPoint";
import { getRandomIntInclusive, getRandomHexColor } from "../../utils/Random";

const TRIANGLE = [
  { x: 250, y: 20 },
  { x: 20, y: 480 },
  { x: 480, y: 480 },
];

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "#afafaf";
  ctx.stroke();
}

function drawPoint(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 1, 0, 2 * Math.PI);
  ctx.fillStyle = getRandomHexColor();
  ctx.fill();
}

export function Canvas({
  value,
  setValue,
  point,
  setPoint,
  isActive,
  setIsActive,
  isDrawing,
  setIsDrawing,
}) {
  const canvasRef = useRef(null);

  const drawWithDelay = useCallback(
    (ctx) => {
      let counter = 1;
      let numIterations = 10;

      function animate() {
        for (let i = 1; i < numIterations; i++) {
          const r = getRandomIntInclusive(0, TRIANGLE.length - 1);
          const newPoint = calculateMidpoint(
            point.x,
            point.y,
            TRIANGLE[r].x,
            TRIANGLE[r].y
          );
          drawPoint(ctx, newPoint.x, newPoint.y);
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
    const ctx = canvas.getContext("2d");

    drawLine(ctx, TRIANGLE[1].x, TRIANGLE[1].y, TRIANGLE[2].x, TRIANGLE[2].y);
    drawLine(ctx, TRIANGLE[0].x, TRIANGLE[0].y, TRIANGLE[2].x, TRIANGLE[2].y);
    drawLine(ctx, TRIANGLE[0].x, TRIANGLE[0].y, TRIANGLE[1].x, TRIANGLE[1].y);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function handleClick(e) {
      const x = e.clientX - canvas.getBoundingClientRect().left;
      const y = e.clientY - canvas.getBoundingClientRect().top;

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
        drawPoint(ctx, x, y);
        setPoint({ x, y });
        setIsActive(!isActive);

        canvas.removeEventListener("click", handleClick);
      } else {
        alert("Please, put a point inside the figure");
      }
    }

    if (!isActive) {
      canvas.addEventListener("click", handleClick);
    }

    if (isActive) {
      canvas.removeEventListener("click", handleClick);
    }
  }, [isActive, setIsActive, setPoint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (isDrawing) {
      drawWithDelay(ctx);
    }
  }, [drawWithDelay, isDrawing]);

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawLine(ctx, TRIANGLE[1].x, TRIANGLE[1].y, TRIANGLE[2].x, TRIANGLE[2].y);
    drawLine(ctx, TRIANGLE[0].x, TRIANGLE[0].y, TRIANGLE[2].x, TRIANGLE[2].y);
    drawLine(ctx, TRIANGLE[0].x, TRIANGLE[0].y, TRIANGLE[1].x, TRIANGLE[1].y);

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
