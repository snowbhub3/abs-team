import React from "react";

export function LogoAbs({ size = 36 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="grid place-items-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/30 dark:shadow-sky-400/20 overflow-hidden font-bold"
      aria-label="ABS Studio logo"
    >
      <svg width={Math.round(size*0.75)} height={Math.round(size*0.75)} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {/* Modern geometric design */}
        <rect x="12" y="12" width="96" height="96" rx="12" fill="currentColor" opacity="0.15" />

        {/* Letter A - triangle */}
        <path d="M 30 85 L 45 35 L 60 85" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="36" y1="65" x2="54" y2="65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

        {/* Letter B - rounded rectangles */}
        <path d="M 70 35 L 70 85 M 70 35 L 85 35 Q 90 35 90 42 Q 85 50 70 50 M 70 50 L 88 50 Q 95 50 95 60 Q 95 70 88 70 L 70 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
}

export function ThemeIcon({ mode }: { mode: "light" | "dark" }) {
  if (mode === "light") {
    // black sun on white badge
    return (
      <span className="inline-grid place-items-center h-7 w-7 rounded-md bg-white text-black border border-black/10">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          {[0,45,90,135,180,225,270,315].map((a)=>{
            const rad = (a*Math.PI)/180; const x=12+Math.cos(rad)*8; const y=12+Math.sin(rad)*8; const x2=12+Math.cos(rad)*10; const y2=12+Math.sin(rad)*10;
            return <line key={a} x1={x} y1={y} x2={x2} y2={y2} stroke="currentColor" strokeWidth={2}/>;
          })}
        </svg>
      </span>
    );
  }
  // moon on dark badge
  return (
    <span className="inline-grid place-items-center h-7 w-7 rounded-md bg-black/70 text-white border border-white/10">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </span>
  );
}
