import React from "react";
import { useI18n } from "./Language";

export default function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-white/5 py-10 text-sm text-muted-foreground">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} abs team. {t("footer_rights")}</p>
        <div className="flex items-center gap-3 opacity-75">
          <a href="#services" className="hover:opacity-100">{t("nav_services")}</a>
          <span>•</span>
          <a href="#process" className="hover:opacity-100">{t("nav_process")}</a>
          <span>•</span>
          <a href="#projects" className="hover:opacity-100">{t("nav_projects")}</a>
        </div>
      </div>
    </footer>
  );
}
