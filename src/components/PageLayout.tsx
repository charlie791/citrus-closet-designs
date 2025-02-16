
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}

const PageLayout = ({ children, title, breadcrumbs }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {breadcrumbs && (
            <nav className="mb-4">
              <ol className="flex items-center space-x-2 text-sm text-citrus-charcoal/70">
                <li>
                  <Link to="/" className="hover:text-citrus-orange">Home</Link>
                </li>
                {breadcrumbs.map((item, index) => (
                  <li key={item.href} className="flex items-center">
                    <span className="mx-2">/</span>
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-citrus-charcoal">{item.label}</span>
                    ) : (
                      <Link to={item.href} className="hover:text-citrus-orange">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
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
