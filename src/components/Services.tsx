
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Custom Closets",
    description: "Tailored storage solutions that maximize space and style",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Walk-in Closets",
    description: "Luxury walk-in closets designed for your lifestyle",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Pantry Storage",
    description: "Organized kitchen storage that makes life easier",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Garage Systems",
    description: "Transform your garage into an organized space",
    image: "https://images.unsplash.com/photo-1562849047-e25d2d9dd8b4?q=80&w=800&auto=format&fit=crop"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-citrus-peach/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-citrus-orange/10 text-citrus-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-4">
            Solutions for Every Space
          </h2>
          <p className="text-citrus-charcoal/70 max-w-2xl mx-auto">
            Discover our range of custom storage solutions designed to bring organization and beauty to your home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-citrus-charcoal mb-2">
                  {service.title}
                </h3>
                <p className="text-citrus-charcoal/70 mb-4">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-citrus-orange hover:text-citrus-coral transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
