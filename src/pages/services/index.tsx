
import PageLayout from "@/components/PageLayout";
import ServicesGrid from "@/components/ServicesGrid";

const Services = () => {
  return (
    <PageLayout
      title="Our Services"
      breadcrumbs={[{ label: "Services", href: "/services" }]}
    >
      {/* Main Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Custom Closets</h2>
          <p className="text-citrus-charcoal/70 mb-4">
            Transform your closet space with our custom organization solutions.
            Whether it's a walk-in or reach-in closet, we create beautiful,
            functional spaces.
          </p>
          <a href="/services/custom-closets" className="text-citrus-orange hover:text-citrus-coral">
            Learn More →
          </a>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Garage Storage</h2>
          <p className="text-citrus-charcoal/70 mb-4">
            Maximize your garage space with custom storage solutions that keep
            everything organized and easily accessible.
          </p>
          <a href="/services/garage-storage" className="text-citrus-orange hover:text-citrus-coral">
            Learn More →
          </a>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Home Office</h2>
          <p className="text-citrus-charcoal/70 mb-4">
            Create a productive workspace with custom-designed home office
            solutions that blend functionality with style.
          </p>
          <a href="/services/home-office" className="text-citrus-orange hover:text-citrus-coral">
            Learn More →
          </a>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Pantry & Laundry</h2>
          <p className="text-citrus-charcoal/70 mb-4">
            Organize your pantry and laundry rooms with custom storage
            solutions that make everyday tasks more efficient.
          </p>
          <a href="/services/pantry-and-laundry" className="text-citrus-orange hover:text-citrus-coral">
            Learn More →
          </a>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Entertainment Centers</h2>
          <p className="text-citrus-charcoal/70 mb-4">
            Custom entertainment centers and media storage solutions that
            combine style with functionality.
          </p>
          <a href="/services/other-solutions" className="text-citrus-orange hover:text-citrus-coral">
            Learn More →
          </a>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Wine & Storage</h2>
          <p className="text-citrus-charcoal/70 mb-4">
            Specialized storage solutions for wine collections and other
            specialty items requiring careful organization.
          </p>
          <a href="/services/other-solutions" className="text-citrus-orange hover:text-citrus-coral">
            Learn More →
          </a>
        </div>
      </div>
    </PageLayout>
  );
};

export default Services;
