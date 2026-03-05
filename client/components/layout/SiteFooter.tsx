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
      name: "Builder.io",
      url: "https://www.builder.io",
      icon: (
        <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" rx="40" fill="#5E5EC6" />
          <text x="100" y="120" textAnchor="middle" fontSize="80" fontWeight="900" fill="white" fontFamily="Arial">
            B
          </text>
        </svg>
      ),
    },
    {
      name: "Netlify",
      url: "https://www.netlify.com",
      icon: (
        <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="200" rx="40" fill="#00C7B7" />
          <text x="100" y="120" textAnchor="middle" fontSize="80" fontWeight="900" fill="white" fontFamily="Arial">
            N
          </text>
        </svg>
      ),
    },
  ];

  React.useEffect(() => {
    if (!emblaApi) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

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
          {/* Sponsors Carousel */}
          <div className="flex justify-center">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6 sm:gap-8">
                {sponsors.map((sponsor) => (
                  <div key={sponsor.name} className="flex-[0_0_auto]">
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center p-2 sm:p-3 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                      title={sponsor.name}
                    >
                      {sponsor.icon}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Navigation Links - Single row on desktop, two columns on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-8">
            {/* Left Column / Row */}
            <div className="flex flex-wrap gap-3 sm:gap-4 opacity-75">
              <a
                href="#services"
                onClick={handleAnchorClick}
                className="hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {t("nav_services")}
              </a>
              <span className="text-foreground/30">•</span>
              <a
                href="#process"
                onClick={handleAnchorClick}
                className="hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {t("nav_process")}
              </a>
              <span className="text-foreground/30">•</span>
              <a
                href="#projects"
                onClick={handleAnchorClick}
                className="hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {t("nav_projects")}
              </a>
            </div>

            {/* Right Column / Row - Right aligned */}
            <div className="flex flex-wrap gap-3 sm:gap-4 opacity-75 sm:justify-end">
              <a
                href="#"
                onClick={(e) => handleLegalClick(e, "impressum")}
                className="hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {t("footer_impressum")}
              </a>
              <span className="text-foreground/30">•</span>
              <a
                href="#"
                onClick={(e) => handleLegalClick(e, "datenschutz")}
                className="hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {locale === "ru" ? "Privacy" : t("footer_privacy")}
              </a>
              <span className="text-foreground/30">•</span>
              <a
                href="#"
                onClick={(e) => handleLegalClick(e, "agb")}
                className="hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
              >
                {t("footer_terms")}
              </a>
              <span className="text-foreground/30">•</span>
              <a
                href="#contact"
                onClick={handleAnchorClick}
                className="hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap"
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
