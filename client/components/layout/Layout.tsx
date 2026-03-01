import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import WebNetwork from "@/components/effects/WebNetwork";
import CookieBanner from "@/components/misc/CookieBanner";
import { LegalModal } from "@/components/misc/LegalModal";
import { useLegalModal } from "@/components/layout/LegalModalContext";
import { useSEOMetaTags } from "@/hooks/use-seo-meta";

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-sky-200 dark:border-sky-900 border-t-sky-500 dark:border-t-sky-400 rounded-full animate-spin" />
    </div>
  );
}

export default function Layout() {
  useSEOMetaTags();
  const location = useLocation();
  const { currentModal, closeModal } = useLegalModal();

  // Scroll to top on page change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <div className="relative min-h-screen bg-background text-foreground">
        <WebNetwork />
        <SiteHeader />
        <main className="relative z-10" style={{ paddingTop: "calc(4rem + env(safe-area-inset-top))" }}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
        <SiteFooter />
      </div>
      {/* CookieBanner rendered at document root level */}
      <CookieBanner />
      {/* Legal Modals */}
      {currentModal && (
        <LegalModal type={currentModal} open={true} onClose={closeModal} />
      )}
    </>
  );
}
