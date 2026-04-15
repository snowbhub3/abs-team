import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useI18n } from "@/components/layout/Language";
import { ArrowRight, Sparkles, Rocket, LineChart, PenTool, Shield, Mail } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { PricingCarousel } from "@/components/sections/PricingCarousel";

export default function Index() {
  const { t } = useI18n();
  const { toast } = useToast();
  const msgRef = useRef<HTMLTextAreaElement | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [showContactButtons, setShowContactButtons] = useState(false);
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  const toggleFlip = (cardId: string) => {
    // Очищуємо стариїший timeout якщо існує
    if (timeoutsRef.current[cardId]) {
      clearTimeout(timeoutsRef.current[cardId]);
    }

    // Додаємо клас анімації
    setFlippedCards((prev) => new Set([...prev, cardId]));

    // Видаляємо клас після анімації (800ms)
    timeoutsRef.current[cardId] = setTimeout(() => {
      setFlippedCards((prev) => {
        const next = new Set(prev);
        next.delete(cardId);
        return next;
      });
    }, 800);
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setShowContactButtons(true);
  };

  const sendViaWhatsApp = () => {
    const text = msgRef.current?.value?.trim() || "Привіт! Я зацікавлений у ваших послугах.";
    const phone = "4915214723000";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
    setTimeout(() => {
      setShowContactButtons(false);
      if (msgRef.current) msgRef.current.value = "";
    }, 500);
  };

  const sendViaTelegram = () => {
    const text = msgRef.current?.value?.trim() || "Привіт! Я зацікавлений у ваших послугах.";
    // Telegram doesn't support phone numbers directly, using web.telegram.org share
    const url = `https://t.me/share/url?url=&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
    setTimeout(() => {
      setShowContactButtons(false);
      if (msgRef.current) msgRef.current.value = "";
    }, 500);
  };

  const sendViaEmail = () => {
    const text = msgRef.current?.value?.trim() || "Привіт! Я зацікавлений у ваших послугах.";
    const email = "dmytroshapovaliuk.de@gmail.com";
    const subject = "Контактна форма сайту";
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.open(url);
    setTimeout(() => {
      setShowContactButtons(false);
      if (msgRef.current) msgRef.current.value = "";
    }, 500);
  };

  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          (e.target as HTMLElement).dataset.inview = "true";
          io.unobserve(e.target);
        }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div id="home" className="relative">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center py-12 sm:py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.7),transparent_40%),radial-gradient(600px_200px_at_50%_0px,rgba(56,189,248,0.25),transparent)] bg-[radial-gradient(800px_300px_at_50%_0px,rgba(14,165,233,0.10),transparent)]" />
        </div>
        <div className="container text-center max-w-4xl px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80">
            <Sparkles className="h-3.5 w-3.5" /> {t("experience_badge")}
          </span>
          <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            {t("hero_title")}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            {t("hero_sub")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="#contact" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-10 px-4 text-sm sm:h-11 sm:px-6 sm:text-base bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/25">
                {t("cta_primary")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#projects" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto h-10 px-4 text-sm sm:h-11 sm:px-6 sm:text-base bg-white/5 hover:bg-white/10 border-white/10">
                {t("cta_secondary")}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services - What we do */}
      <section id="services" className="relative py-12 sm:py-16 lg:py-32">
        <div className="container px-4 sm:px-6">
          <div className="mb-8 sm:mb-12 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 lg:mb-4">{t("section_services_title")}</h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl">{t("section_services_sub")}</p>
          </div>
          <div className="flex-1 flex items-center">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
              {[
                { id: "service-0", icon: <Rocket className="h-6 w-6" />, text: t("s1") },
                { id: "service-1", icon: <PenTool className="h-6 w-6" />, text: t("s2") },
                { id: "service-2", icon: <LineChart className="h-6 w-6" />, text: t("s3") },
                { id: "service-3", icon: <Shield className="h-6 w-6" />, text: t("s4") },
              ].map((item, i) => {
                const isAnimating = flippedCards.has(item.id);
                return (
                  <Card
                    key={item.id}
                    onClick={() => toggleFlip(item.id)}
                    data-reveal
                    style={{ transitionDelay: `${i * 80}ms` }}
                    className={`flip-card group relative overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] p-6 h-56 lg:h-72 hover:bg-black/10 dark:hover:bg-white/[0.06] cursor-pointer opacity-0 translate-y-4 data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 data-[inview=true]:transition-all data-[inview=true]:duration-700 ${
                      isAnimating ? "flipped" : ""
                    }`}
                  >
                    <div className="flip-card-content flex flex-col h-full justify-center items-center text-center">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-cyan-500/15 text-cyan-300">
                        {item.icon}
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                    <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-500/10 blur-2xl transition-transform group-hover:scale-125" />
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process - How we work */}
      <section id="process" className="relative py-12 sm:py-16 lg:py-32 bg-white/[0.02]">
        <div className="container px-4 sm:px-6">
          <div className="mb-8 sm:mb-12 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 lg:mb-4">{t("section_process_title")}</h2>
          </div>
          <div className="flex-1 flex items-center">
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
              {[1, 2, 3, 4].map((n, i) => {
                const cardId = `process-${n}`;
                const isAnimating = flippedCards.has(cardId);
                return (
                  <li
                    key={n}
                    onClick={() => toggleFlip(cardId)}
                    data-reveal
                    style={{ transitionDelay: `${i * 90}ms` }}
                    className={`flip-card relative flex flex-col rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] p-6 h-64 sm:h-72 lg:h-80 hover:border-cyan-500/30 hover:bg-black/8 dark:hover:bg-white/[0.05] cursor-pointer opacity-0 translate-y-4 data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 data-[inview=true]:transition-all data-[inview=true]:duration-700 ${
                      isAnimating ? "flipped" : ""
                    }`}
                  >
                    <span className="pointer-events-none select-none absolute top-4 right-4 sm:top-auto sm:bottom-6 sm:right-6 text-3xl sm:text-6xl lg:text-7xl font-black text-black/10 dark:text-white/10 leading-none">
                      {String(n).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col h-full">
                      <h3 className="text-base lg:text-lg font-semibold relative z-10 mb-2 lg:mb-3">
                        {t(`process_${n}_title`)}
                      </h3>
                      <p className="text-sm lg:text-base text-foreground leading-relaxed flex-1">
                        {t(`process_${n}_desc`)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative py-12 sm:py-16 lg:py-32">
        <div className="container px-4 sm:px-6">
          <div className="mb-8 sm:mb-12 lg:mb-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold">{t("section_projects_title")}</h2>
              <a href="#contact" className="text-xs sm:text-sm rounded-md border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10 whitespace-nowrap">
                {t("start_similar")}
              </a>
            </div>
          </div>
          <div className="flex-1 flex items-center">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
              {[
                { name: "Template Williams", href: "https://www.template-williams.de.rs/", img: "https://image.thum.io/get/width/1200/https://www.template-williams.de.rs/" },
                { name: "Template Creation", href: "https://www.template-creation.de.rs/", img: "https://image.thum.io/get/width/1200/https://www.template-creation.de.rs/" },
                { name: "Template Transportable", href: "https://www.template-transportable.de.rs/", img: "https://image.thum.io/get/width/1200/https://www.template-transportable.de.rs/" },
                { name: "Isabella Harris", href: "https://www.isabellaharris.org/", img: "https://image.thum.io/get/width/1200/https://www.isabellaharris.org/" },
                { name: "Template Benson", href: "https://www.template-benson.de.rs/", img: "https://image.thum.io/get/width/1200/https://www.template-benson.de.rs/" },
                { name: "Gotham", href: "https://gotham.com.ua/", img: "https://image.thum.io/get/width/1200/https://gotham.com.ua/" },
              ].map((item, i) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  data-reveal
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className="project-card group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.035] transition-all duration-700 ease-out opacity-0 translate-y-4 active:scale-[0.985] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-black/5">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{item.name}</p>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Landing • SEO • Animations</p>
                  </div>
                  <div className="absolute right-[-20%] top-[-20%] h-40 w-40 rounded-full bg-sky-500/10 blur-2xl" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingCarousel />

      {/* Contact */}
      <section id="contact" className="relative flex flex-col justify-center py-12 sm:py-16 lg:py-24 bg-white/[0.02]">
        <div className="container px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6">{t("contact_title")}</h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">{t("contact_sub")}</p>
            </div>


            {/* Message form */}
            <div className="max-w-2xl mx-auto mt-8 sm:mt-12 relative">
              <form onSubmit={send} className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-white/[0.1] dark:via-white/[0.06] dark:to-white/[0.02] backdrop-blur-xl p-6 sm:p-8 shadow-2xl hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300">
                {/* Decorative gradient */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">{t("contact_free_consultation")}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{t("form_description")}</p>

                  <Textarea
                    ref={msgRef}
                    placeholder={t("form_message")}
                    rows={8}
                    className="w-full bg-white/50 dark:bg-white/[0.05] backdrop-blur-sm border border-black/10 dark:border-white/10 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/40 placeholder:text-foreground/50 text-foreground rounded-xl resize-none transition-all duration-200 mb-6"
                  />

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-sky-500 via-sky-500 to-cyan-500 hover:from-sky-400 hover:via-sky-400 hover:to-cyan-400 text-white h-12 sm:h-13 font-bold shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all duration-200 active:scale-95 whitespace-nowrap px-8"
                    >
                      {showContactButtons ? "Выбери канал..." : "Отправить"}
                    </Button>
                  </div>
                </div>
              </form>

              {/* Animated Contact Buttons */}
              <div className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${showContactButtons ? "pointer-events-auto opacity-100" : "opacity-0"}`} style={{ zIndex: showContactButtons ? 1000 : -1 }}>
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setShowContactButtons(false)}
                  style={{ opacity: showContactButtons ? 1 : 0 }}
                />

                {/* Buttons Container - Fixed positioning for mobile */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* WhatsApp Button - Left */}
                  <button
                    onClick={sendViaWhatsApp}
                    className="absolute pointer-events-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 hover:from-green-300 hover:to-green-700 hover:scale-110 shadow-2xl shadow-green-500/60 flex items-center justify-center text-white font-bold transition-all duration-300"
                    style={{
                      animationName: showContactButtons ? "popIn" : "popOut",
                      animationDuration: showContactButtons ? "0.5s" : "0.3s",
                      animationTimingFunction: showContactButtons ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "ease-in",
                      animationFillMode: showContactButtons ? "both" : "forwards",
                      animationDelay: "0.1s",
                      "--tx": "-120px",
                      "--ty": "0px",
                    } as React.CSSProperties}
                    title="WhatsApp"
                  >
                    <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.934 1.239c-1.506.906-2.73 2.217-3.522 3.756-.852 1.712-1.247 3.581-.997 5.514.25 1.933 1.058 3.731 2.368 5.165 1.31 1.434 3.02 2.446 4.934 2.959 2.49.75 5.245.49 7.556-.801 1.4-.789 2.617-1.932 3.502-3.261.915-1.401 1.431-2.984 1.596-4.611.165-1.627-.052-3.304-.567-4.848-.534-1.628-1.479-3.074-2.768-4.204-1.289-1.13-2.915-1.944-4.656-2.407-.982-.253-1.994-.35-3.009-.282z"/>
                    </svg>
                  </button>

                  {/* Telegram Button - Top Center */}
                  <button
                    onClick={sendViaTelegram}
                    className="absolute pointer-events-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 hover:from-sky-300 hover:to-sky-700 hover:scale-110 shadow-2xl shadow-sky-500/60 flex items-center justify-center text-white font-bold transition-all duration-300"
                    style={{
                      animationName: showContactButtons ? "popIn" : "popOut",
                      animationDuration: showContactButtons ? "0.5s" : "0.3s",
                      animationTimingFunction: showContactButtons ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "ease-in",
                      animationFillMode: showContactButtons ? "both" : "forwards",
                      animationDelay: "0.2s",
                      "--tx": "0px",
                      "--ty": "-140px",
                    } as React.CSSProperties}
                    title="Telegram"
                  >
                    <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.894 8.221l-1.97 9.28c-.145.658-.537.82-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.393 0-.64-.247-.64-.64V9.6c0-.314.251-.571.56-.571h.005c4.782 1.396 8.955 2.605 8.181-4.32z"/>
                    </svg>
                  </button>

                  {/* Email Button - Right */}
                  <button
                    onClick={sendViaEmail}
                    className="absolute pointer-events-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-400 to-orange-600 hover:from-red-300 hover:to-orange-700 hover:scale-110 shadow-2xl shadow-red-500/60 flex items-center justify-center text-white font-bold transition-all duration-300"
                    style={{
                      animationName: showContactButtons ? "popIn" : "popOut",
                      animationDuration: showContactButtons ? "0.5s" : "0.3s",
                      animationTimingFunction: showContactButtons ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "ease-in",
                      animationFillMode: showContactButtons ? "both" : "forwards",
                      animationDelay: "0.3s",
                      "--tx": "120px",
                      "--ty": "0px",
                    } as React.CSSProperties}
                    title="Email"
                  >
                    <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </button>
                </div>

                <style>{`
                  @keyframes popIn {
                    0% {
                      opacity: 0;
                      transform: translate(0, 0) scale(0);
                    }
                    100% {
                      opacity: 1;
                      transform: translate(var(--tx), var(--ty)) scale(1);
                    }
                  }
                  @keyframes popOut {
                    0% {
                      opacity: 1;
                      transform: translate(var(--tx), var(--ty)) scale(1);
                    }
                    100% {
                      opacity: 0;
                      transform: translate(0, 0) scale(0);
                    }
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
