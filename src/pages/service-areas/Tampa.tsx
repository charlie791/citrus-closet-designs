
import PageLayout from "@/components/PageLayout";

const Tampa = () => {
  return (
    <PageLayout
      title="Tampa Service Area"
      breadcrumbs={[
        { label: "Service Areas", href: "/service-areas" },
        { label: "Tampa", href: "/service-areas/tampa" }
      ]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Serving the greater Tampa area with premium storage solutions.
        </p>
      </div>
    </PageLayout>
  );
};

export default Tampa;
