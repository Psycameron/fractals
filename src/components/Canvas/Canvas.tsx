import { useRef, useEffect, useState } from "react";
import { getRandomIntInclusive } from "../../utils/Random";

import styles from "./Canvas.module.css";

const TRIANGLE = {
  A: { x: 250, y: 20 },
  B: { x: 20, y: 480 },
  C: { x: 480, y: 480 },
};

export function Canvas({ value, setPoint, isActive, setIsActive }) {
  // const [x, setX] = useState(null);
  // const [y, setY] = useState(null);

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

    drawLine(TRIANGLE.A.x, TRIANGLE.A.y, TRIANGLE.B.x, TRIANGLE.B.y);
    drawLine(TRIANGLE.B.x, TRIANGLE.B.y, TRIANGLE.C.x, TRIANGLE.C.y);
    drawLine(TRIANGLE.A.x, TRIANGLE.A.y, TRIANGLE.C.x, TRIANGLE.C.y);

    function drawPoint(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = "#000000";
      ctx.fill();
    }

    drawPoint(TRIANGLE.A.x, TRIANGLE.A.y);
    drawPoint(TRIANGLE.B.x, TRIANGLE.B.y);
    drawPoint(TRIANGLE.C.x, TRIANGLE.C.y);

    function handleClick(e) {
      console.log("first");
      const x = e.clientX - canvas.getBoundingClientRect().left;
      const y = e.clientY - canvas.getBoundingClientRect().top;
      drawPoint(x, y);
      setPoint([{ x, y }]);
      setIsActive(!isActive);

      canvas.removeEventListener("click", handleClick);
    }

    if (!isActive) {
      canvas.addEventListener("click", handleClick);
    }

    if (isActive) {
      canvas.removeEventListener("click", handleClick);
    }
  }, [isActive, setIsActive, setPoint]);

  //   useEffect(() => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");

  //     function drawPoint(x, y) {
  //       ctx.beginPath();
  //       ctx.arc(x, y, 2, 0, 2 * Math.PI);
  //       ctx.fillStyle = "#000000";
  //       ctx.fill();
  //       }

  //   }, []);

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
