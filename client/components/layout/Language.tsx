import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Locale = "de" | "en" | "ru";

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
  de: {
    brand: "ABS Studio",
    experience_badge: "Digitale Agentur für Landing Pages",
    hero_title: "Websites, die Ihr Geschäft wachsen lassen",
    hero_sub: "Moderne Landing Pages mit Abo-Modell. Schnell, reaktiv, SEO-optimiert und immer betreut.",
    cta_primary: "Jetzt besprechen",
    cta_secondary: "Unser Angebot",
    nav_home: "Startseite",
    nav_services: "Leistungen",
    nav_process: "Prozess",
    nav_projects: "Projekte",
    nav_pricing: "Preise",
    nav_campaigns: "Kampagnen",
    nav_contact: "Kontakt",
    section_services_title: "Was wir machen",
    section_services_sub: "Von der Idee bis zur Betreuung – alles aus einer Hand.",
    s1: "Landing Pages, Unternehmenswebsites und Shops – schnell und responsiv.",
    s2: "Design und UX optimieren, Conversions steigern und Kundenbindung verbessern.",
    s3: "Performance, SEO und Analytics – damit Ihr Geschäft online läuft.",
    s4: "Regelmäßige Updates, Sicherheit und kontinuierliches Wachstum nach dem Launch.",
    section_process_title: "So arbeiten wir",
    process_1_title: "Analyse & Strategie",
    process_1_desc: "Wir verstehen Ihre Ziele, analysieren den Markt und entwickeln eine klare Strategie.",
    process_2_title: "Design",
    process_2_desc: "Modernes UI/UX, Prototypen und ein konsistentes Design-System.",
    process_3_title: "Entwicklung",
    process_3_desc: "Responsive Frontend und zuverlässiges Backend – gebaut für Leistung.",
    process_4_title: "Launch & Wachstum",
    process_4_desc: "Tests, SEO-Launch, Monitoring und kontinuierliche Optimierung.",
    section_projects_title: "Neueste Projekte",
    start_similar: "Ähnliches Projekt starten",
    contact_title: "Lassen Sie uns Ihr Projekt besprechen",
    contact_sub: "Kontaktieren Sie uns über Telegram, WhatsApp oder Email – wir antworten innerhalb von 24 Stunden.",
    contact_telegram: "Telegram",
    contact_whatsapp: "WhatsApp",
    contact_email: "Email",
    contact_response_time: "Antwort innerhalb von 24 Stunden",
    contact_free_consultation: "Kostenlose Beratung",
    form_name: "Name",
    form_email: "E-Mail",
    form_message: "Ich möchte eine Landing Page für mein Unternehmen oder eine Verbesserung der bestehenden Website. Mein Budget liegt bei etwa 60-200 EUR pro Monat...",
    form_send: "Senden",
    form_description: "Schreiben Sie Ihre Nachricht und wir antworten innerhalb von 24 Stunden",
    footer_rights: "Alle Rechte vorbehalten.",
    footer_impressum: "Impressum",
    footer_privacy: "Datenschutz",
    footer_terms: "AGB",
    footer_contact: "Kontakt",
    pricing_title: "Transparente Preise für jedes Unternehmen",
    pricing_sub: "Wählen Sie den Plan, der zu Ihren Bedürfnissen passt. Sie können jederzeit kündigen.",
    pricing_starter: "Starter Paket",
    pricing_plus: "Plus Paket",
    pricing_pro: "Pro Paket",
    pricing_per_month: "pro Monat",
    pricing_billed: "Abrechnung monatlich, Kündigung jederzeit möglich",
    pricing_includes: "Enthalten:",
    pricing_starter_items: "Landing Page Design & Entwicklung|Basis SEO Optimierung|1 Content Änderung pro Monat|Sicherheits-Updates|Email Support",
    pricing_plus_items: "Alles aus Starter, plus:|Erweiterte SEO Optimierung|bis zu 3 Content Änderungen pro Monat|Google Analytics Setup|Monatliche Performance Reports|Prioritäts-Support",
    pricing_pro_items: "Alles aus Plus, plus:|Google Ads & Meta Ads Management|A/B Testing & Optimierung|Custom Feature Entwicklung|Conversion Rate Optimization (CRO)|Dedicated Account Manager",
    pricing_cta: "Jetzt starten",
    pricing_contact: "Haben Sie Fragen? Kontaktieren Sie uns für ein maßgeschneidertes Angebot.",
  },
  en: {
    brand: "ABS Studio",
    experience_badge: "Digital agency for landing pages",
    hero_title: "Websites that grow your business",
    hero_sub: "Modern landing pages with subscription model. Fast, responsive, SEO-optimized and always supported.",
    cta_primary: "Let's discuss",
    cta_secondary: "Our offer",
    nav_home: "Home",
    nav_services: "Services",
    nav_process: "Process",
    nav_projects: "Projects",
    nav_pricing: "Pricing",
    nav_campaigns: "Campaigns",
    nav_contact: "Contact",
    section_services_title: "What we do",
    section_services_sub: "From idea to support – everything from one source.",
    s1: "Landing pages, corporate websites and shops – fast and responsive.",
    s2: "Optimize design and UX, increase conversions and improve customer retention.",
    s3: "Performance, SEO and analytics – to keep your business online running.",
    s4: "Regular updates, security and continuous growth after launch.",
    section_process_title: "How we work",
    process_1_title: "Analysis & Strategy",
    process_1_desc: "We understand your goals, analyze the market and develop a clear strategy.",
    process_2_title: "Design",
    process_2_desc: "Modern UI/UX, prototypes and a consistent design system.",
    process_3_title: "Development",
    process_3_desc: "Responsive frontend and reliable backend – built for performance.",
    process_4_title: "Launch & Growth",
    process_4_desc: "Testing, SEO launch, monitoring and continuous optimization.",
    section_projects_title: "Recent projects",
    start_similar: "Start similar project",
    contact_title: "Let's discuss your project",
    contact_sub: "Contact us via Telegram, WhatsApp, or Email – we reply within 24 hours.",
    contact_telegram: "Telegram",
    contact_whatsapp: "WhatsApp",
    contact_email: "Email",
    contact_response_time: "Response within 24 hours",
    contact_free_consultation: "Free consultation",
    form_name: "Name",
    form_email: "Email",
    form_message: "I'd like to create a landing page for my business or improve an existing website. My budget is around 60-200 EUR per month...",
    form_send: "Send",
    form_description: "Write your message and we'll reply within 24 hours",
    footer_rights: "All rights reserved.",
    footer_impressum: "Impressum",
    footer_privacy: "Privacy",
    footer_terms: "Terms",
    footer_contact: "Contact",
    pricing_title: "Transparent Pricing for Every Business",
    pricing_sub: "Choose the plan that fits your needs. You can cancel anytime.",
    pricing_starter: "Starter Package",
    pricing_plus: "Plus Package",
    pricing_pro: "Pro Package",
    pricing_per_month: "per month",
    pricing_billed: "Billed monthly, cancel anytime",
    pricing_includes: "Includes:",
    pricing_starter_items: "Landing Page Design & Development|Basic SEO Optimization|1 Content Change per Month|Security Updates|Email Support",
    pricing_plus_items: "Everything in Starter, plus:|Advanced SEO Optimization|Up to 3 Content Changes per Month|Google Analytics Setup|Monthly Performance Reports|Priority Support",
    pricing_pro_items: "Everything in Plus, plus:|Google Ads & Meta Ads Management|A/B Testing & Optimization|Custom Feature Development|Conversion Rate Optimization (CRO)|Dedicated Account Manager",
    pricing_cta: "Get Started Now",
    pricing_contact: "Have questions? Contact us for a custom offer.",
  },
  ru: {
    brand: "ABS Studio",
    experience_badge: "Цифровое агентство для лендинг-страниц",
    hero_title: "Сайты, которые растят ваш бизнес",
    hero_sub: "Современные лендинги с моделью подписки. Быстрые, адаптивные, SEO-оптимизированные и всегда поддерживаемые.",
    cta_primary: "Давайте обсудим",
    cta_secondary: "Наше предложение",
    nav_home: "Главная",
    nav_services: "Услуги",
    nav_process: "Процесс",
    nav_projects: "Проекты",
    nav_pricing: "Цены",
    nav_campaigns: "Кампании",
    nav_contact: "Контакты",
    section_services_title: "Что мы делаем",
    section_services_sub: "От идеи до поддержки – всё из одного источника.",
    s1: "Лендинги, корпоративные сайты и магазины – быстро и адаптивно.",
    s2: "Оптимизируем дизайн и UX, растим конверсии и улучшаем удержание клиентов.",
    s3: "Производительность, SEO и аналитика – чтобы ваш бизнес работал онлайн.",
    s4: "Регулярные обновления, безопасность и непрерывный рост после запуска.",
    section_process_title: "Как мы работаем",
    process_1_title: "Анализ и стратегия",
    process_1_desc: "Мы понимаем ваши цели, анализируем рынок и разработываем четкую стратегию.",
    process_2_title: "Дизайн",
    process_2_desc: "Современный UI/UX, прототипы и согласованная дизайн-система.",
    process_3_title: "Разработка",
    process_3_desc: "Адаптивный фронтенд и надежный бэкенд – созданы для производительности.",
    process_4_title: "Запуск и рост",
    process_4_desc: "Тестирование, SEO-запуск, мониторинг и непрерывная оптимизация.",
    section_projects_title: "Последние проекты",
    start_similar: "Начать похожий проект",
    contact_title: "Обсудим ваш проект",
    contact_sub: "Свяжитесь с нами через Telegram, WhatsApp или Email – ответим в течение 24 часов.",
    contact_telegram: "Telegram",
    contact_whatsapp: "WhatsApp",
    contact_email: "Email",
    contact_response_time: "Ответ в течение 24 часов",
    contact_free_consultation: "Бесплатная консультация",
    form_name: "Имя",
    form_email: "Email",
    form_message: "Я хотел бы создать лендинг для моего бизнеса или улучшить существующий сайт. Мой бюджет около 60-200 EUR в месяц...",
    form_send: "Отправить",
    form_description: "Напишите ваше сообщение и мы ответим в течение 24 часов",
    footer_rights: "Все права защищены.",
    footer_impressum: "Impressum",
    footer_privacy: "Политика конфиденциальности",
    footer_terms: "Условия",
    footer_contact: "Контакты",
    pricing_title: "Прозрачные цены для каждого бизнеса",
    pricing_sub: "Выберите план, который соответствует вашим потребностям. Вы можете отменить подписку в любой момент.",
    pricing_starter: "Пакет Starter",
    pricing_plus: "Пакет Plus",
    pricing_pro: "Пакет Pro",
    pricing_per_month: "в месяц",
    pricing_billed: "Ежемесячное выставление счета, отмена в любой момент",
    pricing_includes: "Включает:",
    pricing_starter_items: "Дизайн и разработка лендинга|Базовая оптимизация SEO|1 изменение контента в месяц|Обновления безопасности|Поддержка по email",
    pricing_plus_items: "Все из Starter, плюс:|Расширенная оптимизация SEO|до 3 изменений контента в месяц|Настройка Google Analytics|Ежемесячные отчеты о производительности|Приоритетная поддержка",
    pricing_pro_items: "Все из Plus, плюс:|Управление Google Ads и Meta Ads|A/B тестирование и оптимизация|Разработка пользовательских функций|Оптимизация коэффициента конверсии (CRO)|Выделенный менеджер аккаунта",
    pricing_cta: "Начать сейчас",
    pricing_contact: "Есть вопросы? Свяжитесь с нами для индивидуального предложения.",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "de";
    const cookieLocale = document.cookie.match(/(?:^|; )locale=([^;]+)/)?.[1];
    const saved = (localStorage.getItem("locale") as Locale | null) || (cookieLocale as Locale | null);
    if (saved === "de" || saved === "en" || saved === "ru") return saved;

    // Автоматичне визначення мови за браузером
    const lang = (navigator.language || "en").toLowerCase();

    // Перевіримо на німецькі варіанти
    if (lang.startsWith("de")) return "de";

    // Перевіримо на російські варіанти
    const ruLangs = ["ru", "uk", "be", "kk", "uz", "az", "hy", "ka", "tg", "ky", "tt"];
    if (ruLangs.some((code) => lang.startsWith(code))) return "ru";

    // За замовчуванням англійська або німецька
    return "de";
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
    // Оновити lang атрибут документа
    document.documentElement.lang = l;
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem("theme", t); } catch {}
    try { document.cookie = `theme=${t}; path=/; max-age=${60*60*24*365}`; } catch {}
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", newTheme); } catch {}
      try { document.cookie = `theme=${newTheme}; path=/; max-age=${60*60*24*365}`; } catch {}
      return newTheme;
    });
  }, []);

  const t = useCallback((key: string) => {
    const dict = DICT[locale];
    const parts = key.split(".");
    let cur: any = dict;
    for (const p of parts) cur = cur?.[p];
    return typeof cur === "string" ? cur : key;
  }, [locale]);

  // Оновити lang атрибут при зміні локалі
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, theme, setTheme, toggleTheme, t }), [locale, theme, setLocale, setTheme, toggleTheme, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
