
import { Star } from "lucide-react";
import { motion } from "framer-motion";

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
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content & Featured Testimonial */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-block bg-citrus-orange/10 text-citrus-orange px-4 py-1.5 rounded-full text-sm font-medium">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal">
                What Our Clients Say
              </h2>
              <p className="text-citrus-charcoal/70 max-w-xl">
                Read about experiences from our satisfied customers who have transformed their spaces with our custom storage solutions.
              </p>
            </motion.div>

            {/* Featured Testimonial */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-citrus-orange/5 rounded-full -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-citrus-peach/10 rounded-full -z-10" />
              
              {/* Quote Mark */}
              <div className="absolute top-6 right-8 text-8xl font-serif text-citrus-orange/10 select-none">
                "
              </div>

              <div className="flex items-center gap-6 mb-8">
                <motion.img
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={testimonials[0].image}
                  alt={testimonials[0].name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-citrus-orange/10"
                />
                <div>
                  <h3 className="text-xl font-semibold text-citrus-charcoal">
                    {testimonials[0].name}
                  </h3>
                  <p className="text-citrus-charcoal/70">
                    {testimonials[0].role}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(testimonials[0].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 fill-citrus-orange text-citrus-orange" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-citrus-charcoal/80 text-xl md:text-2xl font-light italic leading-relaxed">
                "{testimonials[0].quote}"
              </p>
            </motion.div>
          </div>

          {/* Right Column - Stacked Testimonials */}
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            {testimonials.slice(1).map((testimonial, index) => (
              <motion.div 
                key={testimonial.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-citrus-charcoal">
                      {testimonial.name}
                    </h3>
                    <p className="text-citrus-charcoal/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-citrus-orange text-citrus-orange"
                    />
                  ))}
                </div>
                <p className="text-citrus-charcoal/80 text-lg italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
