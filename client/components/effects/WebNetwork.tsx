import React, { useEffect, useRef } from "react";

// Subtle interactive network (spiderweb/internet) background
export default function WebNetwork() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const points = useRef<{x:number;y:number;vx:number;vy:number}[]>([]);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const pointer = { x: 0, y: 0, active: false } as { x:number; y:number; active:boolean };
    let lastScrollY = window.scrollY;

    const spawn = (w: number, h: number) => {
      points.current = [];
      // Reduce density on mobile devices for better performance
      const isMobile = w < 768;
      const density = isMobile
        ? Math.max(14, Math.floor((w*h)/52000))
        : Math.max(34, Math.floor((w*h)/32000));
      for (let i=0; i<density; i++) {
        const x = Math.random()*w; const y = Math.random()*h;
        // Slow drift keeps the background professional instead of noisy.
        const speed = isMobile ? 0.045 : 0.07;
        const vx = (Math.random()-0.5)*speed; const vy = (Math.random()-0.5)*speed;
        points.current.push({x,y,vx,vy});
      }
    };

    const drawOnce = () => {
      const w = c.width/DPR, h = c.height/DPR;
      ctx.clearRect(0,0,w,h);
      const isDark = document.documentElement.classList.contains("dark");
      const dot = isDark ? "rgba(96,165,250,0.72)" : "rgba(2,132,199,0.68)";
      const line = isDark ? "rgba(56,189,248,0.32)" : "rgba(14,116,144,0.3)";
      const maxDist = 175;
      ctx.lineWidth = 0.95;
      for (let i=0;i<points.current.length;i++){
        const p = points.current[i];
        for (let j=i+1;j<points.current.length;j++){
          const q = points.current[j];
          const dx = p.x-q.x, dy=p.y-q.y; const d = Math.hypot(dx,dy);
          if (d<maxDist) {
            ctx.strokeStyle = line.replace(/0\.\d+/, String(Math.max(0.08, 0.36 - d/520)));
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
          }
        }
      }
      for (const p of points.current) {
        ctx.fillStyle = dot;
        ctx.beginPath(); ctx.arc(p.x,p.y,1.45,0,Math.PI*2); ctx.fill();
      }
    };

    const resize = () => {
      const w = window.innerWidth; const h = window.innerHeight;
      c.width = w * DPR; c.height = h * DPR; c.style.width = w+"px"; c.style.height = h+"px";
      ctx.setTransform(DPR,0,0,DPR,0,0);
      spawn(w,h);
      if (prefersReduced) drawOnce();
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let lastFrame = 0;

    const loop = (now = 0) => {
      if (prefersReduced) return; // static frame already drawn
      raf = requestAnimationFrame(loop);
      if (now - lastFrame < 33) return;
      lastFrame = now;

      const w = c.width/DPR, h = c.height/DPR;
      ctx.clearRect(0,0,w,h);

      const isDark = document.documentElement.classList.contains("dark");
      const dot = isDark ? "rgba(96,165,250,0.75)" : "rgba(2,132,199,0.72)";
      const line = isDark ? "rgba(56,189,248,0.34)" : "rgba(14,116,144,0.32)";

      // update positions + slight attraction to pointer/touch
      const maxDist = w < 768 ? 135 : 185;
      const pointerRadius = w < 768 ? 190 : 240;
      for (const p of points.current) {
        if (pointer.active) {
          const dx = pointer.x - p.x; const dy = pointer.y - p.y; const d = Math.hypot(dx,dy) || 1;
          if (d < pointerRadius) {
            const f = (1 - d/pointerRadius) * 0.045;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.996;
        p.vy *= 0.996;
        if (p.x<0||p.x>w) p.vx*=-1;
        if (p.y<0||p.y>h) p.vy*=-1;
      }

      // draw connections
      if (pointer.active) {
        const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, pointerRadius);
        glow.addColorStop(0, isDark ? "rgba(56,189,248,0.12)" : "rgba(14,165,233,0.11)");
        glow.addColorStop(1, "rgba(56,189,248,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, pointerRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineWidth = 0.95;
      for (let i=0;i<points.current.length;i++){
        const p = points.current[i];
        for (let j=i+1;j<points.current.length;j++){
          const q = points.current[j];
          const dx = p.x-q.x, dy=p.y-q.y; const d = Math.hypot(dx,dy);
          if (d<maxDist) {
            ctx.strokeStyle = line.replace(/0\.\d+/, String(Math.max(0.08, 0.38 - d/540)));
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
          }
          if (pointer.active) {
            const pd = Math.min(Math.hypot(pointer.x - p.x, pointer.y - p.y), Math.hypot(pointer.x - q.x, pointer.y - q.y));
            if (pd < pointerRadius && d < pointerRadius) {
              ctx.strokeStyle = isDark ? "rgba(125,211,252,0.42)" : "rgba(2,132,199,0.36)";
              ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
            }
          }
        }
      }

      // draw dots
      for (const p of points.current) {
        ctx.fillStyle = dot;
        ctx.beginPath(); ctx.arc(p.x,p.y,1.55,0,Math.PI*2); ctx.fill();
      }
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      pointer.active = true;
      pointer.x = e.clientX; pointer.y = e.clientY;
    };
    const onScroll = () => {
      const dy = window.scrollY - lastScrollY; lastScrollY = window.scrollY;
      pointer.active = true;
      pointer.x = Math.max(0, Math.min(window.innerWidth, pointer.x || window.innerWidth/2));
      pointer.y = Math.max(0, Math.min(window.innerHeight, (pointer.y || window.innerHeight/2) + dy*0.6));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(loop); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove as any);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" aria-hidden/>;
}
