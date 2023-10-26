import { useRef, useEffect } from "react";

import { isPointInTriangle } from "../../utils/AreaDeterminant";

import styles from "./Canvas.module.css";
import { calculateMidpoint } from "../../utils/MidPoint";
import { getRandomIntInclusive } from "../../utils/Random";

const TRIANGLE = [
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
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function drawLine(x1, y1, x2, y2) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#afafaf";
      ctx.stroke();
    }

    drawLine(TRIANGLE[0].x, TRIANGLE[0].y, TRIANGLE[1].x, TRIANGLE[1].y);
    drawLine(TRIANGLE[1].x, TRIANGLE[1].y, TRIANGLE[2].x, TRIANGLE[2].y);
    drawLine(TRIANGLE[0].x, TRIANGLE[0].y, TRIANGLE[2].x, TRIANGLE[2].y);

    function drawPoint(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      ctx.fillStyle = "#000000";
      ctx.fill();
    }

    drawPoint(TRIANGLE[0].x, TRIANGLE[0].y);
    drawPoint(TRIANGLE[1].x, TRIANGLE[1].y);
    drawPoint(TRIANGLE[2].x, TRIANGLE[2].y);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function drawPoint(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, 2 * Math.PI);
      ctx.fillStyle = "#000000";
      ctx.fill();
    }

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
        drawPoint(x, y);
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

    function drawPoint(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = "#000000";
      ctx.fill();
    }

    if (isDrawing) {
      let startPoint = point;
      for (let i = 1; i <= value; i++) {
        const r = getRandomIntInclusive(0, TRIANGLE.length - 1);

        const newPoint = calculateMidpoint(
          startPoint.x,
          startPoint.y,
          TRIANGLE[r].x,
          TRIANGLE[r].y
        );

        startPoint = { x: newPoint.x, y: newPoint.y };

        drawPoint(newPoint.x, newPoint.y);
      }
      setValue(0);
      setIsDrawing(false);
    }
  }, [isDrawing, point, setIsDrawing, setValue, value]);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");

  //   function drawLine(x1, y1, x2, y2) {
  //     ctx.beginPath();
  //     ctx.moveTo(x1, y1);
  //     ctx.lineTo(x2, y2);
  //     ctx.strokeStyle = "#afafaf";
  //     ctx.stroke();
  //   }

  //   drawLine(TRIANGLE[0].x, TRIANGLE[0].y, TRIANGLE[1].x, TRIANGLE[1].y);
  //   drawLine(TRIANGLE[1].x, TRIANGLE[1].y, TRIANGLE[2].x, TRIANGLE[2].y);
  //   drawLine(TRIANGLE[0].x, TRIANGLE[0].y, TRIANGLE[2].x, TRIANGLE[2].y);

  //   function drawPoint(x, y) {
  //     ctx.beginPath();
  //     ctx.arc(x, y, 2, 0, 2 * Math.PI);
  //     ctx.fillStyle = "#000000";
  //     ctx.fill();
  //   }

  //   drawPoint(TRIANGLE[0].x, TRIANGLE[0].y);
  //   drawPoint(TRIANGLE[1].x, TRIANGLE[1].y);
  //   drawPoint(TRIANGLE[2].x, TRIANGLE[2].y);

  //   function handleClick(e) {
  //     const x = e.clientX - canvas.getBoundingClientRect().left;
  //     const y = e.clientY - canvas.getBoundingClientRect().top;

  //     const isInner = isPointInTriangle(
  //       x,
  //       y,
  //       TRIANGLE[0].x,
  //       TRIANGLE[0].y,
  //       TRIANGLE[1].x,
  //       TRIANGLE[1].y,
  //       TRIANGLE[2].x,
  //       TRIANGLE[2].y
  //     );

  //     if (isInner) {
  //       drawPoint(x, y);
  //       setPoint({ x, y });
  //       setIsActive(!isActive);

  //       canvas.removeEventListener("click", handleClick);
  //     } else {
  //       alert("Please, put a point inside the figure");
  //     }
  //   }

  //   if (!isActive) {
  //     canvas.addEventListener("click", handleClick);
  //   }

  //   if (isActive) {
  //     canvas.removeEventListener("click", handleClick);
  //   }

  //   if (isDrawing) {
  //     const newPoint = calculateMidpoint(
  //       point.x,
  //       point.y,
  //       TRIANGLE[random].x,
  //       TRIANGLE[random].y
  //     );
  //     console.log(`🚀 ~ useEffect ~ newPoint:`, newPoint);
  //     setPoint({ x: newPoint.x, y: newPoint.y });
  //     drawPoint(newPoint.x, newPoint.y);
  //   }
  // }, [isActive, isDrawing, point.x, point.y, random, setIsActive, setPoint]);

  return (
    <>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={500}
        height={500}
      />
    </>
  );
}

export {};
