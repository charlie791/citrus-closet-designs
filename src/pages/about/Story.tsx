
import PageLayout from "@/components/PageLayout";

const Story = () => {
  return (
    <PageLayout
      title="Our Story"
      breadcrumbs={[
        { label: "About", href: "/about" },
        { label: "Our Story", href: "/about/story" }
      ]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Learn about how Citrus Closets began and our journey to becoming Florida's premier storage solution provider.
        </p>
      </div>
    </PageLayout>
  );
};

export default Story;
