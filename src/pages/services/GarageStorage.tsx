
import PageLayout from "@/components/PageLayout";

const GarageStorage = () => {
  return (
    <PageLayout
      title="Garage Storage Solutions"
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Garage Storage", href: "/services/garage-storage" }
      ]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Transform your garage into an organized, functional space with our custom storage solutions.
        </p>
      </div>
    </PageLayout>
  );
};

export default GarageStorage;
