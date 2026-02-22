export default function Impressum() {
  return (
    <div id="impressum" className="relative">
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="container max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-12">Impressum</h1>
          
          <div className="prose prose-invert max-w-none space-y-8 text-foreground leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Verantwortlicher</h3>
                  <p>
                    [Ihr vollständiger Name]<br />
                    [Ihre Adresse]<br />
                    [PLZ] [Stadt]<br />
                    Deutschland
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Kontaktinformationen</h3>
                  <p>
                    Email: <a href="mailto:info@abs-dev.team" className="text-sky-400 hover:text-sky-300">info@abs-dev.team</a><br />
                    Telegram: <a href="https://t.me/abs_devteam" target="_blank" rel="noopener" className="text-sky-400 hover:text-sky-300">@abs_devteam</a>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Umsatzsteuer-ID</h3>
                  <p>
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                    [Ihre USt-ID - wird nach Registrierung aktualisiert]
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Geschäftstätigkeit</h3>
                  <p>
                    ABS Studio ist ein Einzelunternehmen, das spezialisiert ist auf:<br />
                    - Erstellung und Design von Landing Pages<br />
                    - Webentwicklung und Webdesign<br />
                    - SEO-Optimierung<br />
                    - Website-Hosting und technischer Support
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Registrierung</h3>
                  <p>
                    Handwerkskammer / Industrie- und Handelskammer: [Zuständige IHK/HWK]<br />
                    Registernummer: [Registernummer - wird nach Registrierung hinzugefügt]
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Haftungsausschluss</h3>
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten in Übereinstimmung mit geltendem Recht verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Externe Links</h3>
                  <p>
                    Unsere Website enthält externe Links zu Websites Dritter. Wir haben keinen Einfluss auf diese Websites und sind nicht für deren Inhalte verantwortlich. Für illegale oder anstößige Inhalte übernehmen wir keine Verantwortung.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Urheberrechte</h3>
                  <p>
                    Die Inhalte und Werke auf diesen Webseiten sind urheberrechtlich geschützt. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Urhebers.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-muted-foreground">
                Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
