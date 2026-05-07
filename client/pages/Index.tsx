import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/components/layout/Language";
import { ArrowRight, Sparkles, Rocket, LineChart, PenTool, Shield, X, ExternalLink } from "lucide-react";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PricingCarousel } from "@/components/sections/PricingCarousel";
import { ContactButtonsWithDock } from "@/components/sections/ContactButtonsWithDock";

type ProjectItem = {
  name: string;
  href: string;
  accent: string;
  shot: string;
};

const projects: ProjectItem[] = [
  { name: "Template Williams", href: "https://www.template-williams.de.rs/", accent: "from-sky-500/25 to-cyan-400/10", shot: "/project-shots/template-williams.png" },
  { name: "Template Creation", href: "https://www.template-creation.de.rs/", accent: "from-cyan-500/25 to-blue-400/10", shot: "/project-shots/template-creation.png" },
  { name: "Template Transportable", href: "https://www.template-transportable.de.rs/", accent: "from-blue-500/25 to-sky-300/10", shot: "/project-shots/template-transportable.png" },
  { name: "Isabella Harris", href: "https://www.isabellaharris.org/", accent: "from-sky-400/25 to-indigo-400/10", shot: "/project-shots/isabella-harris.png" },
  { name: "Template Benson", href: "https://www.template-benson.de.rs/", accent: "from-cyan-400/25 to-sky-500/10", shot: "/project-shots/template-benson.png" },
  { name: "Gotham", href: "https://gotham.com.ua/", accent: "from-blue-400/25 to-cyan-500/10", shot: "/project-shots/gotham.png" },
];

