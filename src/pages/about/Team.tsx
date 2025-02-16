
import PageLayout from "@/components/PageLayout";

const Team = () => {
  return (
    <PageLayout
      title="Our Team"
      breadcrumbs={[
        { label: "About", href: "/about" },
        { label: "Team", href: "/about/team" }
      ]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Meet the dedicated professionals who make Citrus Closets exceptional.
        </p>
      </div>
    </PageLayout>
  );
};

export default Team;
