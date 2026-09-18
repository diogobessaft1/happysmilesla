import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Mail, Menu, Phone } from "lucide-react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { clinic, sectionIds } from "@/data/clinic";

export const SiteHeader = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: sectionIds.services, label: t("nav.services") },
    { id: sectionIds.about, label: t("nav.about") },
    { id: sectionIds.testimonials, label: t("nav.testimonials") },
    { id: sectionIds.contact, label: t("nav.contact") },
  ];

  return (
    <>
      {/*
        Cyan utility bar. Text is navy rather than white: white on #25A1FE only
        reaches ~2.6:1 contrast, while navy reaches ~4.8:1 (WCAG AA).
      */}
      <div className="bg-brand-cyan text-brand-navy">
        <div className="container flex h-10 items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-4">
            <a
              className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/40"
              href={clinic.phone.href}
            >
              <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="sr-only">{t("topbar.callLabel")}</span>
              {clinic.phone.display}
            </a>
            <a
              className="hidden items-center gap-2 font-medium transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/40 md:inline-flex"
              href={`mailto:${clinic.email}`}
            >
              <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="sr-only">{t("topbar.emailLabel")}</span>
              {clinic.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="sr-only">{t("topbar.follow")}</span>
              <a
                href={clinic.social.facebook}
                target="_blank"
                rel="noreferrer noopener"
                className="transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/40"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href={clinic.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/40"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="sr-only">{t("topbar.language")}</span>
              <LanguageSwitcher className="h-8 min-w-[6.75rem] rounded-full border-transparent bg-brand-onDark/70 px-3 text-xs font-semibold text-brand-navy hover:bg-brand-onDark focus:ring-brand-navy/40 focus:ring-offset-0" />
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-brand-onDark/10 bg-primary text-primary-foreground shadow-elegant">
        <div className="container flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <a
            href={`#${sectionIds.home}`}
            className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
          >
            <img
              src={clinic.images.logo}
              alt={t("common.appName")}
              width={396}
              height={185}
              className="h-10 w-auto lg:h-11"
            />
          </a>

          <nav aria-label={t("nav.menuTitle")} className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-brand-onDark/85 transition-colors hover:bg-brand-onDark/10 hover:text-brand-onDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="yellow" size="sm" className="hidden sm:inline-flex">
              <a href={`#${sectionIds.contact}`}>{t("nav.cta")}</a>
            </Button>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="glass"
                  size="icon"
                  className="lg:hidden"
                  aria-label={t("nav.openMenu")}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-brand-onDark/10 bg-primary text-brand-onDark">
                <SheetHeader>
                  <SheetTitle className="text-left text-brand-onDark">
                    <img
                      src={clinic.images.logo}
                      alt={t("common.appName")}
                      width={396}
                      height={185}
                      className="h-10 w-auto"
                    />
                  </SheetTitle>
                </SheetHeader>
                <nav aria-label={t("nav.menuTitle")} className="mt-8 flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-4 py-3 text-base font-medium text-brand-onDark/90 transition-colors hover:bg-brand-onDark/10 hover:text-brand-onDark"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 flex flex-col gap-3">
                  <Button asChild variant="yellow" size="lg">
                    <a href={`#${sectionIds.contact}`} onClick={() => setMenuOpen(false)}>
                      {t("nav.cta")}
                    </a>
                  </Button>
                  <Button asChild variant="glass" size="lg">
                    <a href={clinic.phone.href}>
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {clinic.phone.display}
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};
