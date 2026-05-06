import React, { useRef, useState, useEffect } from "react";
import { useI18n } from "@/components/layout/Language";
import { EmailIcon, WhatsAppIcon, TelegramIcon } from "@/components/icons/ContactIcons";

interface ContactButtonProps {
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  delay: number;
}

const ContactButton: React.FC<ContactButtonProps> = ({ onClick, icon: Icon, label, delay }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current || !containerRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate distance from cursor to button center
    const distX = mouseX - buttonCenterX;
    const distY = mouseY - buttonCenterY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    // Magnification radius (pixels from button center where effect applies)
    const magnificationRadius = 120;

    // Calculate scale based on distance (macOS dock effect)
    let newScale = 1;
    if (distance < magnificationRadius) {
      // Scale from 1 to 1.3 based on proximity
      newScale = 1 + (1 - distance / magnificationRadius) * 0.42;
    }

    setScale(newScale);

    // Smooth lift effect when hovering
    const lift = Math.max(0, (1 - distance / magnificationRadius) * 14);
    setPosition({ x: 0, y: -lift });
  };

  const handleMouseLeave = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-2"
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        onClick={onClick}
        type="button"
        title={label}
        aria-label={label}
        className="group relative grid h-16 w-16 place-items-center overflow-hidden rounded-2xl border border-black/10 bg-white/70 text-sky-500 shadow-xl shadow-sky-500/10 backdrop-blur-xl transition-all duration-150 ease-out hover:border-sky-400/40 hover:bg-white active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 dark:border-white/10 dark:bg-white/[0.07] dark:text-sky-200 dark:shadow-black/30 dark:hover:border-sky-300/35 dark:hover:bg-white/[0.12] sm:h-20 sm:w-20"
        style={{
          transform: `scale(${scale}) translateY(${position.y}px)`,
          animationName: "popIn",
          animationDuration: "0.6s",
          animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          animationFillMode: "both",
          animationDelay: `${delay}s`,
        } as React.CSSProperties}
      >
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,.45),transparent_36%)] opacity-60 dark:opacity-20" />
        <span className="relative grid h-10 w-10 place-items-center sm:h-12 sm:w-12">
          <Icon className="h-full w-full drop-shadow-sm" />
        </span>
      </button>
      <span className="text-xs font-medium text-foreground/65 transition-colors group-hover:text-foreground">{label}</span>
    </div>
  );
};

interface ContactButtonsWithDockProps {
  onEmail: () => void;
  onWhatsApp: () => void;
  onTelegram: () => void;
}

export const ContactButtonsWithDock: React.FC<ContactButtonsWithDockProps> = ({
  onEmail,
  onWhatsApp,
  onTelegram,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 w-full">
      <ContactButton
        icon={EmailIcon}
        label="Email"
        onClick={onEmail}
        delay={0}
      />
      <ContactButton
        icon={WhatsAppIcon}
        label="WhatsApp"
        onClick={onWhatsApp}
        delay={0.08}
      />
      <ContactButton
        icon={TelegramIcon}
        label="Telegram"
        onClick={onTelegram}
        delay={0.16}
      />

      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0) translateY(20px);
          }
          50% {
            transform: scale(1.1) translateY(-8px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
