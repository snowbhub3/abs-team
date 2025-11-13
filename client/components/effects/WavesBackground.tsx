import React, { useEffect, useRef } from "react";

// Animated water/waves background using multiple sine layers
export default function WavesBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      c.width = window.innerWidth * DPR;
      c.height = window.innerHeight * DPR;
      c.style.width = `${window.innerWidth}px`;
      c.style.height = `${window.innerHeight}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    let raf = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);

    const loop = () => {
      if (prefersReduced) return; // Respect user preference
      t += 0.006; // calmer
      ctx.clearRect(0, 0, c.width, c.height);
      const w = c.width / DPR;
      const h = c.height / DPR;

      const layers = [
        { amp: 14, len: 420, speed: 0.6, colorDark: "rgba(56,189,248,0.22)", colorLight: "rgba(14,165,233,0.20)" },
        { amp: 22, len: 260, speed: 0.9, colorDark: "rgba(2,132,199,0.18)", colorLight: "rgba(2,132,199,0.16)" },
        { amp: 30, len: 560, speed: 0.4, colorDark: "rgba(37,99,235,0.12)", colorLight: "rgba(59,130,246,0.12)" },
      ];
      const isDark = document.documentElement.classList.contains("dark");

      layers.forEach((L, i) => {
        ctx.beginPath();
        const yBase = h * (0.65 + i * 0.08);
        for (let x = 0; x <= w; x += 2) {
          const y = yBase + Math.sin((x + t * L.speed * 120) / L.len) * L.amp + Math.cos((x - t * L.speed * 80) / (L.len * 0.8)) * (L.amp * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = isDark ? L.colorDark : L.colorLight;
        ctx.fill();
      });

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => { window.removeEventListener("resize", resize); document.removeEventListener("visibilitychange", onVis); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 mix-blend-normal" aria-hidden />;
}
