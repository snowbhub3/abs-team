import React from "react";
import { useI18n } from "./Language";

export default function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-white/5 py-10 text-sm text-muted-foreground">
      <div className="container space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ABS Studio. {t("footer_rights")}</p>
          <div className="flex items-center gap-3 opacity-75 flex-wrap">
            <a href="#services" className="hover:opacity-100">{t("nav_services")}</a>
            <span>•</span>
            <a href="#process" className="hover:opacity-100">{t("nav_process")}</a>
            <span>•</span>
            <a href="#projects" className="hover:opacity-100">{t("nav_projects")}</a>
            <span>•</span>
            <a href="/preise" className="hover:opacity-100">{t("nav_pricing")}</a>
          </div>
        </div>
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs">
          <a href="/impressum" className="hover:opacity-100">{t("footer_impressum")}</a>
          <span>•</span>
          <a href="/datenschutz" className="hover:opacity-100">{t("footer_privacy")}</a>
          <span>•</span>
          <a href="/agb" className="hover:opacity-100">{t("footer_terms")}</a>
          <span>•</span>
          <a href="#contact" className="hover:opacity-100">{t("footer_contact")}</a>
        </div>
      </div>
    </footer>
  );
}
