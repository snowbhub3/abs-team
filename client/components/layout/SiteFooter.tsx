import React from "react";
import { useI18n } from "./Language";
import { useLegalModal } from "./LegalModalContext";
import useEmblaCarousel from "embla-carousel-react";

export default function SiteFooter() {
  const { t, locale } = useI18n();
  const { openModal } = useLegalModal();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const sponsors = [
    {
      name: "ChatGPT",
      url: "https://chatgpt.com",
      image: "https://cdn.builder.io/api/v1/image/assets%2F9771a46ddd5946ce8be5cc856996d760%2F3ca8c9e595ac4aed981074c6d9367fc2?format=webp&width=800&height=1200",
    },
    {
      name: "Netlify",
      url: "https://www.netlify.com",
      image: "https://cdn.builder.io/api/v1/image/assets%2F9771a46ddd5946ce8be5cc856996d760%2F6ed7b100e8a24ad19f1f4297734e834e?format=webp&width=800&height=1200",
    },
  ];

  React.useEffect(() => {
    if (!emblaApi) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [emblaApi]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLegalClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: "impressum" | "datenschutz" | "agb"
  ) => {
    e.preventDefault();
    openModal(page);
  };

  return (
    <footer className="border-t border-white/5 py-8 sm:py-10 text-sm text-muted-foreground">
      <div className="container px-4 sm:px-6">
        <div className="space-y-6 sm:space-y-8">
          {/* Sponsors Carousel - Shows one logo at a time */}
          <div className="flex justify-center">
            <div className="overflow-hidden w-full max-w-xs sm:max-w-sm" ref={emblaRef}>
              <div className="flex">
                {sponsors.map((sponsor) => (
                  <div key={sponsor.name} className="flex-[0_0_100%] flex items-center justify-center min-w-0">
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center transition-transform hover:scale-105"
                      title={sponsor.name}
                    >
                      <img
                        src={sponsor.image}
                        alt={sponsor.name}
                        className="h-20 sm:h-32 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Navigation Links - Mobile: 2 columns, Desktop: 1 row */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-between gap-6 sm:gap-4 opacity-75">
            {/* Left column on mobile / Left group on desktop */}
            <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-4">
              <a
                href="#services"
                onClick={handleAnchorClick}
                className="block sm:inline hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {t("nav_services")}
              </a>
              <span className="hidden sm:inline text-foreground/30">•</span>
              <a
                href="#process"
                onClick={handleAnchorClick}
                className="block sm:inline hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {t("nav_process")}
              </a>
              <span className="hidden sm:inline text-foreground/30">•</span>
              <a
                href="#projects"
                onClick={handleAnchorClick}
                className="block sm:inline hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {t("nav_projects")}
              </a>
            </div>

            {/* Right column on mobile / Right group on desktop */}
            <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-4 sm:ml-auto text-right sm:text-left">
              <a
                href="#"
                onClick={(e) => handleLegalClick(e, "impressum")}
                className="block sm:inline hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {t("footer_impressum")}
              </a>
              <span className="hidden sm:inline text-foreground/30">•</span>
              <a
                href="#"
                onClick={(e) => handleLegalClick(e, "datenschutz")}
                className="block sm:inline hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {locale === "ru" ? "Privacy" : t("footer_privacy")}
              </a>
              <span className="hidden sm:inline text-foreground/30">•</span>
              <a
                href="#"
                onClick={(e) => handleLegalClick(e, "agb")}
                className="block sm:inline hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {t("footer_terms")}
              </a>
              <span className="hidden sm:inline text-foreground/30">•</span>
              <a
                href="#contact"
                onClick={handleAnchorClick}
                className="block sm:inline hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {t("footer_contact")}
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Copyright at bottom */}
          <div className="text-center">
            <p className="text-xs opacity-50">
              {new Date().getFullYear()} © ABS Studio. {locale === "de" ? "Alle Rechte vorbehalten." : locale === "en" ? "All rights reserved." : "Все права защищены."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
