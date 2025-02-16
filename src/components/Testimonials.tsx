
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    quote: "The transformation of my closet exceeded all expectations. The team was professional and the result is stunning!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Property Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    quote: "Outstanding quality and attention to detail. The 3D design process made it easy to visualize the end result.",
    rating: 5
  },
  {
    name: "Emily Roberts",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    quote: "As an interior designer, I appreciate their commitment to quality and design excellence. Highly recommended!",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-citrus-peach/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-citrus-orange/10 text-citrus-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-4">
            What Our Clients Say
          </h2>
          <p className="text-citrus-charcoal/70 max-w-2xl mx-auto">
            Read about experiences from our satisfied customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-citrus-charcoal">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-citrus-charcoal/70">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-citrus-orange text-citrus-orange"
                  />
                ))}
              </div>
              <p className="text-citrus-charcoal/80 italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
