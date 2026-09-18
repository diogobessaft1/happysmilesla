/**
 * Single source of truth for Happy Smiles clinic data.
 *
 * Verified from the clinic's own site (happysmilesla.com) and public listings.
 * Translatable copy lives in public/locales/*.json — never here.
 *
 * PLACEHOLDER: `hours` are not published by the clinic; replace with the real
 * opening times before launch.
 */
export const clinic = {
  name: "Happy Smiles",
  phone: {
    display: "(323) 529-0002",
    href: "tel:+13235290002",
  },
  email: "happysmilesla@gmail.com",
  address: {
    street: "1655 S Western Ave, Ste. C",
    locality: "Los Angeles",
    region: "CA",
    postalCode: "90006",
    country: "US",
  },
  geo: {
    latitude: 34.042953,
    longitude: -118.309971,
  },
  social: {
    facebook: "https://www.facebook.com/HappysmilesLA/",
    instagram: "https://instagram.com/happysmiles_la",
  },
  map: {
    embedUrl:
      "https://www.google.com/maps?q=1655%20S%20Western%20Ave%20Ste%20C%2C%20Los%20Angeles%2C%20CA%2090006&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=1655+S+Western+Ave+Ste+C%2C+Los+Angeles%2C+CA+90006",
  },
  hours: {
    weekdays: "9:00 AM – 6:00 PM",
    saturday: "9:00 AM – 3:00 PM",
  },
  images: {
    logo: "/images/logo-full.png",
    seal: "/images/seal.png",
    hero: "/images/hero-patient.jpg",
    about: "/images/about-smile.jpg",
    braces: "/images/braces-aligners.jpg",
  },
} as const;

export const clinicFullAddress = `${clinic.address.street}, ${clinic.address.locality}, ${clinic.address.region} ${clinic.address.postalCode}`;

/** Anchors used by the header nav, footer nav and every in-page CTA. */
export const sectionIds = {
  home: "home",
  services: "services",
  about: "about",
  testimonials: "testimonials",
  contact: "contact",
} as const;

/**
 * Service artwork exported from the clinic's site. These are white line-art
 * PNGs on a transparent background, so they must sit on a navy surface.
 * Endodontics and crowns have no source artwork — they use a lucide glyph on
 * the same navy chip so the grid stays visually uniform.
 */
export const serviceImages = {
  orthodontics: "/images/service-orthodontics.png",
  pediatric: "/images/service-pediatric.png",
  maxillofacial: "/images/service-maxillofacial.png",
  dentures: "/images/service-dentures.png",
  whitening: "/images/service-whitening.png",
  implants: "/images/service-implants.png",
} as const;

export const teamImages = {
  nakamatsu: "/images/dr-nakamatsu.jpg",
  choi: "/images/dr-choi.jpg",
  riazi: "/images/dr-riazi.jpg",
  arman: "/images/dr-arman.jpg",
  chiu: "/images/dr-chiu.jpg",
  solano: "/images/dr-solano.jpg",
  paz: "/images/dr-paz.jpg",
  young: "/images/dr-young.png",
} as const;
