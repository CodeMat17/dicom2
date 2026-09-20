// Schema.org payloads, emitted as JSON-LD.
//
// Search engines read these to build the knowledge panel and the rich result
// for a story, which is the part of SEO that page copy alone cannot supply.

export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://dicom.gouni.edu.ng";

type Schema = Record<string, unknown>;

export function organizationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": `${SITE_URL}/#organization`,
    name: "Directorate of Competitions, Godfrey Okoye University",
    alternateName: "DICOM GOUNI",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    image: `${SITE_URL}/opengraph-image.jpg`,
    description:
      "The Directorate of Competitions at Godfrey Okoye University, Enugu — empowering students through competition and excellence.",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Godfrey Okoye University",
      url: "https://gouni.edu.ng",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Enugu",
      addressRegion: "Enugu State",
      addressCountry: "NG",
    },
  };
}

export function websiteSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "DICOM — Directorate of Competitions, GOUNI",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function articleSchema({
  title,
  description,
  slug,
  image,
  published,
}: {
  title: string;
  description: string;
  slug: string;
  image?: string | null;
  published: number;
}): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    datePublished: new Date(published).toISOString(),
    dateModified: new Date(published).toISOString(),
    mainEntityOfPage: `${SITE_URL}/achievements/${slug}`,
    image: image ? [image] : [`${SITE_URL}/opengraph-image.jpg`],
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[]
): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/**
 * Renders one or more schema objects. The payload is built on the server from
 * our own data, so there is no user input to smuggle a closing tag through;
 * `<` is still escaped as a belt-and-braces measure.
 */
export function JsonLd({ data }: { data: Schema | Schema[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload.length === 1 ? payload[0] : payload)
          .replace(/</g, "\\u003c"),
      }}
    />
  );
}
