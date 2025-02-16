
import PageLayout from "@/components/PageLayout";

const About = () => {
  return (
    <PageLayout
      title="About Us"
      breadcrumbs={[{ label: "About", href: "/about" }]}
    >
      <div className="max-w-4xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Learn more about Citrus Closets and our commitment to creating beautiful, organized spaces.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <a
            href="/about/story"
            className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">Our Story</h2>
            <p className="text-citrus-charcoal/70">Discover how we started and our journey to excellence.</p>
          </a>
          {/* Add more section links */}
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
