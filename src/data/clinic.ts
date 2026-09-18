/**
 * Single source of truth for Happy Smiles clinic data.
 *
 * Verified from the clinic's own site (happysmilesla.com) and public listings.
 * Translatable copy lives in public/locales/*.json — never here.
 *
 * PLACEHOLDER: `hours` are not published by the clinic; replace with the real
 * opening times before launch.
 */

export type ClinicLocation = {
  id: string;
  /** Office name — a brand proper noun, so it is never translated. */
  name: string;
  isPrimary: boolean;
  phone: { display: string; href: string };
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
  };
};

/**
 * All three offices, taken from the clinic's own locations page
 * (happysmilesla.com/en/localidades-2/). Street wording for the primary office
 * matches what Google Maps and Yelp publish, so "Get directions" lands on the
 * listing patients already see. Landmark hints are translatable and live in the
 * locale files.
 */
export const locations: ClinicLocation[] = [
  {
    id: "westernAve",
    name: "Happy Smiles Western Ave",
    isPrimary: true,
    phone: { display: "(323) 529-0002", href: "tel:+13235290002" },
    address: {
      street: "1655 S Western Ave, Ste. C",
      locality: "Los Angeles",
      region: "CA",
      postalCode: "90006",
    },
  },
  {
    id: "plazaMexico",
    name: "Happy Smiles Plaza Mexico",
    isPrimary: false,
    phone: { display: "(323) 515-1088", href: "tel:+13235151088" },
    address: {
      street: "11215 Long Beach Blvd, Ste. 1002",
      locality: "Lynwood",
      region: "CA",
      postalCode: "90262",
    },
  },
  {
    id: "whittier",
    name: "Happy Smiles Whittier",
    isPrimary: false,
    phone: { display: "(562) 378-0200", href: "tel:+15623780200" },
    address: {
      street: "9150 Painter Ave, Suite 105A",
      locality: "Whittier",
      region: "CA",
      postalCode: "90602",
    },
  },
];

export const primaryLocation = locations[0];

export const formatAddress = (location: ClinicLocation) =>
  `${location.address.street}, ${location.address.locality}, ${location.address.region} ${location.address.postalCode}`;

export const directionsUrlFor = (location: ClinicLocation) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(formatAddress(location))}`;

export const clinic = {
  name: "Happy Smiles",
  phone: primaryLocation.phone,
  email: "happysmilesla@gmail.com",
  geo: {
    latitude: 34.042953,
    longitude: -118.309971,
  },
  social: {
    facebook: "https://www.facebook.com/HappysmilesLA/",
    instagram: "https://instagram.com/happysmiles_la",
  },
  map: {
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(formatAddress(primaryLocation))}&output=embed`,
    directionsUrl: directionsUrlFor(primaryLocation),
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
};

export const clinicFullAddress = formatAddress(primaryLocation);

/** Anchors used by the header nav, footer nav and every in-page CTA. */
export const sectionIds = {
  home: "home",
  services: "services",
  about: "about",
  locations: "locations",
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
