
import PageLayout from "@/components/PageLayout";

const PantryLaundry = () => {
  return (
    <PageLayout
      title="Pantry & Laundry Solutions"
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Pantry & Laundry", href: "/services/pantry-and-laundry" }
      ]}
    >
      <div className="max-w-3xl">
        <p className="text-lg text-citrus-charcoal/70 mb-6">
          Maximize your pantry and laundry spaces with custom organization solutions.
        </p>
      </div>
    </PageLayout>
  );
};

export default PantryLaundry;
