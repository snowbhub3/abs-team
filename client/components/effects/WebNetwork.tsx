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
      const density = Math.max(32, Math.floor((w*h)/26000));
      for (let i=0; i<density; i++) {
        const x = Math.random()*w; const y = Math.random()*h;
        const vx = (Math.random()-0.5)*0.25; const vy = (Math.random()-0.5)*0.25;
        points.current.push({x,y,vx,vy});
      }
    };

    const drawOnce = () => {
      const w = c.width/DPR, h = c.height/DPR;
      ctx.clearRect(0,0,w,h);
      const isDark = document.documentElement.classList.contains("dark");
      const dot = isDark ? "rgba(59,130,246,0.8)" : "rgba(2,132,199,0.8)";
      const line = isDark ? "rgba(56,189,248,0.28)" : "rgba(14,165,233,0.32)";
      ctx.lineWidth = 1;
      for (let i=0;i<points.current.length;i++){
        const p = points.current[i];
        for (let j=i+1;j<points.current.length;j++){
          const q = points.current[j];
          const dx = p.x-q.x, dy=p.y-q.y; const d = Math.hypot(dx,dy);
          if (d<160) {
            ctx.strokeStyle = line.replace(/0\.\d+/, String(Math.max(0.12, 0.4 - d/350)));
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
          }
        }
      }
      for (const p of points.current) {
        ctx.fillStyle = dot;
        ctx.beginPath(); ctx.arc(p.x,p.y,1.4,0,Math.PI*2); ctx.fill();
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

    let raf = 0; let t = 0;

    const loop = () => {
      if (prefersReduced) return; // static frame already drawn
      t += 0.005;
      const w = c.width/DPR, h = c.height/DPR;
      ctx.clearRect(0,0,w,h);

      const isDark = document.documentElement.classList.contains("dark");
      const dot = isDark ? "rgba(59,130,246,0.8)" : "rgba(2,132,199,0.8)";
      const line = isDark ? "rgba(56,189,248,0.28)" : "rgba(14,165,233,0.32)";

      // update positions + slight attraction to pointer/touch
      for (const p of points.current) {
        if (pointer.active) {
          const dx = pointer.x - p.x; const dy = pointer.y - p.y; const d = Math.hypot(dx,dy) || 1;
          if (d < 160) {
            const f = (1 - d/160) * 0.35;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.985; p.vy *= 0.985;
        if (p.x<0||p.x>w) p.vx*=-1;
        if (p.y<0||p.y>h) p.vy*=-1;
      }

      // draw connections
      ctx.lineWidth = 1;
      for (let i=0;i<points.current.length;i++){
        const p = points.current[i];
        for (let j=i+1;j<points.current.length;j++){
          const q = points.current[j];
          const dx = p.x-q.x, dy=p.y-q.y; const d = Math.hypot(dx,dy);
          if (d<160) {
            ctx.strokeStyle = line.replace(/0\.\d+/, String(Math.max(0.12, 0.4 - d/350)));
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
          }
        }
      }

      // draw dots
      for (const p of points.current) {
        ctx.fillStyle = dot;
        ctx.beginPath(); ctx.arc(p.x,p.y,1.4,0,Math.PI*2); ctx.fill();
      }

      raf = requestAnimationFrame(loop);
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
