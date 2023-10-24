const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function drawPoint(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 2, 0, 2 * Math.PI);
  ctx.fillStyle = "#000000";
  ctx.fill();
}

drawPoint(100, 100);
