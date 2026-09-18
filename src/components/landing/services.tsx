import { useTranslation } from "react-i18next";
import { ArrowRight, Crown, Drill } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { sectionIds, serviceImages } from "@/data/clinic";

/**
 * The six icons exported from the clinic's site are white line art on a
 * transparent background, so they always sit on the navy chip below.
 * Endodontics and crowns have no source artwork and use an equivalent lucide
 * glyph in the same chip, keeping the grid uniform.
 */
export const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: "braces",
      title: t("services.braces.title"),
      description: t("services.braces.description"),
      image: serviceImages.orthodontics,
    },
    {
      id: "implants",
      title: t("services.implants.title"),
      description: t("services.implants.description"),
      image: serviceImages.implants,
    },
    {
      id: "whitening",
      title: t("services.whitening.title"),
      description: t("services.whitening.description"),
      image: serviceImages.whitening,
    },
    {
      id: "endodontics",
      title: t("services.endodontics.title"),
      description: t("services.endodontics.description"),
      icon: <Drill className="h-9 w-9 text-brand-onDark" aria-hidden="true" strokeWidth={1.75} />,
    },
    {
      id: "dentures",
      title: t("services.dentures.title"),
      description: t("services.dentures.description"),
      image: serviceImages.dentures,
    },
    {
      id: "crowns",
      title: t("services.crowns.title"),
      description: t("services.crowns.description"),
      icon: <Crown className="h-9 w-9 text-brand-onDark" aria-hidden="true" strokeWidth={1.75} />,
    },
    {
      id: "maxillofacial",
      title: t("services.maxillofacial.title"),
      description: t("services.maxillofacial.description"),
      image: serviceImages.maxillofacial,
    },
    {
      id: "pediatric",
      title: t("services.pediatric.title"),
      description: t("services.pediatric.description"),
      image: serviceImages.pediatric,
    },
  ];

  return (
    <section id={sectionIds.services} className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col gap-12">
        <SectionHeading
          eyebrow={t("services.eyebrow")}
          title={t("services.title")}
          subtitle={t("services.subtitle")}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/50 hover:shadow-glow"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-navy shadow-card">
                {service.image ? (
                  <img
                    src={service.image}
                    alt=""
                    aria-hidden="true"
                    width={136}
                    height={136}
                    loading="lazy"
                    decoding="async"
                    className="h-10 w-10"
                  />
                ) : (
                  service.icon
                )}
              </span>

              <h3 className="text-lg font-semibold text-brand-navy">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <a
                href={`#${sectionIds.contact}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand-navy transition-colors hover:text-brand-navy-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50"
              >
                {t("services.cta")}
                <ArrowRight
                  className="h-4 w-4 text-brand-cyan transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
