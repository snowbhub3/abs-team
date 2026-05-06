import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/components/layout/Language";
import { Check, ArrowRight } from "lucide-react";

export function PricingCarousel() {
  const { t, locale } = useI18n();
  const [emblaRef] = useEmblaCarousel({
    align: "center",
    loop: false,
    startIndex: 1,
    skipSnaps: false,
    dragFree: false,
    containScroll: false,
  });

  const plans = [
    {
      id: "starter",
      nameKey: "pricing_starter",
      price: 65,
      descriptionKey: locale === "de" ? "Ideal für Startups und kleine Unternehmen" : locale === "en" ? "Perfect for startups and small businesses" : "Идеально для стартапов и малых компаний",
      features: t("pricing_starter_items").split("|"),
      popular: false,
    },
    {
      id: "plus",
      nameKey: "pricing_plus",
      oldPrice: 120,
      price: 100,
      descriptionKey: locale === "de" ? "Für wachsende Unternehmen, die mehr wollen" : locale === "en" ? "For growing companies that want more" : "Для растущих компаний, которые хотят больше",
      features: t("pricing_plus_items").split("|"),
      popular: true,
    },
    {
      id: "pro",
      nameKey: "pricing_pro",
      oldPrice: 200,
      price: 150,
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

      {/* Pricing Carousel */}
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="container">
          {/* Carousel Container */}
          <div className="relative px-0 sm:px-6">
            {/* Embla Carousel */}
            <div className="overflow-hidden px-[9vw] sm:px-0" ref={emblaRef}>
              <div className="flex gap-4 sm:gap-8 md:gap-6 py-4">
                {plans.map((plan) => (
                  <div key={plan.id} className="flex-[0_0_82%] sm:flex-[0_0_72%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0 flex items-center justify-center">
                    <Card
                      data-reveal
                      className={`relative overflow-hidden border rounded-2xl p-6 sm:p-8 h-full flex flex-col opacity-100 transition-all duration-500 ${
                        plan.popular
                          ? "md:scale-100 lg:scale-105 border-sky-500/50 bg-gradient-to-br from-sky-500/10 via-background to-background shadow-2xl shadow-sky-500/20"
                          : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.03]"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-4 py-1 text-xs sm:text-sm font-bold rounded-bl-xl">
                          {locale === "de" ? "Beliebteste" : locale === "en" ? "Most Popular" : "Популярный"}
                        </div>
                      )}

                      {/* Plan name */}
                      <div className="mb-6">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">{t(plan.nameKey)}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{plan.descriptionKey}</p>
                      </div>

                      {/* Price */}
                      <div className="mb-8">
                        {plan.oldPrice && (
                          <div className="mb-1 flex items-center gap-2">
                            <span className="text-lg font-semibold text-muted-foreground line-through sm:text-xl">€{plan.oldPrice}</span>
                            <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 text-xs font-semibold text-sky-400">
                              {locale === "de" ? "Rabatt" : locale === "en" ? "Discount" : "Скидка"}
                            </span>
                          </div>
                        )}
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl sm:text-5xl font-black">€{plan.price}</span>
                          <span className="text-muted-foreground text-sm">{t("pricing_per_month")}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{t("pricing_billed")}</p>
                      </div>

                      {/* CTA Button */}
                      <Button
                        onClick={() => handleCTA(plan.id)}
                        className={`w-full mb-8 h-11 font-semibold transition-all ${
                          plan.popular
                            ? "bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40"
                            : "bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20"
                        }`}
                      >
                        {t("pricing_cta")} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>

                      {/* Features list */}
                      <div className="space-y-3 flex-1">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {t("pricing_includes")}
                        </p>
                        {plan.features.map((feature, fidx) => (
                          <div key={fidx} className="flex gap-3 items-start">
                            <Check className="h-4 w-4 text-sky-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-foreground leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Decorative gradient */}
                      <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full blur-3xl opacity-30 ${
                        plan.popular ? "bg-sky-500" : "bg-cyan-500/20"
                      }`} />
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-2xl text-center">
            <p className="text-sm text-muted-foreground">
              {locale === "de"
                ? "Individuelle Pläne ab €30 pro Monat für Freelancer und kleine Projekte."
                : locale === "en"
                  ? "Custom plans from €30 per month for freelancers and small projects."
                  : "Индивидуальные планы от €30 в месяц для фрилансеров и небольших проектов."}
            </p>
          </div>

          {/* Scroll hint for mobile */}
          <div className="md:hidden text-center mt-4">
            <p className="text-xs text-muted-foreground">
              {locale === "de" ? "Streichen Sie für mehr Pläne" : locale === "en" ? "Swipe for more plans" : "Проведите для других планов"}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
