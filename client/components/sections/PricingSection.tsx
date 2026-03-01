import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/components/layout/Language";
import { Check, ArrowRight } from "lucide-react";

export function PricingSection() {
  const { t, locale } = useI18n();

  // SEO Meta Tags (only on dedicated pricing page)
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "PriceSpecification",
      "priceCurrency": "EUR",
      "offers": [
        {
          "@type": "Offer",
          "name": locale === "de" ? "Starter Paket" : locale === "en" ? "Starter Package" : "Пакет Starter",
          "price": "60",
          "priceCurrency": "EUR",
          "priceValidUntil": "2025-12-31",
          "availability": "InStock",
        },
        {
          "@type": "Offer",
          "name": locale === "de" ? "Plus Paket" : locale === "en" ? "Plus Package" : "Пакет Plus",
          "price": "100",
          "priceCurrency": "EUR",
          "priceValidUntil": "2025-12-31",
          "availability": "InStock",
        },
        {
          "@type": "Offer",
          "name": locale === "de" ? "Pro Paket" : locale === "en" ? "Pro Package" : "Пакет Pro",
          "price": "200",
          "priceCurrency": "EUR",
          "priceValidUntil": "2025-12-31",
          "availability": "InStock",
        },
      ],
    };

    let schemaScript = document.querySelector('script[data-schema="pricing"]') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.setAttribute("data-schema", "pricing");
      schemaScript.textContent = JSON.stringify(schemaData);
      document.head.appendChild(schemaScript);
    } else {
      schemaScript.textContent = JSON.stringify(schemaData);
    }

    return () => {
      if (schemaScript && schemaScript.parentNode) {
        schemaScript.parentNode.removeChild(schemaScript);
      }
    };
  }, [locale]);

  const plans = [
    {
      id: "starter",
      nameKey: "pricing_starter",
      price: 60,
      descriptionKey: locale === "de" ? "Ideal für Startups und kleine Unternehmen" : locale === "en" ? "Perfect for startups and small businesses" : "Идеально для стартапов и малых компаний",
      features: t("pricing_starter_items").split("|"),
      popular: false,
    },
    {
      id: "plus",
      nameKey: "pricing_plus",
      price: 100,
      descriptionKey: locale === "de" ? "Für wachsende Unternehmen, die mehr wollen" : locale === "en" ? "For growing companies that want more" : "Для растущих компаний, которые хотят больше",
      features: t("pricing_plus_items").split("|"),
      popular: true,
    },
    {
      id: "pro",
      nameKey: "pricing_pro",
      price: 200,
      descriptionKey: locale === "de" ? "Vollständiges Leistungsspektrum mit dediziertem Support" : locale === "en" ? "Full range of services with dedicated support" : "Полный спектр услуг с выделенной поддержкой",
      features: t("pricing_pro_items").split("|"),
      popular: false,
    },
  ];

  const handleCTA = (planName: string) => {
    const messages: Record<string, Record<string, string>> = {
      de: {
        starter: "Ich interessiere mich für den Starter Plan. Können Sie mir mehr Details geben?",
        plus: "Ich interessiere mich für den Plus Plan. Können Sie mir mehr Details geben?",
        pro: "Ich interessiere mich für den Pro Plan. Können Sie mir mehr Details geben?",
      },
      en: {
        starter: "I'm interested in the Starter Plan. Can you provide more details?",
        plus: "I'm interested in the Plus Plan. Can you provide more details?",
        pro: "I'm interested in the Pro Plan. Can you provide more details?",
      },
      ru: {
        starter: "Меня интересует пакет Starter. Можете дать более подробную информацию?",
        plus: "Меня интересует пакет Plus. Можете дать более подробную информацию?",
        pro: "Меня интересует пакет Pro. Можете дать более подробную информацию?",
      },
    };

    const message = messages[locale]?.[planName] || messages["de"][planName];
    const url = `https://t.me/abs_devteam?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <div id="preise" className="relative">
      {/* Hero section */}
      <section className="relative py-16 sm:py-20 lg:py-32 bg-white/[0.02]">
        <div className="container max-w-4xl">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              {t("pricing_title")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
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
                    {locale === "de" ? "Beliebteste" : locale === "en" ? "Most Popular" : "Популярный"}
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{t(plan.nameKey)}</h3>
                  <p className="text-sm text-muted-foreground">{plan.descriptionKey}</p>
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
                  onClick={() => handleCTA(plan.id)}
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
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">{t("pricing_contact")}</h3>
            <p className="text-muted-foreground mb-8">
              {locale === "de" ? "Wir passen unsere Pläne an Ihre spezifischen Anforderungen an. Sprechen Sie mit uns!" : locale === "en" ? "We customize our plans to your specific needs. Let's talk!" : "Мы адаптируем наши планы к вашим конкретным потребностям. Давайте поговорим!"}
            </p>
            <Button
              onClick={() => handleCTA("plus")}
              className="bg-sky-500 hover:bg-sky-400 text-white h-11 px-8 font-semibold"
            >
              {locale === "de" ? "Kostenlose Beratung anfragen" : locale === "en" ? "Request free consultation" : "Запросить бесплатную консультацию"} <ArrowRight className="ml-2 h-4 w-4" />
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
  useEffect(() => {
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
