import React from "react";
import { useI18n } from "./Language";
import { useLegalModal } from "./LegalModalContext";
import useEmblaCarousel from "embla-carousel-react";
import { ExternalLink } from "lucide-react";

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
        <svg className="h-6 w-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <svg className="h-6 w-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <footer className="border-t border-white/5 py-12 sm:py-16 text-sm text-muted-foreground">
      <div className="container px-4 sm:px-6">
        <div className="space-y-10 sm:space-y-12">
          {/* Sponsors Carousel */}
          <div className="max-w-md mx-auto">
            <div className="text-center text-xs uppercase tracking-widest text-foreground/50 mb-6">
              {locale === "de" ? "Vertraut von" : locale === "en" ? "Trusted by" : "Доверяют нам"}
            </div>
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
              <div className="flex">
                {sponsors.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className="flex-[0_0_100%] flex items-center justify-center px-4"
                  >
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-6 py-4 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                    >
                      {sponsor.icon}
                      <span className="font-semibold text-foreground">{sponsor.name}</span>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Two Column Navigation */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 max-w-2xl mx-auto">
            {/* Column 1 */}
            <div className="space-y-4">
              <div className="text-foreground/60 text-xs uppercase tracking-widest font-medium">
                {locale === "de" ? "Services" : locale === "en" ? "Services" : "Услуги"}
              </div>
              <div className="space-y-3 opacity-75">
                <a
                  href="#services"
                  onClick={handleAnchorClick}
                  className="block hover:opacity-100 transition-opacity text-sm"
                >
                  {t("nav_services")}
                </a>
                <a
                  href="#process"
                  onClick={handleAnchorClick}
                  className="block hover:opacity-100 transition-opacity text-sm"
                >
                  {t("nav_process")}
                </a>
                <a
                  href="#projects"
                  onClick={handleAnchorClick}
                  className="block hover:opacity-100 transition-opacity text-sm"
                >
                  {t("nav_projects")}
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div className="text-foreground/60 text-xs uppercase tracking-widest font-medium">
                {locale === "de" ? "Rechtliches" : locale === "en" ? "Legal" : "Правовая"}
              </div>
              <div className="space-y-3 opacity-75">
                <a
                  href="#"
                  onClick={(e) => handleLegalClick(e, "impressum")}
                  className="block hover:opacity-100 transition-opacity text-sm"
                >
                  {t("footer_impressum")}
                </a>
                <a
                  href="#"
                  onClick={(e) => handleLegalClick(e, "datenschutz")}
                  className="block hover:opacity-100 transition-opacity text-sm"
                >
                  {t("footer_privacy")}
                </a>
                <a
                  href="#"
                  onClick={(e) => handleLegalClick(e, "agb")}
                  className="block hover:opacity-100 transition-opacity text-sm"
                >
                  {t("footer_terms")}
                </a>
              </div>
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
