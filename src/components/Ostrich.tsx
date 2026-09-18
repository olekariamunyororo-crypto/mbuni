/** Brand motif: ostrich silhouette. Single source of truth for the mark (SVG + canvas). */
export function Ostrich({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M6.4 12.1 L2.1 14.2 L6.5 16.4 Z" fill="currentColor" />
      <ellipse cx="10.8" cy="15.2" rx="5.6" ry="4.6" fill="currentColor" />
      <path d="M15 12.4 C16.6 10.2 17.2 8.2 17 6.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="17.2" cy="5.1" r="1.9" fill="currentColor" />
      <path d="M18.8 4.3 L22.3 5.3 L18.8 6.4 Z" fill="currentColor" />
      <path d="M9.6 19.2 L9.2 23 M12.6 19.2 L13.8 23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9.2 23 H11 M13.8 23 H15.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function drawOstrich(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s / 24, s / 24);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(6.4, 12.1);
  ctx.lineTo(2.1, 14.2);
  ctx.lineTo(6.5, 16.4);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(10.8, 15.2, 5.6, 4.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(15, 12.4);
  ctx.bezierCurveTo(16.6, 10.2, 17.2, 8.2, 17, 6.4);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(17.2, 5.1, 1.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(18.8, 4.3);
  ctx.lineTo(22.3, 5.3);
  ctx.lineTo(18.8, 6.4);
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(9.6, 19.2);
  ctx.lineTo(9.2, 23);
  ctx.moveTo(12.6, 19.2);
  ctx.lineTo(13.8, 23);
  ctx.stroke();
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(9.2, 23);
  ctx.lineTo(11, 23);
  ctx.moveTo(13.8, 23);
  ctx.lineTo(15.6, 23);
  ctx.stroke();
  ctx.restore();
}
