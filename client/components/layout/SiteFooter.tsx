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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4">
            <p className="text-xs sm:text-sm">{new Date().getFullYear()} © ABS Studio. {t("footer_rights")}</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 opacity-75">
              <a href="#services" onClick={handleAnchorClick} className="hover:opacity-100 text-xs sm:text-sm">{t("nav_services")}</a>
              <span className="text-foreground/40">•</span>
              <a href="#process" onClick={handleAnchorClick} className="hover:opacity-100 text-xs sm:text-sm">{t("nav_process")}</a>
              <span className="text-foreground/40">•</span>
              <a href="#projects" onClick={handleAnchorClick} className="hover:opacity-100 text-xs sm:text-sm">{t("nav_projects")}</a>
              <span className="text-foreground/40">•</span>
              <a href="#preise" onClick={handleAnchorClick} className="hover:opacity-100 text-xs sm:text-sm">{t("nav_pricing")}</a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Bottom section - Legal links */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-start sm:justify-center text-xs opacity-75">
            <a href="#" onClick={(e) => handleLegalClick(e, "impressum")} className="hover:opacity-100 transition-opacity">
              {t("footer_impressum")}
            </a>
            <span className="text-foreground/40">•</span>
            <a href="#" onClick={(e) => handleLegalClick(e, "datenschutz")} className="hover:opacity-100 transition-opacity">
              {t("footer_privacy")}
            </a>
            <span className="text-foreground/40">•</span>
            <a href="#" onClick={(e) => handleLegalClick(e, "agb")} className="hover:opacity-100 transition-opacity">
              {t("footer_terms")}
            </a>
            <span className="text-foreground/40">•</span>
            <a href="#contact" onClick={handleAnchorClick} className="hover:opacity-100 transition-opacity">
              {t("footer_contact")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
