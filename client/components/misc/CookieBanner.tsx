import React from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/layout/Language";
import { X, Cookie, Check } from "lucide-react";

export default function CookieBanner() {
  const { locale } = useI18n();
  const [show, setShow] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  React.useEffect(() => {
    // Перевіряємо чи була прийнята згода на кукі
    const hasCookieConsent = () => {
      // Спочатку перевіряємо sessionStorage (швидше)
      const sessionConsent = sessionStorage.getItem('consent');
      if (sessionConsent) {
        return sessionConsent === '1';
      }

      // Потім перевіряємо постійні кукі
      return document.cookie.split(';').some(cookie =>
        cookie.trim().startsWith('consent=1')
      );
    };

    // Якщо кукі не прийняті - показуємо банер
    if (!hasCookieConsent()) {
      // Невеликою затримкою для плавної появи
      setTimeout(() => setShow(true), 300);
    }
  }, []);

  const cookieTexts: Record<"de" | "en" | "ru", string> = {
    de: "Wir verwenden Cookies zur Verbesserung der Website-Funktion, zur Analyse des Datenverkehrs und zur Speicherung Ihrer Voreinstellungen (Design-Thema, Sprache und andere Einstellungen). Diese werden für Google Analytics und funktionale Zwecke verwendet.",
    en: "We use cookies to improve your experience, analyze traffic, and remember your preferences such as theme, language, and other settings. These are used for Google Analytics and functional purposes.",
    ru: "Мы используем cookies для улучшения работы сайта, анализа трафика и сохранения ваших предпочтений (тема оформления, язык и другие настройки). Они используются для Google Analytics и функциональных целей.",
  };

  const cookieTitles: Record<"de" | "en" | "ru", string> = {
    de: "Cookie-Richtlinie",
    en: "Cookie Policy",
    ru: "Политика использования cookies",
  };

  const rejectLabels: Record<"de" | "en" | "ru", string> = {
    de: "Ablehnen",
    en: "Reject",
    ru: "Отклонить",
  };

  const acceptLabels: Record<"de" | "en" | "ru", string> = {
    de: "Akzeptieren",
    en: "Accept",
    ru: "Принять",
  };

  const text = cookieTexts[locale];
  const cookieTitle = cookieTitles[locale];
  const rejectLabel = rejectLabels[locale];
  const acceptLabel = acceptLabels[locale];

  const accept = () => {
    // Встанавлюємо кукі на 1 рік
    try {
      const oneYearInSeconds = 60 * 60 * 24 * 365;
      document.cookie = `consent=1; path=/; max-age=${oneYearInSeconds}; SameSite=Strict`;
      // Також зберігаємо в sessionStorage для швидшої перевірки
      sessionStorage.setItem('consent', '1');
    } catch {}

    // Анімація виходу
    setIsClosing(true);
    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  const reject = () => {
    // Зберігаємо, що користувач відхилив кукі (на сесію)
    sessionStorage.setItem('consent', 'rejected');
    setIsClosing(true);
    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  if (!show) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-end sm:items-center justify-center px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 pointer-events-auto ${
        isClosing
          ? "opacity-0 transition-all duration-300"
          : "cookie-banner-enter"
      }`}
      style={{
        backgroundColor: isClosing ? "transparent" : "rgba(0, 0, 0, 0.3)",
        backdropFilter: isClosing ? "none" : "blur(2px)",
        transition: "background-color 300ms, backdrop-filter 300ms",
        alignItems: window.innerWidth < 640 ? "flex-end" : "center",
        paddingBottom: window.innerWidth < 640 ? "1rem" : "8vh",
      }}
    >
      <div className="mx-auto max-w-3xl w-full">
        <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 dark:border-white/15 bg-gradient-to-br from-white/95 via-white/90 to-white/80 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-black/90 backdrop-blur-xl shadow-2xl">

          {/* Анімований градієнт фон */}
          <div className="absolute -inset-full top-0 h-1 bg-gradient-to-r from-transparent via-sky-400/50 to-transparent dark:via-sky-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Світяча аура */}
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl group-hover:opacity-75 opacity-50 transition-opacity duration-500" />
          <div className="absolute -left-20 bottom-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl" />

          {/* Основний контент */}
          <div className="relative p-5 sm:p-6 md:p-8">
            <div className="flex flex-col gap-4 sm:gap-6">

              {/* Іконка та текст */}
              <div className="flex gap-4 sm:gap-5">
                <div className="flex-shrink-0 flex items-start justify-center">
                  <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg bg-gradient-to-br from-sky-100 to-cyan-100 dark:from-sky-500/20 dark:to-cyan-500/20">
                    <Cookie className="h-6 w-6 sm:h-7 sm:w-7 text-sky-600 dark:text-sky-400" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                    {cookieTitle}
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/75 dark:text-foreground/70 leading-relaxed">
                    {text}
                  </p>
                </div>
              </div>

              {/* Кнопки дій - вертикальне розташування на мобілі, горизонтальне на десктопі */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end pt-2">
                <button
                  onClick={reject}
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-all duration-200 border border-foreground/15 dark:border-white/10 text-foreground/70 hover:text-foreground hover:bg-black/3 dark:hover:bg-white/5 hover:border-foreground/30 active:scale-95 order-2 sm:order-1"
                  aria-label={rejectLabel}
                >
                  {rejectLabel}
                </button>

                <button
                  onClick={accept}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold bg-gradient-to-r from-sky-500 via-sky-500 to-sky-600 hover:from-sky-400 hover:via-sky-400 hover:to-sky-500 text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all duration-200 active:scale-95 hover:translate-y-px order-1 sm:order-2"
                  aria-label={acceptLabel}
                >
                  <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                  {acceptLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
