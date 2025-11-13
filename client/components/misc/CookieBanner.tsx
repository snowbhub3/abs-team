import React from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/layout/Language";
import { X } from "lucide-react";

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
      setTimeout(() => setShow(true), 300);
    }
  }, []);

  const text = locale === "ru"
    ? "Мы используем cookies для улучшения работы сайта и анализа трафика."
    : "We use cookies to improve your experience and analyze traffic.";

  const rejectLabel = locale === "ru" ? "Отклонить" : "Reject";
  const acceptLabel = locale === "ru" ? "Принять" : "Accept";
  const closeLabel = locale === "ru" ? "Закрыть" : "Close";

  const accept = () => {
    // Встановлюємо кукі на 1 рік
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

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[999] px-3 sm:px-6 py-4 sm:py-6 transition-all duration-300 ${
        isClosing
          ? "opacity-0 translate-y-full"
          : "opacity-100 translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-2xl">
        <div className="group relative overflow-hidden rounded-2xl border border-white/20 dark:border-white/15 bg-gradient-to-br from-white/95 to-white/85 dark:from-black/95 dark:to-slate-900/90 backdrop-blur-xl shadow-2xl">
          {/* Декоративний градієнт фон */}
          <div className="absolute -inset-full top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10 opacity-50" />

          {/* Основний контент */}
          <div className="relative p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Текст */}
              <div className="flex-1">
                <p className="text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">
                  {text}
                </p>
              </div>

              {/* Кнопки дій */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <button
                  onClick={reject}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg font-medium transition-all duration-200 border border-black/15 dark:border-white/10 text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
                  aria-label={rejectLabel}
                >
                  {rejectLabel}
                </button>
                <button
                  onClick={accept}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg font-semibold bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white shadow-lg shadow-sky-500/25 transition-all duration-200 active:scale-95"
                  aria-label={acceptLabel}
                >
                  {acceptLabel}
                </button>
                <button
                  onClick={reject}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors duration-200"
                  aria-label={closeLabel}
                >
                  <X className="h-4 w-4 text-foreground/60" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
