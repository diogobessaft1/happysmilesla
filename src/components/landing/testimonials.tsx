import { useTranslation } from "react-i18next";
import { BadgeCheck, Quote, Star } from "lucide-react";

import { SectionHeading } from "@/components/landing/section-heading";
import { clinic, sectionIds } from "@/data/clinic";

const initialsFor = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

export const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: "one",
      quote: t("testimonial.one.quote"),
      name: t("testimonial.one.name"),
      source: t("testimonial.one.source"),
    },
    {
      id: "two",
      quote: t("testimonial.two.quote"),
      name: t("testimonial.two.name"),
      source: t("testimonial.two.source"),
    },
    {
      id: "three",
      quote: t("testimonial.three.quote"),
      name: t("testimonial.three.name"),
      source: t("testimonial.three.source"),
    },
  ];

  return (
    <section
      id={sectionIds.testimonials}
      className="relative overflow-hidden bg-gradient-navy py-16 text-brand-onDark sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl"
      />

      <div className="container relative flex flex-col gap-12">
        <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr] lg:items-center">
          <SectionHeading
            align="left"
            tone="dark"
            eyebrow={t("testimonials.eyebrow")}
            title={t("testimonials.title")}
            subtitle={t("testimonials.subtitle")}
          />

          <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[2rem] shadow-glow ring-1 ring-inset ring-brand-onDark/20 lg:mx-0 lg:max-w-none">
            <img
              src="/images/testimonial-patient.jpg"
              alt={t("testimonials.imageAlt")}
              width={349}
              height={431}
              loading="lazy"
              decoding="async"
              className="h-56 w-full object-cover object-top sm:h-64"
            />
          </div>
        </div>

        <ul className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.id}
              className="flex h-full flex-col gap-4 rounded-3xl bg-brand-onDark/[0.07] p-6 ring-1 ring-inset ring-brand-onDark/15 backdrop-blur-sm transition-colors duration-300 hover:bg-brand-onDark/[0.11]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-0.5 text-brand-yellow" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                <Quote className="h-7 w-7 shrink-0 text-brand-cyan/70" aria-hidden="true" />
              </div>

              <blockquote className="text-sm leading-relaxed text-brand-onDark/85">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-auto flex items-center gap-3 border-t border-brand-onDark/10 pt-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-cyan text-sm font-bold text-brand-onDark">
                  {initialsFor(testimonial.name)}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-brand-onDark">{testimonial.name}</span>
                  <span className="text-xs text-brand-onDark/60">{testimonial.source}</span>
                </span>
              </figcaption>
            </li>
          ))}
        </ul>

        <p className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-onDark/55">
          <BadgeCheck className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
          {t("testimonials.verified")} · {clinic.name}
        </p>
      </div>
    </section>
  );
};
