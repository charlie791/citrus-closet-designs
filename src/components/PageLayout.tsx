
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  description?: string;
  canonicalUrl?: string;
}

const PageLayout = ({ 
  children, 
  title, 
  breadcrumbs,
  description,
  canonicalUrl 
}: PageLayoutProps) => {
  const pageTitle = `${title} | Citrus Closets Orlando`;
  const metaDescription = description || "Transform your space with custom closets and storage solutions in Orlando. Professional design and installation by Citrus Closets.";
  const canonical = canonicalUrl || window.location.href;

  // Create breadcrumb schema
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://citrusclosets.com"
      },
      ...(breadcrumbs?.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://citrusclosets.com${item.href}`
      })) || [])
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <Navigation />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          {breadcrumbs && (
            <>
              <nav className="mb-4" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-citrus-charcoal/70">
                  <li>
                    <Link to="/" className="hover:text-citrus-orange">Home</Link>
                  </li>
                  {breadcrumbs.map((item, index) => (
                    <li key={item.href} className="flex items-center">
                      <span className="mx-2">/</span>
                      {index === breadcrumbs.length - 1 ? (
                        <span className="text-citrus-charcoal" aria-current="page">{item.label}</span>
                      ) : (
                        <Link to={item.href} className="hover:text-citrus-orange">
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
              <script type="application/ld+json">
                {JSON.stringify(breadcrumbList)}
              </script>
            </>
          )}
          <h1 className="text-4xl font-bold text-citrus-charcoal mb-8">{title}</h1>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;
