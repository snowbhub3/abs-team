export default function AGB() {
  return (
    <div id="agb" className="relative">
      <section className="relative py-16 sm:py-20 lg:py-32">
        <div className="container max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-12">Allgemeine Geschäftsbedingungen (AGB)</h1>
          
          <div className="prose prose-invert max-w-none space-y-8 text-foreground leading-relaxed">
            
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Leistungsumfang</h2>
              <p>
                ABS Studio erbringt Dienstleistungen im Bereich der Webentwicklung, insbesondere:<br />
                - Erstellung und Design von Landing Pages<br />
                - Technischer Support und Wartung<br />
                - SEO-Optimierung<br />
                - Website-Hosting und Betreuung
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Abonnementmodell</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">2.1 Laufzeit</h3>
                  <p>
                    Das Abonnement läuft monatlich und wird automatisch erneuert, sofern nicht gekündigt wird. Die Kündigung muss schriftlich (Email oder Telegram) mindestens 14 Tage zum Ende eines Monats erfolgen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2.2 Zahlung</h3>
                  <p>
                    Die Zahlung erfolgt monatlich. Akzeptierte Zahlungsmethoden werden vor Vertragsabschluss mitgeteilt. Zahlungen müssen innerhalb von 14 Tagen nach Rechnungsdatum erfolgen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2.3 Kündigung</h3>
                  <p>
                    Das Abonnement kann jederzeit mit einer Frist von 14 Tagen zum Ende eines Kalendermonats schriftlich gekündigt werden. Eine ordentliche Kündigung ist jederzeit möglich.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Leistungsbedingungen</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">3.1 Verfügbarkeit</h3>
                  <p>
                    Wir streben eine Verfügbarkeit von 99,5% an. Wartungsarbeiten und technische Probleme bei Hosting-Anbietern können zu Ausfallzeiten führen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3.2 Support</h3>
                  <p>
                    Support wird via Email und Telegram angeboten. Antworten erfolgen normalerweise innerhalb von 48 Stunden an Werktagen.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3.3 Änderungen</h3>
                  <p>
                    Änderungen und Aktualisierungen an Ihrer Website werden gemäß des gewählten Plans durchgeführt. Weitere Änderungen können zu Zusatzkosten führen.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Domain und Hosting</h2>
              <p>
                Die Domain kann von uns registriert und gehostet werden oder Sie können Ihre eigene Domain verwenden. Die Verwaltungsrechte werden entsprechend vereinbart.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Zahlungsbedingungen</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">5.1 Rechnungsstellung</h3>
                  <p>
                    Rechnungen werden am ersten Tag des Monats ausgestellt. Payment ist innerhalb von 14 Tagen fällig.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">5.2 Zahlungsverzug</h3>
                  <p>
                    Bei Zahlungsverzug behalten wir uns vor, den Service zu unterbrechen. Verzugszinsen gemäß § 288 BGB werden berechnet.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">5.3 Rückerstattungen</h3>
                  <p>
                    Bereits bezahlte monatliche Gebühren werden nicht erstattet. Bei Kündigung endet der Service am Ende des bezahlten Zeitraums.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Haftung</h2>
              <p>
                Wir haften nicht für Datenverluste, Sicherheitslücken bei unsicheren Kundenpasswörtern, oder Ausfallzeiten durch Drittanbieter (Registrare, Hosting-Provider). Die Haftung ist begrenzt auf die monatliche Gebühr des abgelaufenen Monats.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">7. Datenbackup</h2>
              <p>
                Wir empfehlen regelmäßige Backups. Während wir bemüht sind, Ihre Daten zu schützen, sind wir nicht verantwortlich für Datenverluste durch höhere Gewalt.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>
              <p>
                Der von uns erstellte Code und Designs bleiben unser Eigentum. Sie erhalten eine Lizenz zur Nutzung. Wiederverkauf oder unbefugte Weitergabe ist untersagt.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">9. Geltungsbereich und Änderungen</h2>
              <p>
                Diese AGB gelten für alle Leistungen von ABS Studio. Änderungen werden mit 30 Tagen Vorankündigung wirksam. Dem widersprechen Sie durch schriftliche Mitteilung.
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
