
import PageLayout from "@/components/PageLayout";

const ServiceAreas = () => {
  return (
    <PageLayout
      title="Service Areas"
      breadcrumbs={[{ label: "Service Areas", href: "/service-areas" }]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Find out if we serve your area in Florida.
        </p>
      </div>
    </PageLayout>
  );
};

export default ServiceAreas;
