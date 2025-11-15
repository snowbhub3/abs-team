import React from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/layout/Language";
import { X, Cookie } from "lucide-react";

export default function CookieBanner() {
  const { locale } = useI18n();
  const [show, setShow] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  React.useEffect(() => {
    // Перевіряємо чи була прийнята згода на кукі
    const consent = document.cookie.match(/(?:^|; )consent=1/);
    // Якщо кукі не прийняті - показуємо банер
    if (!consent) {
      // Невеликою затримкою для плавної появи
      setTimeout(() => setShow(true), 500);
    }
  }, []);

  const text = locale === "ru"
    ? "Мы используем cookies для улучшения работы сайта и анализа трафика."
    : "We use cookies to improve your experience and analyze traffic.";

  const rejectLabel = locale === "ru" ? "Отклонить" : "Reject";
  const acceptLabel = locale === "ru" ? "Принять" : "Accept";

  const accept = () => {
    // Встан��влюємо кукі на 1 рік
    try {
      document.cookie = `consent=1; path=/; max-age=${60*60*24*365}`;
    } catch {}

    // Анімація виходу
    setIsClosing(true);
    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  const reject = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  if (!show) return null;

  return createPortal(
    <div
      className={`fixed inset-x-0 bottom-0 z-[9999] px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 pointer-events-auto ${
        isClosing
          ? "opacity-0 translate-y-full transition-all duration-300"
          : "cookie-banner-enter"
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 dark:border-white/15 bg-gradient-to-br from-white/95 via-white/90 to-white/80 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-black/90 backdrop-blur-xl shadow-2xl">
          
          {/* Анімований градієнт фон */}
          <div className="absolute -inset-full top-0 h-1 bg-gradient-to-r from-transparent via-sky-400/50 to-transparent dark:via-sky-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Світяча аура */}
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl group-hover:opacity-75 opacity-50 transition-opacity duration-500" />
          <div className="absolute -left-20 bottom-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />

          {/* Основний контент */}
          <div className="relative p-4 sm:p-5 md:p-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 items-start sm:items-center justify-between">
              
              {/* Іконка та текст */}
              <div className="flex gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0 flex items-start justify-center pt-0.5">
                  <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-500/20 dark:to-cyan-500/20">
                    <Cookie className="h-5 w-5 sm:h-6 sm:w-6 text-sky-600 dark:text-sky-400" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                    {locale === "ru" ? "Испол��зование cookies" : "Cookie Policy"}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/75 dark:text-foreground/70 leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>

              {/* Кнопки дій - адаптивна сітка */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto justify-end">
                <button
                  onClick={reject}
                  className="inline-flex items-center justify-center px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg font-medium transition-all duration-200 border border-foreground/15 dark:border-white/10 text-foreground/70 hover:text-foreground hover:bg-black/3 dark:hover:bg-white/5 hover:border-foreground/30 active:scale-95 whitespace-nowrap"
                  aria-label={rejectLabel}
                >
                  {rejectLabel}
                </button>
                
                <button
                  onClick={accept}
                  className="inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg font-semibold bg-gradient-to-r from-sky-500 via-sky-500 to-sky-600 hover:from-sky-400 hover:via-sky-400 hover:to-sky-500 text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all duration-200 active:scale-95 hover:translate-y-px whitespace-nowrap"
                  aria-label={acceptLabel}
                >
                  {acceptLabel}
                </button>
                
                <button
                  onClick={reject}
                  className="hidden sm:inline-flex p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all duration-200 flex-shrink-0"
                  aria-label="Закрити"
                >
                  <X className="h-4 w-4 text-foreground/60 hover:text-foreground/80" />
                </button>
              </div>
            </div>

            {/* Мобільне розташування кнопки закриття */}
            <button
              onClick={reject}
              className="sm:hidden absolute top-3 right-3 p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all duration-200"
              aria-label="Закрити"
            >
              <X className="h-4 w-4 text-foreground/60" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
