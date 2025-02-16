
import PageLayout from "@/components/PageLayout";

const CustomClosets = () => {
  return (
    <PageLayout
      title="Custom Closets"
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Custom Closets", href: "/services/custom-closets" }
      ]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Discover our premium custom closet solutions designed to maximize your space and streamline your organization.
        </p>
        {/* Add more content here */}
      </div>
    </PageLayout>
  );
};

export default CustomClosets;
