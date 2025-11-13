import React from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/layout/Language";

export default function CookieBanner() {
  const { locale } = useI18n();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const consent = document.cookie.match(/(?:^|; )consent=1/);
    if (!consent) setShow(true);
  }, []);

  if (!show) return null;

  const text = locale === "ru"
    ? "Мы используем cookies для улучшения работы сайта."
    : "We use cookies to improve your experience.";

  const accept = () => {
    try { document.cookie = `consent=1; path=/; max-age=${60*60*24*365}`; } catch {}
    setShow(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-3 z-[120] px-3">
      <div className="mx-auto max-w-screen-md rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-foreground/80">{text}</p>
          <Button size="sm" onClick={accept} className="bg-sky-500 hover:bg-sky-400 text-white">OK</Button>
        </div>
      </div>
    </div>
  );
}
