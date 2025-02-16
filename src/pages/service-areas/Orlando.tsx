
import PageLayout from "@/components/PageLayout";

const Orlando = () => {
  return (
    <PageLayout
      title="Orlando Service Area"
      breadcrumbs={[
        { label: "Service Areas", href: "/service-areas" },
        { label: "Orlando", href: "/service-areas/orlando" }
      ]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Serving the greater Orlando area with premium storage solutions.
        </p>
      </div>
    </PageLayout>
  );
};

export default Orlando;
