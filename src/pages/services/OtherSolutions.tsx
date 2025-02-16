
import PageLayout from "@/components/PageLayout";

const OtherSolutions = () => {
  return (
    <PageLayout
      title="Other Storage Solutions"
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Other Solutions", href: "/services/other-solutions" }
      ]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Discover our other custom storage solutions, including wall beds and entertainment centers.
        </p>
      </div>
    </PageLayout>
  );
};

export default OtherSolutions;
