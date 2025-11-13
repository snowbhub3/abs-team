import React, { useEffect, useRef } from "react";

export default function WebNetworkPanel({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const points = useRef<{x:number;y:number;vx:number;vy:number}[]>([]);
  const pointer = useRef<{x:number;y:number;active:boolean}>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const wrap = wrapRef.current!;
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const spawn = (w:number,h:number) => {
      points.current = [];
      const density = Math.max(22, Math.floor((w*h)/36000));
      for (let i=0;i<density;i++){
        const x=Math.random()*w, y=Math.random()*h;
        const vx=(Math.random()-0.5)*0.25, vy=(Math.random()-0.5)*0.25;
        points.current.push({x,y,vx,vy});
      }
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      c.width = w * DPR; c.height = h * DPR; c.style.width = w+"px"; c.style.height = h+"px";
      ctx.setTransform(DPR,0,0,DPR,0,0);
      spawn(w,h);
    };

    const ro = new ResizeObserver(resize); ro.observe(wrap);
    resize();

    let raf = 0;
    const loop = () => {
      const w = c.width/DPR, h = c.height/DPR;
      ctx.clearRect(0,0,w,h);
      const isDark = document.documentElement.classList.contains("dark");
      const dot = isDark ? "rgba(59,130,246,0.8)" : "rgba(2,132,199,0.8)";
      const line = isDark ? "rgba(56,189,248,0.28)" : "rgba(14,165,233,0.32)";

      for (const p of points.current){
        if (pointer.current.active){
          const dx = pointer.current.x - p.x; const dy = pointer.current.y - p.y; const d = Math.hypot(dx,dy)||1;
          if (d<140){ const f=(1-d/140)*0.35; p.vx += (dx/d)*f; p.vy += (dy/d)*f; }
        }
        p.x+=p.vx; p.y+=p.vy; p.vx*=0.985; p.vy*=0.985;
        if (p.x<0||p.x>w) p.vx*=-1; if (p.y<0||p.y>h) p.vy*=-1;
      }

      ctx.lineWidth = 1;
      for (let i=0;i<points.current.length;i++){
        const p = points.current[i];
        for (let j=i+1;j<points.current.length;j++){
          const q = points.current[j];
          const dx=p.x-q.x, dy=p.y-q.y; const d=Math.hypot(dx,dy);
          if (d<140){
            ctx.strokeStyle = line.replace(/0\.\d+/, String(Math.max(0.12, 0.38 - d/320)));
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
          }
        }
      }
      for (const p of points.current){ ctx.fillStyle=dot; ctx.beginPath(); ctx.arc(p.x,p.y,1.2,0,Math.PI*2); ctx.fill(); }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.current.active = true;
      pointer.current.x = e.clientX - rect.left; pointer.current.y = e.clientY - rect.top;
    };
    wrap.addEventListener("pointermove", onMove, { passive: true });

    return () => { cancelAnimationFrame(raf); ro.disconnect(); wrap.removeEventListener("pointermove", onMove); };
  }, []);

  return (
    <div ref={wrapRef} className={"pointer-events-none absolute inset-0 " + className} aria-hidden>
      <canvas ref={canvasRef} />
    </div>
  );
}
