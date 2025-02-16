
import PageLayout from "@/components/PageLayout";

const Blog = () => {
  return (
    <PageLayout
      title="Blog & Resources"
      breadcrumbs={[{ label: "Blog", href: "/blog" }]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Explore our articles and resources for organization tips and inspiration.
        </p>
      </div>
    </PageLayout>
  );
};

export default Blog;
