import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Clock, Copy, ExternalLink, Mail, MapPin, Navigation, Phone, Send } from "lucide-react";
import { toast } from "sonner";

import { SectionHeading } from "@/components/landing/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { clinic, clinicFullAddress, sectionIds } from "@/data/clinic";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Contact = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: { name: "", email: "", phone: "", service: "", message: "" },
  });

  const serviceOptions = [
    { value: "braces", label: t("services.braces.title") },
    { value: "implants", label: t("services.implants.title") },
    { value: "whitening", label: t("services.whitening.title") },
    { value: "endodontics", label: t("services.endodontics.title") },
    { value: "dentures", label: t("services.dentures.title") },
    { value: "crowns", label: t("services.crowns.title") },
    { value: "maxillofacial", label: t("services.maxillofacial.title") },
    { value: "pediatric", label: t("services.pediatric.title") },
    { value: "other", label: t("contact.form.serviceOther") },
  ];

  /**
   * No backend: the form hands a fully pre-filled message to the visitor's
   * email app. The copy alongside it never claims the message was delivered.
   */
  const onSubmit = (values: ContactFormValues) => {
    const serviceLabel =
      serviceOptions.find((option) => option.value === values.service)?.label ?? "";

    const body = [
      `${t("contact.form.body.name")}: ${values.name}`,
      `${t("contact.form.body.email")}: ${values.email}`,
      values.phone ? `${t("contact.form.body.phone")}: ${values.phone}` : "",
      serviceLabel ? `${t("contact.form.body.service")}: ${serviceLabel}` : "",
      "",
      `${t("contact.form.body.message")}:`,
      values.message,
    ].filter((line) => line !== "");

    const mailtoUrl = `mailto:${clinic.email}?subject=${encodeURIComponent(
      t("contact.form.emailSubject"),
    )}&body=${encodeURIComponent(body.join("\n"))}`;

    window.location.href = mailtoUrl;
    toast.success(t("contact.form.opened"));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(clinic.email);
      toast.success(t("contact.form.copied"));
    } catch {
      // The clipboard can be blocked (for example inside a preview frame), so
      // surface the address itself instead of failing silently.
      toast(clinic.email);
    }
  };

  const details = [
    {
      icon: MapPin,
      label: t("contact.address.label"),
      value: clinicFullAddress,
      action: {
        label: t("contact.address.action"),
        href: clinic.map.directionsUrl,
        external: true,
      },
    },
    {
      icon: Phone,
      label: t("contact.phone.label"),
      value: clinic.phone.display,
      action: { label: t("contact.phone.action"), href: clinic.phone.href, external: false },
    },
    {
      icon: Mail,
      label: t("contact.email.label"),
      value: clinic.email,
      action: { label: t("contact.email.action"), href: `mailto:${clinic.email}`, external: false },
    },
    {
      icon: Clock,
      label: t("contact.hours.label"),
      value: `${t("contact.hours.weekdaysLabel")} ${clinic.hours.weekdays} · ${t("contact.hours.saturdayLabel")} ${clinic.hours.saturday} · ${t("contact.hours.sundayLabel")}: ${t("contact.hours.closed")}`,
      action: null,
    },
  ];

  return (
    <section id={sectionIds.contact} className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col gap-12">
        <SectionHeading
          eyebrow={t("contact.eyebrow")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-5">
            <ul className="grid gap-4 sm:grid-cols-2">
              {details.map((detail) => (
                <li
                  key={detail.label}
                  className="flex flex-col gap-3 rounded-3xl border border-border bg-gradient-card p-5 shadow-card"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-brand-onDark">
                    <detail.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {detail.label}
                  </span>
                  <span className="break-words text-sm font-medium leading-relaxed text-brand-navy">
                    {detail.value}
                  </span>
                  {detail.action ? (
                    <a
                      href={detail.action.href}
                      target={detail.action.external ? "_blank" : undefined}
                      rel={detail.action.external ? "noreferrer noopener" : undefined}
                      className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy transition-colors hover:text-brand-navy-soft"
                    >
                      {detail.action.label}
                      {detail.action.external ? (
                        <ExternalLink className="h-3.5 w-3.5 text-brand-cyan" aria-hidden="true" />
                      ) : null}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>

            <p className="text-xs leading-relaxed text-muted-foreground">
              {t("contact.hours.placeholderNote")}
            </p>

            {/*
              The map loads lazily, so the card always carries the address and a
              directions action below the frame — it never reads as an empty box,
              even before (or without) the embed painting.
            */}
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
              <iframe
                title={t("contact.map.title")}
                src={clinic.map.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full border-0 bg-secondary sm:h-72"
              />
              <div className="flex flex-col gap-3 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-start gap-2 text-sm font-medium text-brand-navy">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
                  {clinicFullAddress}
                </p>
                <Button asChild variant="navyOutline" size="sm" className="w-full sm:w-auto">
                  <a
                    href={clinic.map.directionsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                    {t("contact.address.action")}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-[2rem] border border-border bg-gradient-card p-6 shadow-elegant sm:p-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl text-brand-navy">{t("contact.form.title")}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("contact.form.note")}
              </p>
            </div>

            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              aria-label={t("contact.form.title")}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-name">{t("contact.form.name")}</Label>
                  <Input
                    id="contact-name"
                    autoComplete="name"
                    placeholder={t("contact.form.namePlaceholder")}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    {...register("name", { required: t("contact.form.error.required") })}
                  />
                  {errors.name?.message ? (
                    <p id="contact-name-error" className="text-xs font-medium text-destructive">
                      {errors.name.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-email">{t("contact.form.email")}</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("contact.form.emailPlaceholder")}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    {...register("email", {
                      required: t("contact.form.error.required"),
                      pattern: { value: EMAIL_PATTERN, message: t("contact.form.error.email") },
                    })}
                  />
                  {errors.email?.message ? (
                    <p id="contact-email-error" className="text-xs font-medium text-destructive">
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-phone">{t("contact.form.phone")}</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t("contact.form.phonePlaceholder")}
                    {...register("phone")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-service">{t("contact.form.service")}</Label>
                  <Controller
                    control={control}
                    name="service"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="contact-service" className="w-full">
                          <SelectValue placeholder={t("contact.form.servicePlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-message">{t("contact.form.message")}</Label>
                <Textarea
                  id="contact-message"
                  rows={5}
                  placeholder={t("contact.form.messagePlaceholder")}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  {...register("message", { required: t("contact.form.error.required") })}
                />
                {errors.message?.message ? (
                  <p id="contact-message-error" className="text-xs font-medium text-destructive">
                    {errors.message.message}
                  </p>
                ) : null}
              </div>

              <Button type="submit" variant="cyan" size="lg" className="w-full">
                <Send className="h-4 w-4" aria-hidden="true" />
                {t("contact.form.submit")}
              </Button>
            </form>

            <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {t("contact.form.orEmail")}{" "}
                <a
                  href={`mailto:${clinic.email}`}
                  className="font-semibold text-brand-navy underline-offset-4 hover:underline"
                >
                  {clinic.email}
                </a>
              </p>
              <Button type="button" variant="navyOutline" size="sm" onClick={handleCopyEmail}>
                <Copy className="h-4 w-4" aria-hidden="true" />
                {t("contact.form.copyEmail")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
