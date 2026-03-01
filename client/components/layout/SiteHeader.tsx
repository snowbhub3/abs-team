import React from "react";
import { createPortal } from "react-dom";
import { Menu, Languages, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/layout/Language";
import { LogoAbs, ThemeIcon } from "@/components/brand/LogoAbs";
import WebNetworkPanel from "@/components/effects/WebNetworkPanel";

const navItems = [
  { id: "home", href: "#home", k: "nav_home" },
  { id: "services", href: "#services", k: "nav_services" },
  { id: "process", href: "#process", k: "nav_process" },
  { id: "projects", href: "#projects", k: "nav_projects" },
  { id: "pricing", href: "#preise", k: "nav_pricing" },
  { id: "campaigns", href: "/kampagnen", k: "nav_campaigns" },
  { id: "contact", href: "#contact", k: "nav_contact" },
] as const;

export default function SiteHeader() {
  const { t, locale, setLocale, theme, toggleTheme } = useI18n();
  const [open, setOpen] = React.useState(false);
  const headerRef = React.useRef<HTMLElement | null>(null);
  const [top, setTop] = React.useState(64);
  React.useEffect(() => {
    const update = () => {
      const rect = headerRef.current?.getBoundingClientRect();
      const h = Math.round(rect?.bottom ?? 64);
      setTop(h);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <header ref={headerRef} className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-white/70 dark:bg-black/30 border-b border-black/5 dark:border-white/10 pt-safe">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-6 flex h-16 items-center justify-between">
        <a href="#home" onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0, behavior:"smooth"});}} className="flex items-center gap-2 sm:gap-3">
          <LogoAbs size={40} />
          <span className="hidden sm:block text-lg font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
            ABS Studio
          </span>
        </a>

        {/* Desktop nav hidden by request */}
        <nav className="hidden" />

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="rounded-md p-2">
            {theme === "dark" ? <ThemeIcon mode="dark"/> : <ThemeIcon mode="light"/>}
          </button>
          <div className="hidden sm:flex rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
            <button onClick={() => setLocale("de")} className={`px-2 py-1 text-xs ${locale === "de" ? "bg-black/10 dark:bg-white/10" : "text-muted-foreground"}`}>DE</button>
            <button onClick={() => setLocale("en")} className={`px-2 py-1 text-xs ${locale === "en" ? "bg-black/10 dark:bg-white/10" : "text-muted-foreground"}`}>EN</button>
            <button onClick={() => setLocale("ru")} className={`px-2 py-1 text-xs ${locale === "ru" ? "bg-black/10 dark:bg-white/10" : "text-muted-foreground"}`}>RU</button>
          </div>
          {/* Mobile-only menu */}
          <div className="sm:block md:hidden">
            <Button
              onClick={() => setOpen((v)=>!v)}
              aria-expanded={open}
              size="icon"
              variant="secondary"
              className={`transition-transform bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 border-black/10 dark:border-white/10 ${open ? "rotate-90" : "rotate-0"}`}
            >
              {open ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Drawer via portal to avoid stacking issues */}
      {open && createPortal(
        <div className={`fixed inset-x-0 bottom-0 z-[100] transition ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open} style={{ top: Math.max(0, top - 1) }}>
          <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
          <div
            className={`absolute right-0 top-0 h-full w-[88%] max-w-[88%] sm:w-80 rounded-l-2xl overflow-hidden border-l border-black/10 dark:border-white/10 shadow-2xl transform origin-right ${open ? "translate-x-0 animate-drawer" : "translate-x-full"}`}
            style={{ backgroundColor: "hsl(var(--background))" }}
          >
            <WebNetworkPanel />
            <div className="relative z-10 p-4 flex flex-col gap-3">
              {navItems.map((i) => (
                <a key={i.id} href={i.href} onClick={(e) => {
                  setOpen(false);
                  if (i.href.startsWith("#")) {
                    e.preventDefault();
                    const el = document.querySelector(i.href);
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }} className="rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-2 text-base">
                  {t(i.k)}
                </a>
              ))}
              <div className="pt-4">
                <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2"><Languages className="h-4 w-4"/>Sprache / Language</div>
                <div className="flex rounded-lg border border-black/10 dark:border-white/10 overflow-hidden w-fit flex-wrap">
                  <button onClick={() => setLocale("de")} className={`px-3 py-1 text-sm ${locale === "de" ? "bg-black/10 dark:bg-white/10" : "text-muted-foreground"}`}>DE</button>
                  <button onClick={() => setLocale("en")} className={`px-3 py-1 text-sm ${locale === "en" ? "bg-black/10 dark:bg-white/10" : "text-muted-foreground"}`}>EN</button>
                  <button onClick={() => setLocale("ru")} className={`px-3 py-1 text-sm ${locale === "ru" ? "bg-black/10 dark:bg-white/10" : "text-muted-foreground"}`}>RU</button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
