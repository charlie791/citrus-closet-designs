
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { TestimonialDialog } from "@/components/testimonials/TestimonialDialog";
import { generateTestimonials, baseTestimonials } from "@/utils/testimonialData";
import { Testimonial } from "@/types/testimonial";

const testimonials = generateTestimonials();

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  return (
    <PageLayout
      title="Client Testimonials"
      breadcrumbs={[
        { label: "About", href: "/about" },
        { label: "Testimonials", href: "/about/testimonials" }
      ]}
    >
      {/* Hero Stats Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-citrus-peach/10 py-12 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-citrus-charcoal mb-6">
              500+ Happy Clients
            </h1>
            <p className="text-xl md:text-2xl text-citrus-charcoal/70 mb-12">
              Hear what our satisfied customers in Tampa and Orlando have to say about their Citrus Closets experience
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Happy Clients", value: "500+" },
                { label: "5-Star Reviews", value: "100%" },
                { label: "Cities Served", value: "15+" },
                { label: "Years of Service", value: "10+" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white rounded-xl shadow-sm"
                >
                  <div className="text-3xl md:text-4xl font-bold text-citrus-orange mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-citrus-charcoal/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Testimonials Carousel */}
      <div className="mb-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Reviews</h2>
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {baseTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-md h-full"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <div className="flex items-center text-sm text-citrus-charcoal/70">
                          <MapPin className="w-4 h-4 mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {Array(5).fill(null).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-citrus-orange text-citrus-orange" />
                      ))}
                    </div>
                    <p className="text-citrus-charcoal/80 italic">"{testimonial.quote}"</p>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Floating Testimonials Cloud */}
      <div className="relative h-[800px] mb-24 overflow-hidden bg-gradient-to-b from-citrus-peach/5 to-white">
        <div className="absolute inset-0">
          {testimonials.slice(0, 50).map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
              setSelected={setSelectedTestimonial}
            />
          ))}
        </div>

        <TestimonialDialog 
          testimonial={selectedTestimonial} 
          onClose={() => setSelectedTestimonial(null)} 
        />
      </div>

      {/* Location-based Grid */}
      <div className="container mx-auto px-4 mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Reviews by Location</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Orlando Reviews */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-citrus-orange" />
              Orlando Area
            </h3>
            <div className="space-y-4">
              {testimonials
                .filter(t => t.location.includes("Orlando"))
                .slice(0, 5)
                .map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex gap-1 mb-2">
                      {Array(5).fill(null).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-citrus-orange text-citrus-orange" />
                      ))}
                    </div>
                    <p className="text-sm text-citrus-charcoal/80 mb-2">{testimonial.quote}</p>
                    <div className="text-xs text-citrus-charcoal/60">
                      {testimonial.location} • {testimonial.project}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Tampa Reviews */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-citrus-orange" />
              Tampa Area
            </h3>
            <div className="space-y-4">
              {testimonials
                .filter(t => t.location.includes("Tampa"))
                .slice(0, 5)
                .map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex gap-1 mb-2">
                      {Array(5).fill(null).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-citrus-orange text-citrus-orange" />
                      ))}
                    </div>
                    <p className="text-sm text-citrus-charcoal/80 mb-2">{testimonial.quote}</p>
                    <div className="text-xs text-citrus-charcoal/60">
                      {testimonial.location} • {testimonial.project}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Testimonials;