export default function Index() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const msgRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [showContactButtons, setShowContactButtons] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  React.useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-gsap='hero']",
        { y: 24, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.08, ease: "power3.out" }
      );

      gsap.utils.toArray<HTMLElement>("[data-gsap='rise']").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              once: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

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

  const dismissKeyboard = () => {
    msgRef.current?.blur();
  };

  const openProject = (project: ProjectItem) => {
    const cardId = `project-${project.name}`;
    if (timeoutsRef.current[cardId]) {
      clearTimeout(timeoutsRef.current[cardId]);
    }

    setFlippedCards((prev) => new Set([...prev, cardId]));

    timeoutsRef.current[cardId] = setTimeout(() => {
      setFlippedCards((prev) => {
        const next = new Set(prev);
        next.delete(cardId);
        return next;
      });
      setSelectedProject(project);
    }, 760);
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

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showContactButtons && formRef.current && !formRef.current.contains(e.target as Node)) {
        setShowContactButtons(false);
      }
    };

    if (showContactButtons) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showContactButtons]);

  return (
    <div ref={rootRef} id="home" className="relative">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center py-12 sm:py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.7),transparent_40%),radial-gradient(600px_200px_at_50%_0px,rgba(56,189,248,0.25),transparent)] bg-[radial-gradient(800px_300px_at_50%_0px,rgba(14,165,233,0.10),transparent)]" />
        </div>
        <div className="container text-center max-w-4xl px-4 sm:px-6">
          <span data-gsap="hero" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80">
            <Sparkles className="h-3.5 w-3.5" /> {t("experience_badge")}
          </span>
          <h1 data-gsap="hero" className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            {t("hero_title")}
          </h1>
          <p data-gsap="hero" className="mt-4 text-base sm:text-lg text-muted-foreground">
            {t("hero_sub")}
          </p>
          <div data-gsap="hero" className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
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
          <div data-gsap="rise" className="mb-8 sm:mb-12 lg:mb-20">
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
          <div data-gsap="rise" className="mb-8 sm:mb-12 lg:mb-20">
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
          <div data-gsap="rise" className="mb-8 sm:mb-12 lg:mb-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold">{t("section_projects_title")}</h2>
              <a href="#contact" className="text-xs sm:text-sm rounded-md border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10 whitespace-nowrap">
                {t("start_similar")}
              </a>
            </div>
          </div>
          <div className="flex-1 flex items-center">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
              {projects.map((item, i) => {
                const cardId = `project-${item.name}`;
                const isAnimating = flippedCards.has(cardId);

                return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => openProject(item)}
                  data-reveal
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className={`flip-card group relative overflow-hidden rounded-xl border border-black/10 bg-black/5 text-left transition-all duration-500 ease-out opacity-0 translate-y-4 active:scale-[0.985] hover:border-sky-400/35 hover:bg-black/10 data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 dark:border-white/10 dark:bg-white/[0.035] dark:hover:bg-white/[0.06] ${
                    isAnimating ? "flipped" : ""
                  }`}
                >
                  <div className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${item.accent}`}>
                    <div className="absolute inset-3 overflow-hidden rounded-lg border border-white/10 bg-slate-950 shadow-2xl shadow-black/25 sm:inset-4">
                      <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-slate-950/95 px-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                        <span className="ml-3 h-2 w-20 rounded-full bg-white/10 sm:w-24" />
                      </div>
                      <img
                        src={item.shot}
                        alt={`${item.name} preview`}
                        loading="lazy"
                        decoding="async"
                        className="h-[calc(100%-2rem)] w-full object-cover object-top"
                      />
                    </div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(56,189,248,.25),transparent_34%)]" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{item.name}</p>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Landing • SEO • Animations</p>
                  </div>
                  <div className="absolute right-[-20%] top-[-20%] h-40 w-40 rounded-full bg-sky-500/10 blur-2xl" />
                </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingCarousel />

      {/* Contact */}
      <section id="contact" className="relative flex flex-col justify-center py-10 sm:py-16 lg:py-24 bg-white/[0.02]">
        <div className="container px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div data-gsap="rise" className="text-center mb-6 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 lg:mb-6">{t("contact_title")}</h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">{t("contact_sub")}</p>
            </div>


            {/* Message form */}
            <div className="max-w-4xl mx-auto mt-6 sm:mt-12 relative">
              <form ref={formRef} onSubmit={send} className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-white/[0.1] dark:via-white/[0.06] dark:to-white/[0.02] backdrop-blur-xl p-5 sm:p-12 shadow-2xl hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 ${showContactButtons ? "relative z-50" : ""}`}>
                {/* Decorative gradient */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-sky-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-4 flex items-start justify-between gap-4 sm:mb-8">
                    <div>
                      <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3 text-foreground">{t("contact_free_consultation")}</h3>
                      <p className="text-sm sm:text-lg text-muted-foreground">{t("form_description")}</p>
                    </div>
                    <button
                      type="button"
                      onClick={dismissKeyboard}
                      className="mt-1 shrink-0 rounded-md border border-black/10 bg-black/5 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground dark:border-white/10 dark:bg-white/5 sm:hidden"
                    >
                      OK
                    </button>
                  </div>

                  <Textarea
                    ref={msgRef}
                    placeholder={t("form_message")}
                    rows={6}
                    onBlur={() => window.scrollTo({ top: window.scrollY, behavior: "auto" })}
                    className="mb-5 h-[34dvh] min-h-36 max-h-56 w-full resize-none rounded-2xl border border-black/10 bg-white/50 p-4 text-base text-foreground backdrop-blur-sm transition-all duration-200 placeholder:text-foreground/50 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/40 dark:border-white/10 dark:bg-white/[0.05] sm:mb-8 sm:h-64 sm:max-h-none sm:p-6"
                  />

                  <div className="flex justify-center items-center min-h-20 sm:min-h-28">
                    {/* Send Button */}
                    <Button
                      type="submit"
                      className={`bg-gradient-to-r from-sky-500 via-sky-500 to-cyan-500 hover:from-sky-400 hover:via-sky-400 hover:to-cyan-400 text-white h-12 sm:h-16 font-bold shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all duration-300 active:scale-95 whitespace-nowrap px-8 sm:px-10 text-base sm:text-lg rounded-xl sm:rounded-2xl absolute ${showContactButtons ? "opacity-0 scale-0 pointer-events-none" : "opacity-100 scale-100"}`}
                    >
                      {t("form_send")}
                    </Button>

                    {/* Social Buttons - appear in place of send button */}
                    {showContactButtons && (
                      <ContactButtonsWithDock
                        onEmail={sendViaEmail}
                        onWhatsApp={sendViaWhatsApp}
                        onTelegram={sendViaTelegram}
                      />
                    )}
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center bg-black/70 px-3 pb-3 pt-20 backdrop-blur-md sm:px-6 sm:pb-6 sm:pt-24">
          <div
            className="relative flex h-[calc(100dvh-6rem)] w-full max-w-6xl origin-center flex-col overflow-hidden rounded-2xl border border-white/15 bg-background shadow-2xl shadow-sky-500/15 sm:h-[calc(100dvh-7.5rem)]"
            ref={(node) => {
              if (!node) return;
              gsap.fromTo(
                node,
                { scale: 0.9, y: 28, opacity: 0, filter: "blur(10px)" },
                { scale: 1, y: 0, opacity: 1, filter: "blur(0px)", duration: 0.42, ease: "back.out(1.35)" }
              );
            }}
          >
            <div className="flex min-h-14 items-center justify-between gap-3 border-b border-black/10 px-4 dark:border-white/10">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold sm:text-base">{selectedProject.name}</p>
                <p className="truncate text-xs text-muted-foreground">{selectedProject.href}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedProject.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-grid h-9 w-9 place-items-center rounded-md border border-black/10 bg-black/5 text-muted-foreground transition-colors hover:text-foreground dark:border-white/10 dark:bg-white/5"
                  aria-label="Open project in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="inline-grid h-9 w-9 place-items-center rounded-md border border-black/10 bg-black/5 text-muted-foreground transition-colors hover:text-foreground dark:border-white/10 dark:bg-white/5"
                  aria-label="Close project preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <iframe
              title={selectedProject.name}
              src={selectedProject.href}
              className="h-full w-full bg-white"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
