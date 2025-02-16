
import PageLayout from "@/components/PageLayout";

const Consultation = () => {
  return (
    <PageLayout
      title="Schedule a Consultation"
      breadcrumbs={[
        { label: "Contact", href: "/contact" },
        { label: "Consultation", href: "/contact/consultation" }
      ]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Schedule a free consultation with our design experts.
        </p>
      </div>
    </PageLayout>
  );
};

export default Consultation;
