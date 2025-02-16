
import PageLayout from "@/components/PageLayout";

const Process = () => {
  return (
    <PageLayout
      title="Our Process"
      breadcrumbs={[{ label: "Process", href: "/process" }]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Learn about our streamlined process for creating your perfect storage solution.
        </p>
      </div>
    </PageLayout>
  );
};

export default Process;
