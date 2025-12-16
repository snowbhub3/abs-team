import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Locale = "en" | "ru";

type Dict = Record<string, any>;

type Theme = "light" | "dark";

type I18nContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

const DICT: Record<Locale, Dict> = {
  en: {
    brand: "abs team",
    experience_badge: "Freelance developers team",
    hero_title: "We build websites that grow your business",
    hero_sub: "Development, redesign and optimization focused on results and user experience.",
    cta_primary: "Discuss a project",
    cta_secondary: "View work",
    nav_home: "Home",
    nav_services: "Services",
    nav_process: "Process",
    nav_projects: "Projects",
    nav_contact: "Contact",
    section_services_title: "What we do",
    section_services_sub: "End‑to‑end: from idea & design to launch and support.",
    s1: "Landing pages, corporate sites, shops — fast and responsive.",
    s2: "Improve visuals and UX, boost conversion and retention.",
    s3: "Speed, SEO, analytics — to make your site perform.",
    s4: "Updates, security and growth after launch.",
    section_process_title: "How we work",
    process_1_title: "Discovery",
    process_1_desc: "Brief, goals, audit and strategy.",
    process_2_title: "Design",
    process_2_desc: "UI/UX, prototypes and visual system.",
    process_3_title: "Development",
    process_3_desc: "Responsive frontend and reliable backend.",
    process_4_title: "Launch & growth",
    process_4_desc: "Tests, SEO, metrics and iteration.",
    section_projects_title: "Recent projects",
    start_similar: "Start a similar project",
    contact_title: "Let's discuss your project",
    contact_sub: "Write us in Telegram — we reply fast.",
    form_name: "Name",
    form_email: "Email",
    form_message: "Message",
    form_send: "Send in Telegram",
    footer_rights: "All rights reserved.",
  },
  ru: {
    brand: "abs team",
    experience_badge: "Команда фриланс‑разработчиков",
    hero_title: "Создаём сайты, которые растят ваш бизнес",
    hero_sub: "Разработка, редизайн и оптимизация с фокусом на результат и опыт пользователя.",
    cta_primary: "Обсудить проект",
    cta_secondary: "Портфолио",
    nav_home: "Главная",
    nav_services: "Услуги",
    nav_process: "Процесс",
    nav_projects: "Проекты",
    nav_contact: "Контакты",
    section_services_title: "Что мы делаем",
    section_services_sub: "От идеи и дизайна до запуска и поддержки.",
    s1: "Лендинги, корпоративные сайты, магазины — быстро и адаптивно.",
    s2: "Улучшаем визуал и UX, растим конверсию и удержание.",
    s3: "Скорость, SEO, аналитика — чтобы сайт работал.",
    s4: "Обновления, безопасность и рост после запуска.",
    section_process_title: "Как мы работаем",
    process_1_title: "Аналитика",
    process_1_desc: "Бриф, цели, аудит и стратегия.",
    process_2_title: "Дизайн",
    process_2_desc: "UI/UX, прототипы и визуальная система.",
    process_3_title: "Разработка",
    process_3_desc: "Адаптивный фронтенд и надежный бэкенд.",
    process_4_title: "Запуск и рост",
    process_4_desc: "Тесты, SEO, метрики и итерации.",
    section_projects_title: "Недавние проекты",
    start_similar: "Начать похожий проект",
    contact_title: "Обсудим ваш проект",
    contact_sub: "Напишите нам в Telegram — отвечаем быстро.",
    form_name: "Имя",
    form_email: "Почта",
    form_message: "Сообщение",
    form_send: "Написать в Telegram",
    footer_rights: "Все права защищены.",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "ru";
    const cookieLocale = document.cookie.match(/(?:^|; )locale=([^;]+)/)?.[1];
    const saved = (localStorage.getItem("locale") as Locale | null) || (cookieLocale as Locale | null);
    if (saved === "en" || saved === "ru") return saved;
    const lang = (navigator.language || "en").toLowerCase();
    const ruLangs = ["ru", "uk", "be", "kk", "uz", "az", "hy", "ka", "tg", "ky", "tt"];
    const isRu = ruLangs.some((code) => lang.startsWith(code));
    return isRu ? "ru" : "en";
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const cookieTheme = document.cookie.match(/(?:^|; )theme=([^;]+)/)?.[1] as Theme | undefined;
    const saved = (localStorage.getItem("theme") as Theme | null) || cookieTheme || null;
    return saved ?? "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try { document.cookie = `theme=${theme}; path=/; max-age=${60*60*24*365}`; } catch {}
  }, [theme]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem("locale", l); } catch {}
    try { document.cookie = `locale=${l}; path=/; max-age=${60*60*24*365}`; } catch {}
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem("theme", t); } catch {}
    try { document.cookie = `theme=${t}; path=/; max-age=${60*60*24*365}`; } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const t = useCallback((key: string) => {
    const dict = DICT[locale];
    const parts = key.split(".");
    let cur: any = dict;
    for (const p of parts) cur = cur?.[p];
    return typeof cur === "string" ? cur : key;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, theme, setTheme, toggleTheme, t }), [locale, theme, setLocale, setTheme, toggleTheme, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
