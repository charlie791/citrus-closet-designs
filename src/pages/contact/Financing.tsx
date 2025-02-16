
import PageLayout from "@/components/PageLayout";

const Financing = () => {
  return (
    <PageLayout
      title="Financing Options"
      breadcrumbs={[
        { label: "Contact", href: "/contact" },
        { label: "Financing", href: "/contact/financing" }
      ]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Explore our flexible financing options to make your storage dreams a reality.
        </p>
      </div>
    </PageLayout>
  );
};

export default Financing;
