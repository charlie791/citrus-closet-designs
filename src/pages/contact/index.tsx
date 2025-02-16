
import PageLayout from "@/components/PageLayout";

const Contact = () => {
  return (
    <PageLayout
      title="Contact Us"
      breadcrumbs={[{ label: "Contact", href: "/contact" }]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Get in touch with us to discuss your storage and organization needs.
        </p>
      </div>
    </PageLayout>
  );
};

export default Contact;
