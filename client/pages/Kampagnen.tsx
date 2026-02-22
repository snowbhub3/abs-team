import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/components/layout/Language";
import { ArrowRight, Zap, Target, TrendingUp } from "lucide-react";

export default function Kampagnen() {
  const { t } = useI18n();

  const campaigns = [
    {
      id: "google",
      title: "Google Ads",
      description: "Высокотаргетированные объявления с профессиональной настройкой и оптимизацией.",
      icon: <Target className="h-8 w-8" />,
    },
    {
      id: "meta",
      title: "Meta Ads",
      description: "Facebook и Instagram реклама с детальной аудиторией и творческой оптимизацией.",
      icon: <TrendingUp className="h-8 w-8" />,
    },
    {
      id: "telegram",
      title: "Telegram Ads",
      description: "Реклама в Telegram с прямым доступом к вашей аудитории.",
      icon: <Zap className="h-8 w-8" />,
    },
  ];

  const handleContact = () => {
    const url = `https://t.me/abs_devteam?text=${encodeURIComponent("Ich interessiere mich für eine Werbekampagne. Können Sie mir ein Angebot machen?")}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <div id="kampagnen" className="relative">
      {/* Hero section */}
      <section className="relative min-h-screen flex flex-col justify-center py-12 sm:py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.7),transparent_40%),radial-gradient(600px_200px_at_50%_0px,rgba(56,189,248,0.25),transparent)] bg-[radial-gradient(800px_300px_at_50%_0px,rgba(14,165,233,0.10),transparent)]" />
        </div>
        <div className="container text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Kampagnen & Werbung
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Professionelle Werbekampagnen, die Ihre Landing Page zu neuen Höhen bringen.
          </p>
          <Button
            onClick={handleContact}
            className="bg-sky-500 hover:bg-sky-400 text-white h-11 px-8 font-semibold"
          >
            Kampagne starten <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Campaign types */}
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {campaigns.map((campaign, idx) => (
              <Card
                key={campaign.id}
                data-reveal
                style={{ transitionDelay: `${idx * 100}ms` }}
                className="border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] p-8 rounded-2xl opacity-0 translate-y-4 data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 data-[inview=true]:transition-all data-[inview=true]:duration-700 hover:border-sky-500/30 hover:bg-black/8 dark:hover:bg-white/[0.05] cursor-pointer transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-sky-500/15 text-sky-400 mb-4">
                  {campaign.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{campaign.title}</h3>
                <p className="text-sm text-foreground leading-relaxed">{campaign.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="relative py-16 sm:py-20 lg:py-32 bg-white/[0.02]">
        <div className="container max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Was wir anbieten</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              {
                title: "Strategy & Planning",
                desc: "Zielgerichtete Strategien für maximale ROI und Kundenbindung.",
              },
              {
                title: "Creatives & Design",
                desc: "Hochwertige Anzeigendesigns und Video-Inhalte, die konvertieren.",
              },
              {
                title: "A/B Testing",
                desc: "Kontinuierliche Tests und Optimierung für beste Ergebnisse.",
              },
              {
                title: "Performance Monitoring",
                desc: "Detaillierte Reports und Analysen für komplette Transparenz.",
              },
            ].map((feature, idx) => (
              <Card
                key={idx}
                className="border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.03] p-6"
              >
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Bereit, Ihre Kampagne zu starten?</h2>
          <p className="text-muted-foreground mb-8">
            Kontaktieren Sie uns noch heute und lassen Sie uns eine maßgeschneiderte Kampagne für Sie erstellen.
          </p>
          <Button
            onClick={handleContact}
            className="bg-sky-500 hover:bg-sky-400 text-white h-11 px-8 font-semibold"
          >
            Jetzt beginnen <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* IntersectionObserver integration */}
      <RevealObserver />
    </div>
  );
}

function RevealObserver() {
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

  return null;
}

import React from "react";
