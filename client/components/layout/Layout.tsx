import React from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import WebNetwork from "@/components/effects/WebNetwork";
import CookieBanner from "@/components/misc/CookieBanner";

export default function Layout() {
  return (
    <>
      <div className="relative min-h-screen bg-background text-foreground">
        <WebNetwork />
        <SiteHeader />
        <main className="relative z-10" style={{ paddingTop: "calc(4rem + env(safe-area-inset-top))" }}>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      {/* CookieBanner rendered at document root level */}
      <CookieBanner />
    </>
  );
}
