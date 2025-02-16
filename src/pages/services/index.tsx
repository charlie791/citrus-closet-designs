
import PageLayout from "@/components/PageLayout";

const Services = () => {
  return (
    <PageLayout
      title="Our Services"
      breadcrumbs={[{ label: "Services", href: "/services" }]}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Custom Closets</h2>
          <p className="text-citrus-charcoal/70 mb-4">
            Transform your closet space with our custom organization solutions.
          </p>
          <a href="/services/custom-closets" className="text-citrus-orange hover:text-citrus-coral">
            Learn More →
          </a>
        </div>
        {/* Add more service cards here */}
      </div>
    </PageLayout>
  );
};

export default Services;
