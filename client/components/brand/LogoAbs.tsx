import React from "react";

type LogoAbsProps = {
  className?: string;
};

export function LogoAbs({ className = "" }: LogoAbsProps) {
  return (
    <span className={`flex h-16 w-44 items-center ${className}`}>
      <img
        src="/logo/header-logo.png"
        alt="ABS Studio"
        className="block h-12 w-auto object-contain"
        width={176}
        height={48}
      />
    </span>
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
