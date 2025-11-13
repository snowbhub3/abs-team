import React, { useEffect, useRef } from "react";

// Lightweight comet/particle cursor trail using canvas
export default function CometCursor() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; hue: number }[]>([]);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();

    let last = performance.now();
    let hueShift = 200;

    const spawn = (x: number, y: number) => {
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 1.6;
        particles.current.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, hue: hueShift + Math.random() * 30 });
      }
    };

    const onMove = (e: MouseEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      spawn(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);

    const loop = (t: number) => {
      const dt = Math.min(32, t - last);
      last = t;
      hueShift += dt * 0.02;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // glow
      ctx.save();
      for (const mul of [8, 4, 2, 1]) {
        ctx.globalCompositeOperation = "lighter";
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.life -= 0.016 * (dt / 16);
          if (p.life <= 0) {
            particles.current.splice(i, 1);
            continue;
          }
          const alpha = Math.max(0, p.life) * 0.6;
          ctx.beginPath();
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 22 / mul);
          grad.addColorStop(0, `hsla(${p.hue}, 100%, 60%, ${alpha})`);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, 22 / mul, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" aria-hidden />;
}
