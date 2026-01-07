import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

// foir the lolls

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="react, seo, google search, meta tags" />
      <meta name="author" content="Your Name" />

      {/* Open Graph (OG) Tags for Google & Social Media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/*  favicon  */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />

      {/* Structured Data (Schema.org JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description: description,
          image: image,
          url: url,
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
