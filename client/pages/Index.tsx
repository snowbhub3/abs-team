import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useI18n } from "@/components/layout/Language";
import { ArrowRight, Sparkles, Rocket, LineChart, PenTool, Shield, Mail } from "lucide-react";
import React, { useRef, useState } from "react";

export default function Index() {
  const { t } = useI18n();
  const { toast } = useToast();
  const msgRef = useRef<HTMLTextAreaElement | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const toggleFlip = (cardId: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = msgRef.current?.value?.trim() || "";
    const url = `https://t.me/abs_devteam?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
    toast({ title: "✅", description: "Telegram opened." });
    if (msgRef.current) msgRef.current.value = "";
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
      <section className="relative min-h-screen flex flex-col justify-center py-24 sm:py-32 md:py-40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.7),transparent_40%),radial-gradient(600px_200px_at_50%_0px,rgba(56,189,248,0.25),transparent)] bg-[radial-gradient(800px_300px_at_50%_0px,rgba(14,165,233,0.10),transparent)]" />
        </div>
        <div className="container text-center max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80">
            <Sparkles className="h-3.5 w-3.5" /> {t("experience_badge")}
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            {t("hero_title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("hero_sub")}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#contact">
              <Button className="h-10 px-4 text-sm sm:h-11 sm:px-6 sm:text-base bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/25">
                {t("cta_primary")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="#projects">
              <Button variant="secondary" className="h-10 px-4 text-sm sm:h-11 sm:px-6 sm:text-base bg-white/5 hover:bg-white/10 border-white/10">
                {t("cta_secondary")}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services - What we do */}
      <section id="services" className="relative min-h-screen flex flex-col justify-center py-20 lg:py-32">
        <div className="container">
          <h2 className="text-3xl lg:text-5xl font-bold mb-2">{t("section_services_title")}</h2>
          <p className="text-muted-foreground mb-12 lg:mb-16 text-lg">{t("section_services_sub")}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 auto-rows-max">
            {[
              { id: "service-0", icon: <Rocket className="h-6 w-6" />, text: t("s1") },
              { id: "service-1", icon: <PenTool className="h-6 w-6" />, text: t("s2") },
              { id: "service-2", icon: <LineChart className="h-6 w-6" />, text: t("s3") },
              { id: "service-3", icon: <Shield className="h-6 w-6" />, text: t("s4") },
            ].map((item, i) => {
              const isFlipped = flippedCards.has(item.id);
              return (
                <div
                  key={item.id}
                  data-reveal
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className="flip-card-container hidden lg:block"
                >
                  <Card
                    onClick={() => toggleFlip(item.id)}
                    className={`flip-card group relative overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] p-8 lg:p-10 h-64 lg:h-80 transition-all duration-700 ease-out opacity-0 translate-y-4 hover:bg-black/10 dark:hover:bg-white/[0.06] cursor-pointer data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 ${
                      isFlipped ? "flipped" : ""
                    }`}
                  >
                    <div className="flip-card-content flex-col">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-cyan-500/15 text-cyan-300">
                        {item.icon}
                      </div>
                      <p className="text-base text-foreground/90 leading-relaxed flex-1 flex items-center">
                        {item.text}
                      </p>
                    </div>
                    <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-500/10 blur-2xl transition-transform group-hover:scale-125" />
                  </Card>
                </div>
              );
            })}
          </div>
          {/* Mobile version - smaller cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
            {[
              { icon: <Rocket className="h-5 w-5" />, text: t("s1") },
              { icon: <PenTool className="h-5 w-5" />, text: t("s2") },
              { icon: <LineChart className="h-5 w-5" />, text: t("s3") },
              { icon: <Shield className="h-5 w-5" />, text: t("s4") },
            ].map((item, i) => (
              <Card
                key={i}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
                className="group relative overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] p-5 transition-all duration-700 ease-out opacity-0 translate-y-4 hover:bg-black/10 dark:hover:bg-white/[0.06] active:scale-[0.98] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-cyan-500/15 text-cyan-300">
                  {item.icon}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{item.text}</p>
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-500/10 blur-2xl transition-transform group-hover:scale-125" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process - How we work */}
      <section id="process" className="relative min-h-screen flex flex-col justify-center py-20 lg:py-32 bg-white/[0.02]">
        <div className="container">
          <h2 className="text-3xl lg:text-5xl font-bold mb-10 lg:mb-16">{t("section_process_title")}</h2>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 auto-rows-max">
            {[1, 2, 3, 4].map((n, i) => {
              const cardId = `process-${n}`;
              const isFlipped = flippedCards.has(cardId);
              return (
                <div
                  key={n}
                  data-reveal
                  style={{ transitionDelay: `${i * 90}ms` }}
                  className="flip-card-container hidden lg:block"
                >
                  <li
                    onClick={() => toggleFlip(cardId)}
                    className={`flip-card relative flex flex-col rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] p-8 lg:p-10 min-h-80 transition-all duration-700 ease-out opacity-0 translate-y-4 hover:border-cyan-500/30 hover:bg-black/8 dark:hover:bg-white/[0.05] cursor-pointer data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 ${
                      isFlipped ? "flipped" : ""
                    }`}
                  >
                    <span className="pointer-events-none select-none absolute right-6 top-6 text-6xl lg:text-7xl font-black text-black/10 dark:text-white/10">
                      {String(n).padStart(2, "0")}
                    </span>
                    <h3 className="mb-4 text-xl lg:text-2xl font-semibold relative z-10">
                      {t(`process_${n}_title`)}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed flex-1 flex items-center">
                      {t(`process_${n}_desc`)}
                    </p>
                  </li>
                </div>
              );
            })}
          </ol>
          {/* Mobile version - smaller cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
            {[1, 2, 3, 4].map((n, i) => (
              <li
                key={n}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
                className="relative flex flex-col rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] p-6 min-h-[160px] transition-all duration-700 ease-out opacity-0 translate-y-4 active:scale-[0.98] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
              >
                <span className="pointer-events-none select-none absolute right-4 top-3 text-5xl font-black text-black/10 dark:text-white/10">
                  {String(n).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-lg font-semibold relative z-10">
                  {t(`process_${n}_title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`process_${n}_desc`)}
                </p>
              </li>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative min-h-screen flex flex-col justify-center py-20 lg:py-32">
        <div className="container">
          <div className="mb-8 lg:mb-12 flex items-center justify-between">
            <h2 className="text-3xl lg:text-5xl font-bold">{t("section_projects_title")}</h2>
            <a href="#contact" className="text-sm rounded-md border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10">
              {t("start_similar")}
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.035] transition-all duration-700 ease-out opacity-0 translate-y-4 active:scale-[0.985] data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img src={item.img} alt={item.name} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform"/>
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
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white/[0.02]">
        <div className="container grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t("contact_title")}</h2>
            <p className="text-muted-foreground mb-6">{t("contact_sub")}</p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4"/> @abs_devteam</li>
            </ul>
          </div>
          <form onSubmit={send} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.035] p-6 backdrop-blur-sm">
            <div className="grid gap-4">
              <Textarea ref={msgRef} placeholder={t("form_message")} rows={5} className="bg-white/40 dark:bg-white/[0.03] backdrop-blur-sm border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400/50 placeholder:text-foreground/60 rounded-lg" />
              <Button type="submit" className="bg-sky-500 hover:bg-sky-400 text-white">{t("form_send")}</Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
