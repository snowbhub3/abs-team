import React, { useEffect, useRef } from "react";

// Subtle interactive network (spiderweb/internet) background
export default function WebNetwork() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const points = useRef<{x:number;y:number;vx:number;vy:number;homeX:number;homeY:number;phase:number;driftX:number;driftY:number}[]>([]);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    const pointer = { x: 0, y: 0, active: false, energy: 0 } as { x:number; y:number; active:boolean; energy:number };
    let lastSize = { w: 0, h: 0 };

    const spawn = (w: number, h: number) => {
      points.current = [];
      const isMobile = w < 768;
      const density = isMobile
        ? Math.max(30, Math.floor((w*h)/23000))
        : Math.max(46, Math.floor((w*h)/26000));
      const columns = isMobile ? 5 : 8;
      for (let i=0; i<density; i++) {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const rows = Math.ceil(density / columns);
        const angle = i * 2.399963 + row * 0.3;
        const band = row / Math.max(1, rows - 1);
        const lane = col / Math.max(1, columns - 1);
        const waveX = Math.sin(row * 1.17 + col * 0.9) * (isMobile ? 34 : 56);
        const waveY = Math.cos(col * 1.4 + row * 0.55) * (isMobile ? 42 : 64);
        const homeX = lane * w + waveX;
        const homeY = band * h + waveY;
        const speed = (isMobile ? 0.115 : 0.072) * 0.965;
        const driftX = (Math.sin(i * 0.91) > 0 ? 1 : -1) * speed * (0.55 + (i % 4) * 0.12);
        const driftY = Math.sin(i * 1.33) * speed * 0.24;
        const vx = driftX + Math.cos(angle + Math.PI / 2) * speed * 0.45;
        const vy = driftY + Math.sin(angle + Math.PI / 2) * speed * 0.34;
        points.current.push({x:homeX,y:homeY,vx,vy,homeX,homeY,phase:i * 0.37,driftX,driftY});
      }
    };

    const drawOnce = () => {
      const w = c.width/DPR, h = c.height/DPR;
      ctx.clearRect(0,0,w,h);
      const isDark = document.documentElement.classList.contains("dark");
      const dot = isDark ? "rgba(96,165,250,0.68)" : "rgba(2,132,199,0.64)";
      const line = isDark ? "rgba(56,189,248,0.28)" : "rgba(14,116,144,0.26)";
      const maxDist = w < 768 ? 165 : 185;
      ctx.lineWidth = w < 768 ? 1.1 : 0.95;
      for (let i=0;i<points.current.length;i++){
        const p = points.current[i];
        for (let j=i+1;j<points.current.length;j++){
          const q = points.current[j];
          const dx = p.x-q.x, dy=p.y-q.y; const d = Math.hypot(dx,dy);
          if (d<maxDist) {
            ctx.strokeStyle = line.replace(/0\.\d+/, String(Math.max(0.1, 0.38 - d/500)));
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
          }
        }
      }
      for (const p of points.current) {
        ctx.fillStyle = dot;
        ctx.beginPath(); ctx.arc(p.x,p.y,w < 768 ? 1.75 : 1.45,0,Math.PI*2); ctx.fill();
      }
    };

    const wrappedDelta = (a: number, b: number, size: number) => {
      let d = a - b;
      if (d > size / 2) d -= size;
      if (d < -size / 2) d += size;
      return d;
    };

    const strokeWrapped = (
      p: { x: number; y: number },
      q: { x: number; y: number },
      w: number,
      h: number,
      style: string,
    ) => {
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const shiftX = dx > w / 2 ? w : dx < -w / 2 ? -w : 0;
      const shiftY = dy > h / 2 ? h : dy < -h / 2 ? -h : 0;

      ctx.strokeStyle = style;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(q.x + shiftX, q.y + shiftY);
      ctx.stroke();

      if (shiftX || shiftY) {
        ctx.beginPath();
        ctx.moveTo(p.x - shiftX, p.y - shiftY);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    };

    const resize = () => {
      const w = window.innerWidth; const h = window.innerHeight;
      const isMobile = w < 768;
      const widthChanged = Math.abs(w - lastSize.w) > 24;
      const heightChanged = Math.abs(h - lastSize.h) > (isMobile ? 180 : 80);
      if (lastSize.w && !widthChanged && !heightChanged) return;
      lastSize = { w, h };
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
      if (now - lastFrame < 16) return;
      lastFrame = now;

      const w = c.width/DPR, h = c.height/DPR;
      ctx.clearRect(0,0,w,h);
      const tick = now * 0.001;

      const isDark = document.documentElement.classList.contains("dark");
      const dot = isDark ? "rgba(96,165,250,0.76)" : "rgba(2,132,199,0.7)";
      const line = isDark ? "rgba(56,189,248,0.32)" : "rgba(14,116,144,0.3)";

      // update positions + slight attraction to pointer/touch
      const isMobile = w < 768;
      const maxDist = isMobile ? 170 : 195;
      const pointerRadius = isMobile ? 210 : 240;
      pointer.energy *= 0.975;
      if (pointer.energy < 0.02) pointer.active = false;
      for (const p of points.current) {
        const homeDx = wrappedDelta(p.homeX, p.x, w);
        const homeDy = wrappedDelta(p.homeY, p.y, h);
        p.vx += homeDx * (isMobile ? 0.00016 : 0.00014);
        p.vy += homeDy * (isMobile ? 0.00016 : 0.00014);
        p.vx += p.driftX * 0.0065;
        p.vy += p.driftY * 0.0065;

        p.vx += Math.cos(tick * 1.08 + p.phase) * (isMobile ? 0.0039 : 0.0025);
        p.vy += Math.sin(tick * 0.92 + p.phase) * (isMobile ? 0.0039 : 0.0025);

        if (pointer.active) {
          const dx = pointer.x - p.x; const dy = pointer.y - p.y; const d = Math.hypot(dx,dy) || 1;
          if (d < pointerRadius) {
            const pull = 0;
            const tearRadius = pointerRadius * (isMobile ? 0.38 : 0.34);
            const tear = d < tearRadius ? (1 - d/tearRadius) * (isMobile ? 0.16 : 0.09) * Math.max(0.35, pointer.energy) : 0;
            const orbit = d < pointerRadius * 0.72 ? Math.sin(tick * 3 + p.phase) * (isMobile ? 0.032 : 0.018) : 0;
            p.vx += (dx / d) * pull - (dx / d) * tear + (-dy / d) * orbit;
            p.vy += (dy / d) * pull - (dy / d) * tear + (dx / d) * orbit;
          }
        }
        p.x += p.vx; p.y += p.vy;
        p.vx *= isMobile ? 0.991 : 0.994;
        p.vy *= isMobile ? 0.991 : 0.994;
        const pad = 24;
        if (p.x < -pad) p.x = w + pad;
        if (p.x > w + pad) p.x = -pad;
        if (p.y < -pad) p.y = h + pad;
        if (p.y > h + pad) p.y = -pad;
      }

      // draw connections
      if (pointer.active) {
        const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, pointerRadius);
        glow.addColorStop(0, isDark ? "rgba(56,189,248,0.055)" : "rgba(14,165,233,0.05)");
        glow.addColorStop(1, "rgba(56,189,248,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, pointerRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineWidth = isMobile ? 1.15 : 1;
      for (let i=0;i<points.current.length;i++){
        const p = points.current[i];
        for (let j=i+1;j<points.current.length;j++){
          const q = points.current[j];
          const dx = wrappedDelta(p.x, q.x, w), dy=wrappedDelta(p.y, q.y, h); const d = Math.hypot(dx,dy);
          if (d<maxDist) {
            let alpha = Math.max(isMobile ? 0.11 : 0.08, (isMobile ? 0.36 : 0.33) - d/560);
            const linkPulse = (Math.sin(tick * (isMobile ? 0.95 : 0.8) + i * 1.73 + j * 2.41) + 1) * 0.5;
            const breakFade = linkPulse < 0.28 ? 0.2 + (linkPulse / 0.28) * 0.8 : 1;
            alpha *= breakFade;
            if (pointer.active) {
              const midX = (p.x + q.x) * 0.5;
              const midY = (p.y + q.y) * 0.5;
              const md = Math.hypot(pointer.x - midX, pointer.y - midY);
              const tearZone = pointerRadius * (isMobile ? 0.42 : 0.36);
              if (md < tearZone) {
                alpha *= 0.22 + (md / tearZone) * 0.62;
              } else if (md < pointerRadius) {
                alpha *= 1.1;
              }
            }
            strokeWrapped(p, q, w, h, line.replace(/0\.\d+/, String(alpha)));
          }
          if (pointer.active) {
            const pd = Math.min(Math.hypot(pointer.x - p.x, pointer.y - p.y), Math.hypot(pointer.x - q.x, pointer.y - q.y));
            if (pd < pointerRadius && pd > pointerRadius * 0.18 && d < pointerRadius) {
              const accentAlpha = Math.max(0.04, 0.2 - pd / pointerRadius * 0.12);
              strokeWrapped(p, q, w, h, isDark ? `rgba(125,211,252,${accentAlpha})` : `rgba(2,132,199,${accentAlpha})`);
            }
          }
        }
      }

      // draw dots
      for (const p of points.current) {
        ctx.fillStyle = dot;
        ctx.beginPath(); ctx.arc(p.x,p.y,isMobile ? 1.9 : 1.55,0,Math.PI*2); ctx.fill();
      }
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      pointer.active = true;
      pointer.energy = e.pointerType === "touch" ? 1.2 : 1;
      pointer.x = e.clientX; pointer.y = e.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });

    const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(loop); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove as any);
      window.removeEventListener("pointerdown", onMove as any);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" aria-hidden/>;
}
