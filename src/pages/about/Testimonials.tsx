
import PageLayout from "@/components/PageLayout";

const Testimonials = () => {
  return (
    <PageLayout
      title="Client Testimonials"
      breadcrumbs={[
        { label: "About", href: "/about" },
        { label: "Testimonials", href: "/about/testimonials" }
      ]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Read what our satisfied clients have to say about their Citrus Closets experience.
        </p>
      </div>
    </PageLayout>
  );
};

export default Testimonials;
