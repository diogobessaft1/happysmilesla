import { useTranslation } from "react-i18next";
import { BadgeCheck, ShieldCheck, Stethoscope, Users } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { Button } from "@/components/ui/button";
import { clinic, sectionIds, teamImages } from "@/data/clinic";

export const About = () => {
  const { t } = useTranslation();

  const points = [
    { icon: Stethoscope, label: t("about.points.specialties") },
    { icon: BadgeCheck, label: t("about.points.financing") },
    { icon: ShieldCheck, label: t("about.points.uninsured") },
    { icon: Users, label: t("about.points.family") },
  ];

  /* Doctor names are proper nouns and stay in Latin script in both languages. */
  const team = [
    { name: "Dr. Craig Nakamatsu", role: t("about.role.endodontist"), image: teamImages.nakamatsu },
    { name: "Dr. Hoyong Choi", role: t("about.role.pediatric"), image: teamImages.choi },
    { name: "Dr. Ali Riazi", role: t("about.role.implant"), image: teamImages.riazi },
    { name: "Dr. Dalia Solano", role: t("about.role.orthodontist"), image: teamImages.solano },
    { name: "Dr. Marjan Arman", role: t("about.role.general"), image: teamImages.arman },
    { name: "Dr. Victoria Chiu", role: t("about.role.general"), image: teamImages.chiu },
    { name: "Dr. Rody Paz", role: t("about.role.general"), image: teamImages.paz },
    { name: "Dr. Keane Young", role: t("about.role.general"), image: teamImages.young },
  ];

  return (
    <section id={sectionIds.about} className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-5">
          <SectionHeading
            align="left"
            eyebrow={t("about.eyebrow")}
            title={t("about.title")}
          />
          <p className="text-lg font-medium leading-snug text-brand-navy">{t("about.lead")}</p>
          <p className="text-base leading-relaxed text-muted-foreground">{t("about.body")}</p>
          <p className="text-base leading-relaxed text-muted-foreground">
            {t("about.bodySecond")}
          </p>

          <ul className="mt-1 grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <li
                key={point.label}
                className="flex items-start gap-3 rounded-2xl bg-secondary/60 p-3.5 text-sm font-medium text-brand-navy ring-1 ring-inset ring-brand-cyan/20"
              >
                <point.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-cyan" aria-hidden="true" />
                {point.label}
              </li>
            ))}
          </ul>

          <div className="mt-2">
            <Button asChild variant="cyan" size="lg">
              <a href={`#${sectionIds.contact}`}>{t("nav.cta")}</a>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-[2rem] shadow-elegant ring-1 ring-brand-navy/5">
            <img
              src={clinic.images.about}
              alt={t("about.imageAlt")}
              width={955}
              height={579}
              loading="lazy"
              decoding="async"
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>

          <div className="grid grid-cols-[1.6fr_1fr] gap-4">
            <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-brand-navy/5">
              <img
                src={clinic.images.braces}
                alt={t("about.bracesImageAlt")}
                width={955}
                height={579}
                loading="lazy"
                decoding="async"
                className="h-36 w-full object-cover sm:h-44"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-gradient-navy p-4 text-center">
              <img
                src={clinic.images.seal}
                alt=""
                aria-hidden="true"
                width={147}
                height={144}
                loading="lazy"
                decoding="async"
                className="h-14 w-14"
              />
              <p className="text-[0.7rem] font-semibold uppercase leading-tight tracking-[0.12em] text-brand-yellow">
                {t("common.brandTagline")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-16 flex flex-col gap-9 lg:mt-24">
        <SectionHeading title={t("about.team.title")} subtitle={t("about.team.subtitle")} />

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {team.map((member) => (
            <li
              key={member.name}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow duration-300 hover:shadow-elegant"
            >
              <img
                src={member.image}
                alt={member.name}
                width={349}
                height={431}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="flex flex-col gap-0.5 p-3.5">
                <p className="text-sm font-semibold leading-snug text-brand-navy">{member.name}</p>
                <p className="text-xs leading-snug text-muted-foreground">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
