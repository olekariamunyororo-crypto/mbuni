import { useEffect, useRef } from "react";
import { hashStr, mulberry32 } from "../../lib/rand";
import { drawOstrich } from "../Ostrich";

const N = 29;

/**
 * Deterministic QR-styled address matrix rendered to canvas, with the ostrich
 * watermark knocked out of the center. Isolated here so a standards-compliant
 * encoder can be dropped in behind the same props without touching screens.
 */
export function QRCode({ value, size = 228, className }: { value: string; size?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const quiet = 2;
    const cell = size / (N + quiet * 2);
    const rng = mulberry32(hashStr(value));

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#000000";

    const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x >= N - 8 && y < 8) || (x < 8 && y >= N - 8);
    const inCenter = (x: number, y: number) => x >= 11 && x <= 17 && y >= 11 && y <= 17;

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (inFinder(x, y) || inCenter(x, y)) continue;
        const on = x === 6 || y === 6 ? (x + y) % 2 === 0 : rng() < 0.47;
        if (on) ctx.fillRect((x + quiet) * cell, (y + quiet) * cell, cell + 0.4, cell + 0.4);
      }
    }

    const finder = (gx: number, gy: number) => {
      for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 7; i++) {
          const ring = i === 0 || i === 6 || j === 0 || j === 6;
          const core = i >= 2 && i <= 4 && j >= 2 && j <= 4;
          if (ring || core) ctx.fillRect((gx + i + quiet) * cell, (gy + j + quiet) * cell, cell + 0.4, cell + 0.4);
        }
      }
    };
    finder(0, 0);
    finder(N - 7, 0);
    finder(0, N - 7);

    const c = (11 + 3.5 + quiet) * cell;
    const r = 3.6 * cell;
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") ctx.roundRect(c - r, c - r, r * 2, r * 2, r * 0.28);
    else ctx.rect(c - r, c - r, r * 2, r * 2);
    ctx.fill();
    drawOstrich(ctx, c - r * 0.82, c - r * 0.82, r * 1.64, "#000000");
  }, [value, size]);

  return <canvas ref={ref} className={className} />;
}
