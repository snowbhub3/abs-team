import React from "react";
import { useI18n } from "./Language";
import { useLegalModal } from "./LegalModalContext";

export default function SiteFooter() {
  const { t } = useI18n();
  const { openModal } = useLegalModal();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLegalClick = (e: React.MouseEvent<HTMLAnchorElement>, page: "impressum" | "datenschutz" | "agb") => {
    e.preventDefault();
    openModal(page);
  };

  return (
    <footer className="border-t border-white/5 py-8 sm:py-12 text-sm text-muted-foreground">
      <div className="container px-4 sm:px-6">
        <div className="space-y-6 sm:space-y-8">
          {/* Top section - Copyright and main navigation */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-xs sm:text-sm whitespace-nowrap">{new Date().getFullYear()} © ABS Studio</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 opacity-75 w-full sm:w-auto">
              <a href="#services" onClick={handleAnchorClick} className="hover:opacity-100 text-xs sm:text-sm transition-opacity py-1">{t("nav_services")}</a>
              <span className="hidden sm:inline text-foreground/40">•</span>
              <a href="#process" onClick={handleAnchorClick} className="hover:opacity-100 text-xs sm:text-sm transition-opacity py-1">{t("nav_process")}</a>
              <span className="hidden sm:inline text-foreground/40">•</span>
              <a href="#projects" onClick={handleAnchorClick} className="hover:opacity-100 text-xs sm:text-sm transition-opacity py-1">{t("nav_projects")}</a>
              <span className="hidden sm:inline text-foreground/40">•</span>
              <a href="#preise" onClick={handleAnchorClick} className="hover:opacity-100 text-xs sm:text-sm transition-opacity py-1">{t("nav_pricing")}</a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Bottom section - Legal links */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center text-xs opacity-75">
            <a href="#" onClick={(e) => handleLegalClick(e, "impressum")} className="hover:opacity-100 transition-opacity py-1 sm:py-0">
              {t("footer_impressum")}
            </a>
            <span className="hidden sm:inline text-foreground/40">•</span>
            <a href="#" onClick={(e) => handleLegalClick(e, "datenschutz")} className="hover:opacity-100 transition-opacity py-1 sm:py-0">
              {t("footer_privacy")}
            </a>
            <span className="hidden sm:inline text-foreground/40">•</span>
            <a href="#" onClick={(e) => handleLegalClick(e, "agb")} className="hover:opacity-100 transition-opacity py-1 sm:py-0">
              {t("footer_terms")}
            </a>
            <span className="hidden sm:inline text-foreground/40">•</span>
            <a href="#contact" onClick={handleAnchorClick} className="hover:opacity-100 transition-opacity py-1 sm:py-0">
              {t("footer_contact")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
