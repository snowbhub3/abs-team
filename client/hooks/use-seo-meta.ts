import { useEffect } from "react";
import { useI18n } from "@/components/layout/Language";

type Locale = "de" | "en" | "ru";

const metaDescriptions: Record<Locale, string> = {
  de: "ABS Studio: Digitale Agentur für moderne Landing Pages und Websites mit Abo-Modell. Schnelle, SEO-optimierte Websites mit professioneller Betreuung für Dortmund und Deutschland.",
  en: "ABS Studio: Digital agency for modern landing pages and websites with subscription model. Fast, SEO-optimized websites with professional support across Germany.",
  ru: "ABS Studio: Цифровое агентство для современных лендинг-страниц и веб-сайтов с моделью подписки. Быстрые, SEO-оптимизированные сайты с профессиональной поддержкой.",
};

const metaTitles: Record<Locale, string> = {
  de: "ABS Studio — Digitale Agentur | Landing Pages und Website-Abo für Dortmund",
  en: "ABS Studio — Digital Agency | Landing Pages and Website Subscription",
  ru: "ABS Studio — Цифровое агентство | Лендинги и веб-сайты на подписке",
};

const metaKeywords: Record<Locale, string> = {
  de: "Landingpage erstellen lassen Dortmund, Website Betreuung Abo, Digitale Agentur, Website Design, Webentwicklung NRW, Landing Page Agentur, SEO Optimierung, Website Hosting",
  en: "landing page creation, website subscription, digital agency, web design, web development, SEO optimization, website design, hosting",
  ru: "лендинг-страницы, веб-сайты на подписке, цифровое агентство, веб-дизайн, веб-разработка, SEO оптимизация, хостинг",
};

export function useSEOMetaTags() {
  const { locale } = useI18n();

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = locale;

    // Update title
    document.title = metaTitles[locale];

    // Update or create description meta tag
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", metaDescriptions[locale]);

    // Update or create keywords meta tag
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement("meta");
      keywordsTag.setAttribute("name", "keywords");
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute("content", metaKeywords[locale]);

    // Update og:title and og:description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      const ogTitles: Record<Locale, string> = {
        de: "ABS Studio — Digitale Agentur für Landing Pages und Websites",
        en: "ABS Studio — Digital Agency for Landing Pages and Websites",
        ru: "ABS Studio — Цифровое агентство для лендинг-страниц и веб-сайтов",
      };
      ogTitle.setAttribute("content", ogTitles[locale]);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      const ogDescs: Record<Locale, string> = {
        de: "Moderne Landing Pages und Websites mit Abo-Modell. Schnell, SEO-optimiert und immer betreut. Jetzt kostenlosen Termin buchen!",
        en: "Modern landing pages and websites with subscription model. Fast, SEO-optimized and always supported. Book a free consultation now!",
        ru: "Современные лендинги и веб-сайты с моделью подписки. Быстрые, SEO-оптимизированные и всегда поддерживаемые. Забронируйте бесплатную консультацию!",
      };
      ogDescription.setAttribute("content", ogDescs[locale]);
    }

    // Update og:locale
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      const localeMap: Record<Locale, string> = { de: "de_DE", en: "en_US", ru: "ru_RU" };
      ogLocale.setAttribute("content", localeMap[locale]);
    }

    // Update twitter:title and description
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      const twTitles: Record<Locale, string> = {
        de: "ABS Studio — Digital Agency für Landing Pages",
        en: "ABS Studio — Digital Agency for Landing Pages",
        ru: "ABS Studio — Цифровое агентство для лендинг-страниц",
      };
      twitterTitle.setAttribute("content", twTitles[locale]);
    }

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      const twDescs: Record<Locale, string> = {
        de: "Websites auf Abo. Modern, schnell, SEO-optimiert. Jetzt informieren!",
        en: "Websites on subscription. Modern, fast, SEO-optimized. Learn more!",
        ru: "Веб-сайты на подписке. Современные, быстрые, SEO-оптимизированные. Узнайте больше!",
      };
      twitterDesc.setAttribute("content", twDescs[locale]);
    }
  }, [locale]);
}
