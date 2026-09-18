import { useTranslation } from "react-i18next";
import { MapPin, Navigation, Phone } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { Button } from "@/components/ui/button";
import { directionsUrlFor, formatAddress, locations, sectionIds } from "@/data/clinic";
import { cn } from "@/lib/utils";

export const Locations = () => {
  const { t } = useTranslation();

  /*
   * Landmark hints printed on the clinic's own locations page; they are the
   * detail patients actually use to find the office. Keys stay string literals
   * so i18n coverage reporting remains accurate.
   */
  const landmarks: Record<string, string> = {
    westernAve: t("locations.landmark.westernAve"),
    plazaMexico: t("locations.landmark.plazaMexico"),
  };

  return (
    <section id={sectionIds.locations} className="bg-secondary/60 py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col gap-10">
        <SectionHeading
          eyebrow={t("locations.eyebrow")}
          title={t("locations.title")}
          subtitle={t("locations.subtitle")}
        />

        <ul className="grid gap-5 md:grid-cols-3">
          {locations.map((location) => {
            const landmark = landmarks[location.id];

            return (
              <li
                key={location.id}
                className={cn(
                  "flex flex-col gap-4 rounded-3xl border bg-card p-6 shadow-card",
                  location.isPrimary ? "border-brand-cyan/50 shadow-glow" : "border-border",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-onDark">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {location.isPrimary ? (
                    <span className="rounded-full bg-secondary px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand-navy ring-1 ring-inset ring-brand-cyan/30">
                      {t("locations.primary")}
                    </span>
                  ) : null}
                </div>

                <h3 className="text-lg font-semibold leading-snug text-brand-navy">
                  {location.name}
                </h3>

                <div className="flex flex-col gap-1.5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {formatAddress(location)}
                  </p>
                  {landmark ? (
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {landmark}
                    </p>
                  ) : null}
                </div>

                <a
                  href={location.phone.href}
                  className="inline-flex items-center gap-2 text-base font-semibold text-brand-navy transition-colors hover:text-brand-navy-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
                  {location.phone.display}
                </a>

                <Button asChild variant="navyOutline" size="sm" className="mt-auto w-full">
                  <a
                    href={directionsUrlFor(location)}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                    {t("contact.address.action")}
                  </a>
                </Button>
              </li>
            );
          })}
        </ul>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          {t("locations.hoursNote")}
        </p>
      </div>
    </section>
  );
};
