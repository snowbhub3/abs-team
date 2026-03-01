import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useI18n } from "@/components/layout/Language";

type LegalPageType = "impressum" | "datenschutz" | "agb";

interface LegalModalProps {
  type: LegalPageType;
  open: boolean;
  onClose: () => void;
}

export function LegalModal({ type, open, onClose }: LegalModalProps) {
  const { t, locale } = useI18n();

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const getTitle = () => {
    const titles: Record<LegalPageType, Record<string, string>> = {
      impressum: {
        de: "Impressum",
        en: "Impressum",
        ru: "Impressum",
      },
      datenschutz: {
        de: "Datenschutzerklärung",
        en: "Privacy Policy",
        ru: "Политика конфиденциальности",
      },
      agb: {
        de: "Allgemeine Geschäftsbedingungen",
        en: "Terms & Conditions",
        ru: "Условия использования",
      },
    };
    return titles[type][locale] || titles[type]["de"];
  };

  return createPortal(
    <div className={`fixed inset-0 z-[999] flex items-center justify-center px-4 py-6 pointer-events-auto ${
      open ? "opacity-100 transition-opacity duration-300" : "opacity-0 pointer-events-none"
    }`}
      style={{
        backgroundColor: open ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
        backdropFilter: open ? "blur(4px)" : "none",
        transition: "background-color 300ms, backdrop-filter 300ms",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-gradient-to-br from-white/95 via-white/90 to-white/80 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-black/90 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-0 right-4 z-10 p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors mt-4"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="p-8 pt-4 text-foreground prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-6">{getTitle()}</h1>

          {type === "impressum" && (
            <div className="space-y-4">
              {locale === "de" && (
                <>
                  <h2 className="text-xl font-semibold mt-6 mb-3">Angaben gemäß § 5 TMG</h2>
                  <p><strong>ABS Studio</strong></p>
                  <p>[Ihr vollständiger Name]<br/>
                  [Ihre Adresse]<br/>
                  [PLZ] [Stadt], Deutschland</p>
                  <p><strong>Kontakt:</strong><br/>
                  Telefon: [Ihre Telefonnummer]<br/>
                  Email: info@abs-dev.team</p>
                  <p><strong>Umsatzsteuer-ID:</strong> [Ihre USt-ID]<br/>
                  <strong>Registernummer:</strong> [Registernummer, falls Einzelunternehmer]</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Haftungsausschluss</h2>
                  <h3 className="font-semibold">Haftung für Inhalte</h3>
                  <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8–10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf rechtswidrige Tätigkeit hinweisen.</p>

                  <h3 className="font-semibold">Haftung für Links</h3>
                  <p>Unsere Website enthält Links zu externen Websites Dritter. Wir haben keine Kontrolle über die Inhalte dieser externen Websites und übernehmen dafür keine Haftung. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Urheberrecht</h2>
                  <p>Die auf unserer Website veröffentlichten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Schöpfers. Downloads und Kopien dieser Seite sind nur für den privaten Gebrauch gestattet.</p>
                </>
              )}
              {locale === "en" && (
                <>
                  <h2 className="text-xl font-semibold mt-6 mb-3">Information pursuant to § 5 TMG</h2>
                  <p><strong>ABS Studio</strong></p>
                  <p>[Your full name]<br/>
                  [Your address]<br/>
                  [Postal code] [City], Germany</p>
                  <p><strong>Contact:</strong><br/>
                  Phone: [Your phone number]<br/>
                  Email: info@abs-dev.team</p>
                  <p><strong>VAT ID:</strong> [Your VAT ID]<br/>
                  <strong>Registration number:</strong> [Registration number, if sole proprietor]</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Disclaimer</h2>
                  <h3 className="font-semibold">Liability for content</h3>
                  <p>As a service provider, we are responsible for our own content on these pages according to general law. According to §§ 8–10 TMG, however, we are not obligated to monitor external information provided or stored or to investigate circumstances that indicate illegal activity.</p>

                  <h3 className="font-semibold">Liability for links</h3>
                  <p>Our website contains links to external third-party websites. We have no control over the content of these external websites and assume no liability for them. The respective provider or operator of the websites is always responsible for the content of the linked pages.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Copyright</h2>
                  <p>The content and works published on our website are subject to German copyright law. Any reproduction, editing, distribution, and any use outside the limits of copyright law require written consent from the author or creator. Downloads and copies of this page are permitted only for private use.</p>
                </>
              )}
              {locale === "ru" && (
                <>
                  <h2 className="text-xl font-semibold mt-6 mb-3">Информация согласно § 5 TMG</h2>
                  <p><strong>ABS Studio</strong></p>
                  <p>[Ваше полное имя]<br/>
                  [Ваш адрес]<br/>
                  [Почтовый код] [Город], Германия</p>
                  <p><strong>Контакт:</strong><br/>
                  Телефон: [Ваш номер телефона]<br/>
                  Email: info@abs-dev.team</p>
                  <p><strong>ID НДС:</strong> [Ваш ID НДС]<br/>
                  <strong>Номер регистрации:</strong> [Номер регистрации, если индивидуальный предприниматель]</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Отказ от ответственности</h2>
                  <h3 className="font-semibold">Ответственность за содержание</h3>
                  <p>Как поставщик услуг, мы несем ответственность за собственное содержание на этих страницах в соответствии с общим правом. Однако согласно §§ 8–10 TMG мы не обязаны контролировать передаваемую или хранимую внешнюю информацию или расследовать обстоятельства, указывающие на противоправную деятельность.</p>

                  <h3 className="font-semibold">Ответственность за ссылки</h3>
                  <p>Наш веб-сайт содержит ссылки на внешние веб-сайты третьих сторон. Мы не имеем контроля над содержанием этих внешних веб-сайтов и не несем за них ответственность. Ответственность за содержание связанных страниц всегда несет соответствующий поставщик или оператор веб-сайта.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Авторское право</h2>
                  <p>Содержание и работы, опубликованные на нашем веб-сайте, подпадают под действие немецкого авторского права. Любое воспроизведение, редактирование, распространение и любое использование вне пределов авторского права требуют письменного согласия автора или создателя. Загрузки и копии этой страницы разрешены только для личного использования.</p>
                </>
              )}
            </div>
          )}

          {type === "datenschutz" && (
            <div className="space-y-4">
              {locale === "de" && (
                <>
                  <h2 className="text-xl font-semibold mt-6 mb-3">Geltungsbereich</h2>
                  <p>Diese Datenschutzerklärung gilt für die Website ABS Studio und alle damit verbundenen Dienste.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Verantwortlicher für die Datenverarbeitung</h2>
                  <p>ABS Studio<br/>
                  [Ihre Adresse]<br/>
                  Email: info@abs-dev.team</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Erhobene Daten</h2>
                  <p>Wir verarbeiten folgende personenbezogene Daten:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Name und E-Mail-Adresse (bei Kontaktformularen)</li>
                    <li>IP-Adresse und Browserinformationen (automatisch)</li>
                    <li>Cookie-Einstellungen und Sprachpräferenzen</li>
                    <li>Google Analytics Daten (anonymisiert)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Rechtsgrundlage (Art. 6 DSGVO)</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Art. 6 Abs. 1 lit. a) DSGVO: Einwilligung (Cookies, Newsletter)</li>
                    <li>Art. 6 Abs. 1 lit. b) DSGVO: Erfüllung eines Vertrags (Kontaktformular)</li>
                    <li>Art. 6 Abs. 1 lit. f) DSGVO: Berechtigtes Interesse (Website-Funktionalität)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Cookies</h2>
                  <p>Wir setzen Cookies ein, um:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Ihre Spracheinstellung zu speichern</li>
                    <li>Ihr Theme-Preference (Hell/Dunkel) zu speichern</li>
                    <li>Cookie-Einwilligung zu verwalten</li>
                    <li>Google Analytics zu ermöglichen (mit Einwilligung)</li>
                  </ul>
                  <p>Sie können Cookies jederzeit in Ihren Browsereinstellungen ablehnen oder löschen.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Google Analytics</h2>
                  <p>Diese Website nutzt Google Analytics. Die Datenerfassung erfolgt mit IP-Anonymisierung. Google Analytics hilft uns, die Nutzung der Website zu verstehen und zu optimieren.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Ihre Rechte (Art. 15-21 DSGVO)</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Recht auf Auskunft (Art. 15)</li>
                    <li>Recht auf Berichtigung (Art. 16)</li>
                    <li>Recht auf Löschung (Art. 17)</li>
                    <li>Recht auf Einschränkung der Verarbeitung (Art. 18)</li>
                    <li>Recht auf Datenportabilität (Art. 20)</li>
                    <li>Widerspruchsrecht (Art. 21)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Speicherdauer</h2>
                  <p>Cookies werden nach 1 Jahr automatisch gelöscht. Kontaktdaten werden nach der Bearbeitung Ihrer Anfrage gelöscht.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Kontakt zum Datenschutz</h2>
                  <p>Für Fragen zu Ihren Daten kontaktieren Sie uns unter: info@abs-dev.team</p>
                </>
              )}
              {locale === "en" && (
                <>
                  <h2 className="text-xl font-semibold mt-6 mb-3">Scope</h2>
                  <p>This privacy policy applies to the ABS Studio website and all associated services.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Responsible Party</h2>
                  <p>ABS Studio<br/>
                  [Your address]<br/>
                  Email: info@abs-dev.team</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Data Collected</h2>
                  <p>We process the following personal data:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Name and email address (contact forms)</li>
                    <li>IP address and browser information (automatic)</li>
                    <li>Cookie settings and language preferences</li>
                    <li>Google Analytics data (anonymized)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Legal Basis (Art. 6 GDPR)</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Art. 6 Para. 1 lit. a) GDPR: Consent (cookies, newsletter)</li>
                    <li>Art. 6 Para. 1 lit. b) GDPR: Contract fulfillment (contact form)</li>
                    <li>Art. 6 Para. 1 lit. f) GDPR: Legitimate interest (website functionality)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Cookies</h2>
                  <p>We use cookies to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Store your language preference</li>
                    <li>Store your theme preference (light/dark)</li>
                    <li>Manage cookie consent</li>
                    <li>Enable Google Analytics (with consent)</li>
                  </ul>
                  <p>You can reject or delete cookies at any time in your browser settings.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Google Analytics</h2>
                  <p>This website uses Google Analytics. Data collection occurs with IP anonymization. Google Analytics helps us understand and optimize website usage.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Your Rights (Art. 15-21 GDPR)</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Right to access (Art. 15)</li>
                    <li>Right to rectification (Art. 16)</li>
                    <li>Right to erasure (Art. 17)</li>
                    <li>Right to restrict processing (Art. 18)</li>
                    <li>Right to data portability (Art. 20)</li>
                    <li>Right to object (Art. 21)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Data Retention</h2>
                  <p>Cookies are automatically deleted after 1 year. Contact data is deleted after your request has been processed.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Data Protection Contact</h2>
                  <p>For questions about your data, contact us at: info@abs-dev.team</p>
                </>
              )}
              {locale === "ru" && (
                <>
                  <h2 className="text-xl font-semibold mt-6 mb-3">Область применения</h2>
                  <p>Данная политика конфиденциальности применяется к веб-сайту ABS Studio и всем связанным с ним услугам.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Ответственная сторона</h2>
                  <p>ABS Studio<br/>
                  [Ваш адрес]<br/>
                  Email: info@abs-dev.team</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Собираемые данные</h2>
                  <p>Мы обрабатываем следующие личные данные:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Имя и адрес электронной почты (контактные формы)</li>
                    <li>IP-адрес и информация браузера (автоматически)</li>
                    <li>Настройки cookie и языковые предпочтения</li>
                    <li>Данные Google Analytics (анонимизированные)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Правовая база (ст. 6 GDPR)</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Ст. 6 Пара. 1 лит. a) GDPR: Согласие (cookies, рассылка)</li>
                    <li>Ст. 6 Пара. 1 лит. b) GDPR: Исполнение контракта (контактная форма)</li>
                    <li>Ст. 6 Пара. 1 лит. f) GDPR: Законный интерес (функциональность сайта)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Cookies</h2>
                  <p>Мы используем cookies для:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Сохранения вашего языкового предпочтения</li>
                    <li>Сохранения вашего предпочтения темы (светлая/темная)</li>
                    <li>Управления согласием на cookies</li>
                    <li>Включения Google Analytics (с согласием)</li>
                  </ul>
                  <p>Вы можете отклонить или удалить cookies в любое время в настройках браузера.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Google Analytics</h2>
                  <p>Этот веб-сайт использует Google Analytics. Сбор данных происходит с анонимизацией IP-адреса. Google Analytics помогает нам понять и оптимизировать использование сайта.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Ваши права (ст. 15-21 GDPR)</h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Право на доступ (ст. 15)</li>
                    <li>Право на исправление (ст. 16)</li>
                    <li>Право на удаление (ст. 17)</li>
                    <li>Право на ограничение обработки (ст. 18)</li>
                    <li>Право на передачу данных (ст. 20)</li>
                    <li>Право на возражение (ст. 21)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Хранение данных</h2>
                  <p>Cookies автоматически удаляются через 1 год. Контактные данные удаляются после обработки вашего запроса.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">Контакт по защите данных</h2>
                  <p>По вопросам о ваших данных свяжитесь с нами по адресу: info@abs-dev.team</p>
                </>
              )}
            </div>
          )}

          {type === "agb" && (
            <div className="space-y-4">
              {locale === "de" && (
                <>
                  <h2 className="text-xl font-semibold mt-6 mb-3">1. Geltung und Änderungen</h2>
                  <p>Diese AGB regeln das Verhältnis zwischen ABS Studio („Anbieter") und dem Kunden („Sie"). Sie gelten für alle Dienstleistungen im Zusammenhang mit unseren Website-Abos und digitalen Diensten.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">2. Leistungen</h2>
                  <p>Wir bieten monatliche Abos für Website-Design, -Entwicklung, -Wartung und -Support an. Die genauen Leistungen sind in der aktuellen Preisliste beschrieben.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">3. Vertragslaufzeit und Kündigung</h2>
                  <p>Die Vertragslaufzeit beträgt einen Monat. Der Vertrag verlängert sich automatisch um einen Monat, wenn nicht mindestens 14 Tage vor Ablauf gekündigt wird. Die Kündigung kann jederzeit per Email oder Telegram erfolgen.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">4. Preise und Zahlungsbedingungen</h2>
                  <p>Die Preise sind in EUR angegeben und exklusive Steuern. Die Rechnung ist innerhalb von 14 Tagen nach Rechnungsdatum fällig. Bei nicht rechtzeitiger Zahlung kann der Vertrag fristlos gekündigt werden.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">5. Haftung</h2>
                  <p>ABS Studio ist nicht haftbar für indirekte, zufällige oder Folgeschäden. Die maximale Haftung ist auf den Abo-Preis eines Monats begrenzt.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">6. Datenschutz</h2>
                  <p>Die Verarbeitung personenbezogener Daten erfolgt nach unserer Datenschutzerklärung.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">7. Schlussbestimmungen</h2>
                  <p>Es gilt deutsches Recht. Gerichtsstand ist Dortmund, Deutschland.</p>
                </>
              )}
              {locale === "en" && (
                <>
                  <h2 className="text-xl font-semibold mt-6 mb-3">1. Validity and Changes</h2>
                  <p>These terms and conditions govern the relationship between ABS Studio ("Provider") and the customer ("You"). They apply to all services related to our website subscriptions and digital services.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">2. Services</h2>
                  <p>We offer monthly subscriptions for website design, development, maintenance, and support. The exact services are described in the current price list.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">3. Contract Term and Cancellation</h2>
                  <p>The contract term is one month. The contract automatically renews for one month unless terminated at least 14 days before expiration. Cancellation can be made at any time via email or Telegram.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">4. Prices and Payment Terms</h2>
                  <p>Prices are in EUR and exclude taxes. The invoice is due within 14 days of the invoice date. If payment is not made on time, the contract may be terminated immediately.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">5. Liability</h2>
                  <p>ABS Studio is not liable for indirect, incidental, or consequential damages. The maximum liability is limited to the subscription price of one month.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">6. Data Protection</h2>
                  <p>The processing of personal data is subject to our privacy policy.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">7. Final Provisions</h2>
                  <p>German law applies. The place of jurisdiction is Dortmund, Germany.</p>
                </>
              )}
              {locale === "ru" && (
                <>
                  <h2 className="text-xl font-semibold mt-6 mb-3">1. Действие и изменения</h2>
                  <p>Эти условия использования регулируют отношения между ABS Studio («Поставщик») и клиентом («Вы»). Они применяются ко всем услугам, связанным с нашими подписками на веб-сайты и цифровыми услугами.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">2. Услуги</h2>
                  <p>Мы предлагаем ежемесячные подписки на дизайн веб-сайтов, разработку, обслуживание и поддержку. Точные услуги описаны в текущем прайс-листе.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">3. Срок договора и отмена</h2>
                  <p>Срок действия договора составляет один месяц. Договор автоматически продлевается на один месяц, если не будет отменен как минимум за 14 дней до истечения срока. Отмена может быть сделана в любое время по электронной почте или Telegram.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">4. Цены и условия оплаты</h2>
                  <p>Цены указаны в евро и не включают налоги. Счет подлежит оплате в течение 14 дней с даты счета. При несвоевременной оплате договор может быть расторгнут без уведомления.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">5. Ответственность</h2>
                  <p>ABS Studio не несет ответственность за косвенные, случайные или косвенные убытки. Максимальная ответственность ограничена суммой подписки за один месяц.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">6. Защита данных</h2>
                  <p>Обработка персональных данных осуществляется в соответствии с нашей политикой конфиденциальности.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">7. Заключительные положения</h2>
                  <p>Применяется немецкое право. Юрисдикция находится в Дортмунде, Германия.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
