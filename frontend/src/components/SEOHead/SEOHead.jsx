import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://ns-sitecraft-solutions.vercel.app';
const SITE_NAME = 'NS SiteCraft Solutions';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * SEOHead — Reusable per-page SEO component.
 * Provides: title, meta description, canonical, OG tags, Twitter tags, and optional JSON-LD.
 *
 * @param {string} title - Page title (appends " | NS SiteCraft Solutions" automatically)
 * @param {string} description - Meta description (150–160 chars ideal)
 * @param {string} canonicalPath - Path portion, e.g. "/services" (full URL built from SITE_URL)
 * @param {string} keywords - Comma-separated keywords
 * @param {object|array} structuredData - JSON-LD object(s) to inject
 * @param {string} ogType - Open Graph type, default "website"
 * @param {string} ogImage - OG image URL override
 */
const SEOHead = ({
    title,
    description,
    canonicalPath = '/',
    keywords = '',
    structuredData = null,
    ogType = 'website',
    ogImage = DEFAULT_OG_IMAGE,
}) => {
    const fullTitle = title
        ? `${title} | ${SITE_NAME}`
        : `${SITE_NAME} - Custom Web & Software Solutions in Hyderabad`;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    // Support both single object and array of JSON-LD schemas
    const schemas = structuredData
        ? Array.isArray(structuredData)
            ? structuredData
            : [structuredData]
        : [];

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="author" content={SITE_NAME} />

            {/* Canonical */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Robots */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            {/* JSON-LD Structured Data */}
            {schemas.map((schema, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEOHead;
