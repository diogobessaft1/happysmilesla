import { useTranslation } from "react-i18next";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

import { clinic, clinicFullAddress, sectionIds } from "@/data/clinic";

export const SiteFooter = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { id: sectionIds.home, label: t("nav.home") },
    { id: sectionIds.services, label: t("nav.services") },
    { id: sectionIds.about, label: t("nav.about") },
    { id: sectionIds.testimonials, label: t("nav.testimonials") },
    { id: sectionIds.contact, label: t("nav.contact") },
  ];

  const serviceLinks = [
    t("services.braces.title"),
    t("services.implants.title"),
    t("services.whitening.title"),
    t("services.endodontics.title"),
    t("services.dentures.title"),
    t("services.crowns.title"),
    t("services.maxillofacial.title"),
    t("services.pediatric.title"),
  ];

  return (
    <footer className="bg-gradient-navy text-brand-onDark/70">
      <div className="container grid gap-10 py-14 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <img
            src={clinic.images.logo}
            alt={t("common.appName")}
            width={396}
            height={185}
            loading="lazy"
            decoding="async"
            className="h-12 w-auto self-center"
          />
          <p className="text-sm leading-relaxed">{t("footer.tagline")}</p>
          <p className="sr-only">{t("footer.follow")}</p>
          <div className="flex items-center gap-3">
            <a
              href={clinic.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-onDark/10 text-brand-onDark transition-colors hover:bg-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href={clinic.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-onDark/10 text-brand-onDark transition-colors hover:bg-brand-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>

        <nav aria-label={t("footer.quickLinks")} className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-onDark">
            {t("footer.quickLinks")}
          </h2>
          <ul className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="text-sm transition-colors hover:text-brand-cyan-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("footer.services")} className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-onDark">
            {t("footer.services")}
          </h2>
          <ul className="flex flex-col gap-2.5">
            {serviceLinks.map((service) => (
              <li key={service}>
                <a
                  href={`#${sectionIds.services}`}
                  className="text-sm transition-colors hover:text-brand-cyan-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
                >
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-onDark">
            {t("footer.contact")}
          </h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
              <span className="leading-relaxed">{clinicFullAddress}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
              <a
                className="transition-colors hover:text-brand-cyan-light"
                href={clinic.phone.href}
              >
                {clinic.phone.display}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
              <a
                className="break-all transition-colors hover:text-brand-cyan-light"
                href={`mailto:${clinic.email}`}
              >
                {clinic.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
              <span className="leading-relaxed">
                {`${t("contact.hours.weekdaysLabel")} ${clinic.hours.weekdays}`}
                <br />
                {`${t("contact.hours.saturdayLabel")} ${clinic.hours.saturday}`}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-onDark/10">
        <div className="container flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {t("common.appName")}. {t("footer.rights")}
          </p>
          <p>{t("footer.addressLine")}</p>
        </div>
      </div>
    </footer>
  );
};
