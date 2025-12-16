import { useEffect } from "react";
import { useI18n } from "@/components/layout/Language";

type Locale = "en" | "ru";

const metaDescriptions: Record<Locale, string> = {
  en: "abs team: Expert freelance developers creating fast, responsive websites and apps. Full-stack web development, UI/UX design, optimization, and SEO services.",
  ru: "abs team: Команда фриланс-разработчиков создающая быстрые и адаптивные сайты и приложения. Полноценная веб-разработка, дизайн, оптимизация и поддержка.",
};

const metaTitles: Record<Locale, string> = {
  en: "abs team — Freelance Developers | Web Design & Development Services",
  ru: "abs team — Фриланс разработчики | Веб-дизайн и разработка сайтов",
};

const metaKeywords: Record<Locale, string> = {
  en: "web development, web design, freelance developers, responsive design, frontend development, backend development, optimization, SEO",
  ru: "веб-разработка, веб-дизайн, фриланс разработчики, адаптивный дизайн, фронтенд разработка, бэкенд разработка, оптимизация, SEO",
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
      ogTitle.setAttribute(
        "content",
        locale === "en"
          ? "abs team — Freelance Web Development & Design Services"
          : "abs team — Услуги фриланс веб-разработки и дизайна"
      );
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        "content",
        locale === "en"
          ? "We build websites that grow your business. Full-stack development, design, optimization & support."
          : "Мы создаём сайты, которые растят ваш бизнес. Полная разработка, дизайн, оптимизация и поддержка."
      );
    }

    // Update og:locale
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute("content", locale === "en" ? "en_US" : "ru_RU");
    }

    // Update twitter:title and description
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute(
        "content",
        locale === "en" ? "abs team — Freelance Web Development" : "abs team — Фриланс веб-разработка"
      );
    }

    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute(
        "content",
        locale === "en"
          ? "Expert web developers building fast, responsive websites and apps."
          : "Эксперт-разработчики создают быстрые и адаптивные сайты и приложения."
      );
    }
  }, [locale]);
}
