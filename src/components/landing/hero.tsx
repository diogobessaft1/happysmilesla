import { useTranslation } from "react-i18next";
import { CalendarCheck, Check, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { clinic, sectionIds } from "@/data/clinic";

export const Hero = () => {
  const { t } = useTranslation();

  const trustPoints = [
    t("hero.trust.prices"),
    t("hero.trust.consultation"),
    t("hero.trust.specialists"),
  ];

  const highlights = [
    { value: t("highlights.specialties.value"), label: t("highlights.specialties.label") },
    { value: t("highlights.financing.value"), label: t("highlights.financing.label") },
    { value: t("highlights.consultation.value"), label: t("highlights.consultation.label") },
  ];

  return (
    <section id={sectionIds.home} className="relative overflow-hidden bg-gradient-hero text-brand-onDark">
      {/* decorative brand shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-yellow/10 blur-3xl"
      />

      <div className="container relative grid gap-12 pb-10 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:pb-16 lg:pt-20">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-onDark/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-onDark ring-1 ring-inset ring-brand-onDark/20">
            <MapPin className="h-3.5 w-3.5 text-brand-cyan-light" aria-hidden="true" />
            {t("hero.eyebrow")}
          </span>

          <h1 className="text-[2.15rem] font-bold leading-[1.08] text-brand-onDark sm:text-5xl lg:text-[3.4rem]">
            {t("hero.titleLead")}
            <span className="mt-1 block text-brand-yellow">{t("hero.titleAccent")}</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-brand-onDark/80 sm:text-lg">
            {t("hero.subtitle")}
          </p>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="yellow" size="xl" className="w-full sm:w-auto">
              <a href={`#${sectionIds.contact}`}>
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                {t("hero.ctaPrimary")}
              </a>
            </Button>
            <Button asChild variant="glass" size="xl" className="w-full sm:w-auto">
              <a href={clinic.phone.href}>
                <Phone className="h-5 w-5" aria-hidden="true" />
                {t("hero.ctaSecondary")}
              </a>
            </Button>
          </div>

          <ul className="mt-2 flex flex-col gap-2.5">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-brand-onDark/85 sm:text-base">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cyan">
                  <Check className="h-3 w-3 text-brand-onDark" aria-hidden="true" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] shadow-glow ring-1 ring-inset ring-brand-onDark/15">
            <img
              src={clinic.images.hero}
              alt={t("hero.imageAlt")}
              width={955}
              height={579}
              fetchPriority="high"
              className="h-[20rem] w-full object-cover object-center sm:h-[24rem] lg:h-[28rem]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/70 via-transparent to-transparent"
            />
          </div>

          {/* decorative brand seal */}
          <img
            src={clinic.images.seal}
            alt=""
            aria-hidden="true"
            width={147}
            height={144}
            className="absolute -right-2 top-4 h-16 w-16 animate-float-soft drop-shadow-lg sm:h-20 sm:w-20"
          />

          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-card p-3 pr-5 text-card-foreground shadow-elegant ring-1 ring-brand-navy/5 sm:left-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-cyan text-brand-onDark">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {t("hero.badgeLineOne")}
              </span>
              <span className="block text-lg font-bold text-brand-navy">
                {t("hero.badgeLineTwo")}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="container relative pb-16">
        <dl className="mt-8 grid gap-4 rounded-3xl bg-brand-onDark/[0.07] p-5 ring-1 ring-inset ring-brand-onDark/15 backdrop-blur-sm sm:grid-cols-3 sm:p-6">
          {highlights.map((item) => (
            <div key={item.label} className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-1">
              <dt className="sr-only">{item.label}</dt>
              <dd className="flex items-baseline gap-3 sm:flex-col sm:gap-1">
                <span className="text-3xl font-bold text-brand-yellow sm:text-4xl">{item.value}</span>
                <span className="text-sm leading-snug text-brand-onDark/80">{item.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
