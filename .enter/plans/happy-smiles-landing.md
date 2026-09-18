# Happy Smiles LA — Landing Page

## Context

The project is currently the blank Enter template (`src/pages/Index.tsx` renders placeholder text, `src/index.css` / `tailwind.config.ts` hold generic shadcn tokens). The user wants a real, modern, trustworthy landing page for **Happy Smiles**, a dental clinic in Los Angeles, with 6 sections, quick-loading mobile-first markup, smooth scroll, a contact form, and SEO meta tags.

Decisions taken with the user:
- **Contact form → `mailto:` (no backend).** Submitting builds a pre-filled email to `happysmilesla@gmail.com` and opens the visitor's mail app. Backend/email delivery was explicitly declined.
- **Real content from the clinic's own site** (`https://happysmilesla.com/en/`): images to be exported locally, address/phone/socials/services from the live site.
- **Languages: English + Spanish** (Spanish is the clinic's primary audience — the live site is Spanish-first). The template's bundled Chinese locale is retired.
- Missing business details use realistic placeholders, clearly flagged for later replacement.

Verified real data (from the live site + public listings):
- Phone: `(323) 529-0002` → `tel:3235290002`
- Email: `happysmilesla@gmail.com`
- Address: `1655 S Western Ave, Ste. C, Los Angeles, CA 90006` (Harvard Heights) — geo `34.042953, -118.309971`
- Facebook: `https://www.facebook.com/HappysmilesLA/` · Instagram: `https://instagram.com/happysmiles_la`
- Positioning: free first consultation, interest-free up to 24 months, uninsured patients welcome, 8 specialties.

Placeholders to be flagged in chat after delivery: opening hours, review 2 & 3 attribution (see Testimonials), Spanish review wording, canonical domain.

## Design system

Brand palette (HSL from the user's hex values, added to `src/index.css` and exposed in `tailwind.config.ts`):

| Token | Hex | HSL |
|---|---|---|
| `--brand-navy` | `#001188` | `232 100% 27%` |
| `--brand-cyan` | `#25A1FE` | `206 99% 57%` |
| `--brand-yellow` | `#FFDE17` | `52 100% 55%` |
| `--brand-red` | `#E51A1C` | `359 100% 50%` |

- Map shadcn tokens onto the brand instead of hardcoding colors in components: `--primary` = navy, `--primary-foreground` = white, `--accent` = cyan, `--background` = white, `--foreground` = navy.
- Add tokens: `--gradient-hero` (navy → deeper navy), `--gradient-cyan`, `--shadow-elegant`, `--shadow-glow`, `--transition-smooth`, and animations `fade-up`, `float`.
- Tailwind: extend `colors.brand.{navy,cyan,yellow,red}`, `fontFamily.heading` (Poppins) / `fontFamily.sans` (Inter), the keyframes above, and a `container` tuned for the page.
- Dark mode: the design is dark-navy + white by nature; the `.dark` block gets aligned so tokens stay legible if the class is ever applied (no white-on-white).
- `src/components/ui/button.tsx`: add brand variants — `hero` (yellow bg + navy text + shadow-glow), `glass` (transparent + white border + white text, hover `bg-white/10`), `cyan` (cyan bg + white text). The stock `outline` variant is **not** transparent, so it is never used on navy backgrounds.

## Structure

New folder `src/components/landing/`, one small component per section, composed in `src/pages/Index.tsx`:

| File | Contents |
|---|---|
| `src/data/clinic.ts` | Single source of truth for phone, email, address, map embed URL, hours, socials, service list (id + icon path + i18n key), image paths, nav anchors. Nothing duplicated across components. |
| `site-header.tsx` | Cyan top bar (phone, email, socials, `LanguageSwitcher`) + sticky navy nav (logo, anchor links, yellow CTA). Mobile: Radix `Sheet` menu. |
| `hero.tsx` | Navy gradient, yellow-accented headline, sub-copy, CTA **"Book Your Free Consultation"** → `#contact` + **"Call (323) 529-0002"** → `tel:`, three trust bullets from the live site (best prices / free first consultation / qualified specialists), free-consultation seal, real clinic photo. |
| `services.tsx` | 8 cards — Braces & Invisalign, Implants, Teeth Whitening, Endodontics, Dentures, Crowns, Maxillofacial, Pediatric — with the clinic's own service icons in a uniform chip. |
| `about.tsx` | "Your smile is our goal" story, stat row, real clinic photos, value points (interest-free 24 months, uninsured welcome, free first visit), compact specialist strip using the real doctor photos. |
| `testimonials.tsx` | 3 review cards with star ratings. |
| `contact.tsx` | Address / phone / email / hours cards, Google Maps `<iframe>` for the real address, and the mailto contact form (name, email, phone, service, message). |
| `site-footer.tsx` | Logo, short blurb, quick links, services, contact, Facebook + Instagram links, copyright. |

Reused as-is: `@/components/ui/button`, `card`, `input`, `textarea`, `label`, `select`, `sheet`, `separator`, `badge`, `@/components/language-switcher`, `@/lib/utils` (`cn`), `sonner` toasts (already mounted in `App.tsx`).

## Images (exported from the clinic site)

Download into `public/images/` with `curl` (verified working), preferring thinner WordPress-resized variants for thumbnails:

- Logo: `LOGOFULL-01.png` → nav + footer (+ favicon).
- Seal: `SEAL03.png` → hero free-consultation badge.
- Service icons: `ortodoncia.png`, `pediatra.png`, `maxilo.png`, `DENTADURAS.png`, `BLANQUEAMIENTOS.png`, `IMPLANTE.png`. Endodontics and Crowns have no icon on the source site — probe for `endodoncia`/`corona` uploads; if absent, render those two with a lucide icon inside the same chip so the grid stays visually uniform (no emoji, per project rules).
- Hero/About photos: `IMAGE10.jpg`, `IMAGE01.jpg`, `IMAGE02.jpg`, `IMAGE05.jpg`, `IMAGE07.jpg`, `1.1.jpg`, `2.2.jpg`, `3.1.jpg`, `testimonio.jpg`, plus `-400x284` gallery thumbs.
- Doctors: `DR01`, `DR04`–`DR09`, `crazy`/`craig.jpg`, `DR-YOUNG3.png`.

All rendered with explicit `width`/`height` + `loading="lazy"` + `decoding="async"` (hero eager). The source site's MP4s are **not** used, to keep first paint fast.

## Content & i18n (English + Spanish)

Work follows the `enter_i18n` skill (already loaded; infrastructure is already present).

1. `i18n.config.json` → languages `en` (`English`, `["en"]`, ltr) and `es` (`Español`, `["es"]`, ltr); retire `zh-CN`. **Do not touch `src/i18n/*.ts` or the switcher internals** — `normalizeLanguage()` in `src/i18n/util.ts` is already the current version, so no carve-out is needed.
2. Delete `public/locales/zh-CN.json`; rewrite `public/locales/en.json` as the structural source of truth with flat dotted keys (`nav.services`, `hero.title`, `services.implants.title`, … `notFound.*` kept), then create `public/locales/es.json` with an identical key set, written in the clinic's own authentic Spanish where the live site provides it (services, About, section copy).
3. Every user-visible string renders through `useTranslation()` + `t("literal.key")` — no hardcoded literals, including `aria-label`s. Key sets in `en` and `es` must match exactly.
4. `LanguageSwitcher` is placed in the header top bar, restyled only via its existing `className` prop.
5. No nested JSON objects, no dynamic key construction, no manual cookie writes.

## Contact form (mailto, no backend)

`src/components/landing/contact.tsx`, using `react-hook-form` (already a dependency) for validation:
- Required name, email, message; optional phone + service `Select`.
- On valid submit, build `mailto:happysmilesla@gmail.com?subject=…&body=…` with `encodeURIComponent` and `window.location.href = mailtoUrl`, then show a `sonner` toast.
- UX safety for devices without a mail client: a visible "or email us directly" line with the address + a copy-to-clipboard button, and the phone CTA. No fake "message sent" state.
- The form never claims delivery — the copy states it opens the visitor's email app.

## SEO

`index.html`: `lang`, title, description, keywords (Los Angeles dentist, braces, dental implants, teeth whitening, endodontics, dentures, crowns, maxillofacial, pediatric dentist, Spanish speaking dentist in LA), canonical, robots, theme-color `#001188`, OG + Twitter tags (absolute image URL from the clinic's uploads), Google Fonts with `display=swap` (Poppins + Inter, preconnect already present), and JSON-LD `Dentist` schema with name, image, telephone, full address, `geo`, `openingHoursSpecification`, `priceRange`, `areaServed`, `sameAs` (Facebook, Instagram). Per-section `h2`/`h3` structure and descriptive `alt` text reinforce on-page SEO.

Also: `scroll-behavior: smooth` on `html` with `scroll-padding-top` matching the sticky header, and a `prefers-reduced-motion` override; `src/pages/NotFound.tsx` gets a light brand restyle but keeps its existing `notFound.*` keys.

## Critical files

- Modify: `src/index.css`, `tailwind.config.ts`, `index.html`, `i18n.config.json`, `public/locales/en.json`, `public/locales/es.json`, `src/pages/Index.tsx`, `src/pages/NotFound.tsx`, `src/components/ui/button.tsx`
- Create: `src/data/clinic.ts`, `src/components/landing/{site-header,hero,services,about,testimonials,contact,site-footer}.tsx`, `public/images/*`
- Delete: `public/locales/zh-CN.json`

## Implementation checklist

- [ ] `src/index.css`: navy/cyan/yellow/red brand tokens, gradients, shadows, smooth scroll + `scroll-padding-top`, reduced-motion guard; shadcn tokens remapped to the brand.
- [ ] `tailwind.config.ts`: `brand` colors, heading/sans font families, keyframes + animations; page stays responsive from 390px up.
- [ ] `src/components/ui/button.tsx`: `hero`, `glass`, `cyan` variants added; no white text on the stock non-transparent `outline` variant.
- [ ] Images downloaded to `public/images/` and confirmed non-zero, correct MIME, under a sane size budget before being referenced.
- [ ] `src/data/clinic.ts` created with phone, email, address, map embed, hours, socials, services, image paths, nav anchors.
- [ ] 7 landing components created; `Index.tsx` composes them in order Hero → Services → About → Testimonials → Contact → Footer.
- [ ] Header: cyan top bar + sticky navy nav, anchor links scroll to the right `id`s, mobile menu opens and closes.
- [ ] Hero CTA buttons resolve to `#contact` and `tel:3235290002`; all 8 services render with an icon and name.
- [ ] Contact form: valid input builds a correctly encoded `mailto:happysmilesla@gmail.com`; invalid input blocks submit and shows field errors; copy-email + phone fallbacks present.
- [ ] Footer social links point to the real Facebook and Instagram URLs.
- [ ] `i18n.config.json` = `en` + `es`; `public/locales/en.json` and `es.json` have identical key sets with no empty values; `zh-CN.json` deleted.
- [ ] Every visible string in the landing components goes through `t("literal.key")` (no literals left in JSX or `aria-label`s).
- [ ] `index.html`: title, description, keywords, canonical, OG/Twitter, theme-color, and valid JSON-LD `Dentist` schema.
- [ ] `NotFound.tsx` restyled to the brand without breaking its existing keys.

## Verification checklist

- [ ] `pnpm exec tsc --noEmit` and `pnpm lint` pass with no new errors.
- [ ] `pnpm run build` completes successfully.
- [ ] `node /workspace/.agents/skills/enter_i18n/assets/scripts/check-i18n.mjs` prints `i18n check passed.`
- [ ] `node /workspace/.agents/skills/enter_i18n/assets/scripts/scan-i18n.mjs` runs last and writes reports without errors.
- [ ] Positive: page renders at `desktop_1280` — hero, 8 services, about, 3 testimonials, map, form, footer all visible and on-brand.
- [ ] Boundary: page renders at `mobile_390` — no horizontal overflow, nav collapses to the menu, grid stacks single-column.
- [ ] Language switch to Español re-renders every section in Spanish and persists across refresh (cookie + `<html lang>`).
- [ ] Negative: submitting the empty form shows validation errors and never navigates; switching to Spanish must not leave any English literal on the page.
- [ ] No 404s in the network log for `/images/*`; all images visibly load.
- [ ] `grep`-sweep confirms no hardcoded `#001188`-style colors or literals inside landing components.
