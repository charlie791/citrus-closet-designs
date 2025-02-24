
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout
      title="Page Not Found"
      description="We couldn't find the page you were looking for."
    >
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold text-citrus-charcoal mb-4">404</h2>
        <p className="text-xl text-citrus-charcoal/70 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-citrus-orange hover:bg-citrus-coral rounded-md transition-colors duration-200"
        >
          Return to Home
        </Link>
      </div>
    </PageLayout>
  );
};

export default NotFound;
