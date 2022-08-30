const handleCanvasCreation = ({
  width,
  height,
  scale,
  uploadScale,
  canvasRef,
  img,
}: {
  width: number;
  height: number;
  scale: number;
  uploadScale: number;
  canvasRef: any;
  img: HTMLImageElement;
}) => {
  const { current: canvas } = canvasRef;
  const canvasWidth = Math.round(width * uploadScale);
  const canvasHeight = Math.round(height * uploadScale);
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
};

export { handleCanvasCreation };

// if (scale && uploadScale && canvasRef !== null) {
//   handleCanvasCreation({
//     width,
//     height,
//     scale,
//     uploadScale,
//     canvasRef,
//     img,
//   });
// }
