import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/components/layout/Language";
import { Check, ArrowRight } from "lucide-react";

export default function Preise() {
  const { t } = useI18n();

  const plans = [
    {
      id: "starter",
      nameKey: "pricing_starter",
      price: 60,
      description: "Ідеально для стартапів і малих підприємств",
      features: t("pricing_starter_items").split("|"),
      popular: false,
    },
    {
      id: "plus",
      nameKey: "pricing_plus",
      price: 100,
      description: "Для зростаючих компаній, які хочуть більше",
      features: t("pricing_plus_items").split("|"),
      popular: true,
    },
    {
      id: "pro",
      nameKey: "pricing_pro",
      price: 200,
      description: "Повний спектр послуг з dedикованою підтримкою",
      features: t("pricing_pro_items").split("|"),
      popular: false,
    },
  ];

  const handleCTA = () => {
    const url = `https://t.me/abs_devteam?text=${encodeURIComponent("Ich interessiere mich für einen Plan. Können Sie mir mehr Details geben?")}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <div id="preise" className="relative">
      {/* Hero section */}
      <section className="relative py-16 sm:py-20 lg:py-32 bg-white/[0.02]">
        <div className="container max-w-4xl">
          <div className="text-center mb-12 lg:mb-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              {t("pricing_title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("pricing_sub")}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <Card
                key={plan.id}
                data-reveal
                style={{ transitionDelay: `${idx * 100}ms` }}
                className={`relative overflow-hidden border rounded-2xl p-8 opacity-0 translate-y-4 data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0 data-[inview=true]:transition-all data-[inview=true]:duration-700 ${
                  plan.popular
                    ? "lg:scale-105 border-sky-500/50 bg-gradient-to-br from-sky-500/10 via-background to-background shadow-2xl shadow-sky-500/20"
                    : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.03]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-sky-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-xl">
                    Beliebteste
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{t(plan.nameKey)}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black">€{plan.price}</span>
                    <span className="text-muted-foreground">/{t("pricing_per_month")}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{t("pricing_billed")}</p>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={handleCTA}
                  className={`w-full mb-8 h-11 font-semibold ${
                    plan.popular
                      ? "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/25"
                      : "bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20"
                  }`}
                >
                  {t("pricing_cta")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* Features list */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t("pricing_includes")}
                  </p>
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex gap-3 items-start">
                      <Check className="h-4 w-4 text-sky-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative gradient */}
                <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full blur-3xl opacity-30 ${
                  plan.popular ? "bg-sky-500" : "bg-cyan-500/20"
                }`} />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Additional info */}
      <section className="relative py-16 sm:py-20 lg:py-32 bg-white/[0.02]">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("pricing_contact")}</h2>
            <p className="text-muted-foreground mb-8">
              Wir passen unsere Pläne an Ihre spezifischen Anforderungen an. Sprechen Sie mit uns!
            </p>
            <Button
              onClick={handleCTA}
              className="bg-sky-500 hover:bg-sky-400 text-white h-11 px-8 font-semibold"
            >
              Kostenlose Beratung anfragen <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* IntersectionObserver integration for reveal effect */}
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
