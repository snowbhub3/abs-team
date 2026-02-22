export default function Datenschutz() {
  return (
    <div id="datenschutz" className="relative">
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="container max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-12">Datenschutzerklärung</h1>
          
          <div className="prose prose-invert max-w-none space-y-8 text-foreground leading-relaxed">
            
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Allgemeine Hinweise</h2>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Erfassung und Speicherung persönlicher Daten</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">2.1 Automatische Erfassung</h3>
                  <p>
                    Wenn Sie unsere Website besuchen, erfassen wir automatisch technische Informationen wie:<br />
                    - Ihre IP-Adresse<br />
                    - Browser-Typ und -Version<br />
                    - Besuchte Seiten<br />
                    - Datum und Uhrzeit des Besuchs<br />
                    - Verweis-Website
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2.2 Google Analytics</h3>
                  <p>
                    Diese Website nutzt Google Analytics, einen Webanalysedienst der Google LLC. Google Analytics verwendet sogenannte "Cookies" – Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse Ihrer Website-Nutzung ermöglichen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2.3 Kontaktformular</h3>
                  <p>
                    Wenn Sie unser Kontaktformular nutzen, erfassen wir die von Ihnen angegebenen Daten (Name, E-Mail, Nachricht) zur Beantwortung Ihrer Anfrage. Diese Daten werden nicht an Dritte weitergegeben.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Rechtsgrundlage</h2>
              <p>
                Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von Artikel 6 DSGVO:<br />
                - Ihre ausdrückliche Zustimmung (Artikel 6 Abs. 1 a DSGVO)<br />
                - Unsere berechtigten Interessen (Artikel 6 Abs. 1 f DSGVO)<br />
                - Erfüllung einer vertraglichen Verpflichtung (Artikel 6 Abs. 1 b DSGVO)
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Cookies</h2>
              <p>
                Wir nutzen Cookies für folgende Zwecke:<br />
                - Speicherung Ihrer Sprachpräferenz<br />
                - Speicherung Ihres Design-Themas (hell/dunkel)<br />
                - Cookie-Zustimmungsverwaltung<br />
                - Google Analytics (nur mit Ihrer Zustimmung)
              </p>
              <p className="mt-4">
                Sie können Cookies jederzeit löschen oder deaktivieren. Einige Funktionen der Website funktionieren möglicherweise nicht ohne Cookies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Ihre Rechte</h2>
              <p>
                Nach der DSGVO haben Sie folgende Rechte:<br />
                - Recht auf Auskunft (Artikel 15)<br />
                - Recht auf Berichtigung (Artikel 16)<br />
                - Recht auf Löschung (Artikel 17)<br />
                - Recht auf Einschränkung der Verarbeitung (Artikel 18)<br />
                - Recht auf Datenportabilität (Artikel 20)<br />
                - Recht auf Widerspruch (Artikel 21)
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Datensicherheit</h2>
              <p>
                Wir treffen technische und organisatorische Maßnahmen, um Ihre Daten zu schützen. Diese umfassen SSL-Verschlüsselung, sichere Server und Zugriffskontrolle.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">7. Datenspeicherung</h2>
              <p>
                Ihre Daten werden nur so lange gespeichert, wie dies notwendig ist. Dies hängt vom Zweck der Verarbeitung ab:<br />
                - Kontaktanfragen: bis zur Beantwortung + 6 Monate<br />
                - Analytics-Daten: 26 Monate<br />
                - Cookies: wie angegeben oder bei Löschung
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">8. Kontaktdaten des Verantwortlichen</h2>
              <p>
                Bei Fragen zur Datenschutzerklärung oder zur Geltendmachung Ihrer Rechte kontaktieren Sie uns unter:<br />
                Email: <a href="mailto:info@abs-dev.team" className="text-sky-400 hover:text-sky-300">info@abs-dev.team</a><br />
                Telegram: <a href="https://t.me/abs_devteam" target="_blank" rel="noopener" className="text-sky-400 hover:text-sky-300">@abs_devteam</a>
              </p>
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
