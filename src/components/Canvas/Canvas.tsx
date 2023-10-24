import { useRef, useEffect, useState } from "react";
import { getRandomIntInclusive } from "../../utils/Random";

export function Canvas() {
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function drawPoint(x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = "#000000";
      ctx.fill();
    }

    drawPoint(250, 20);
    drawPoint(20, 480);
    drawPoint(480, 480);
  }, []);

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

  return <canvas ref={canvasRef} width={500} height={500} />;
}

export {};
