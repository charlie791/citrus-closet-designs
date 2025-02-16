
import PageLayout from "@/components/PageLayout";

const HomeOffice = () => {
  return (
    <PageLayout
      title="Home Office Solutions"
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Home Office", href: "/services/home-office" }
      ]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Create a productive and organized home office space with our custom storage and desk solutions.
        </p>
      </div>
    </PageLayout>
  );
};

export default HomeOffice;
