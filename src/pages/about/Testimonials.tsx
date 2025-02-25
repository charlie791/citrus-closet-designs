
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { TestimonialDialog } from "@/components/testimonials/TestimonialDialog";
import { TestimonialForm } from "@/components/testimonials/TestimonialForm";
import { generateTestimonials } from "@/utils/testimonialData";
import { Testimonial } from "@/types/testimonial";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const testimonials = generateTestimonials();

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <PageLayout
      title="Client Testimonials"
      breadcrumbs={[
        { label: "About", href: "/about" },
        { label: "Testimonials", href: "/about/testimonials" }
      ]}
    >
      {/* Playful Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white via-citrus-peach/10 to-white min-h-[90vh]">
        {/* Background Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 text-citrus-orange opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Star className="w-full h-full" />
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pt-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-citrus-charcoal">
              Oops! We're Drowning in 5-Star Reviews! 🌟
            </h1>
            <p className="text-xl md:text-2xl text-citrus-charcoal/70">
              Our cloud of happiness keeps growing...
              <br />
              <span className="font-semibold">(500+ reviews and counting)</span>
            </p>
            <p className="text-lg text-citrus-charcoal/80 italic">
              "Our developers tried to display all our amazing reviews, but there are just too many! 
              Want to make our job even harder?"
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button 
                size="lg"
                className="bg-citrus-orange hover:bg-citrus-orange/90 text-white px-8 py-6 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setShowForm(true)}
              >
                Add Your Review to the Cloud! ⭐
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Floating Cloud */}
        <div className="relative h-[80vh] mt-12">
          <div className="absolute inset-0">
            {testimonials.slice(0, 75).map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index}
                setSelected={setSelectedTestimonial}
              />
            ))}
          </div>

          {/* New Review Spotlight Position */}
          <motion.div
            className="absolute top-10 left-1/2 -translate-x-1/2 z-50"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <div className="w-72 h-24 rounded-xl bg-gradient-to-r from-citrus-orange/20 via-citrus-coral/20 to-citrus-peach/20 backdrop-blur-sm flex items-center justify-center border-2 border-dashed border-citrus-orange/30">
              <p className="text-citrus-charcoal/50 font-medium text-lg">
                Your Review Could Be Here! ✨
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <TestimonialDialog 
        testimonial={selectedTestimonial} 
        onClose={() => setSelectedTestimonial(null)} 
      />

      <TestimonialForm 
        open={showForm}
        onClose={() => setShowForm(false)}
      />
    </PageLayout>
  );
};

export default Testimonials;
