
import PageLayout from "@/components/PageLayout";

const Gallery = () => {
  return (
    <PageLayout
      title="Project Gallery"
      breadcrumbs={[{ label: "Gallery", href: "/gallery" }]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Browse our collection of completed projects and get inspired.
        </p>
      </div>
    </PageLayout>
  );
};

export default Gallery;
