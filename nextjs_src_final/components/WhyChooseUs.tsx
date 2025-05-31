
import { Award, Gem, PiggyBank, Shield } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Expert Design",
    description: "Our certified designers bring years of expertise to every project"
  },
  {
    icon: Award,
    title: "Quality Materials",
    description: "Premium materials and hardware for lasting durability"
  },
  {
    icon: PiggyBank,
    title: "Budget-Friendly",
    description: "Flexible payment options and competitive pricing"
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description: "Peace of mind with our comprehensive warranty coverage"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-citrus-orange/10 text-citrus-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-4">
            The Citrus Difference
          </h2>
          <p className="text-citrus-charcoal/70 max-w-2xl mx-auto">
            Experience the perfect blend of design expertise, quality craftsmanship, and exceptional value.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="mb-4 inline-block p-3 bg-citrus-orange/10 rounded-xl text-citrus-orange">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-citrus-charcoal mb-2">
                {feature.title}
              </h3>
              <p className="text-citrus-charcoal/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
