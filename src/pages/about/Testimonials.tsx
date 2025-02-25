
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { motion, useReducedMotion } from "framer-motion";
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
  const [visibleTestimonials, setVisibleTestimonials] = useState(30);
  const shouldReduceMotion = useReducedMotion();

  // Adjust visible testimonials based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setVisibleTestimonials(isMobile ? 30 : 75);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PageLayout
      title="Client Testimonials"
      breadcrumbs={[
        { label: "About", href: "/about" },
        { label: "Testimonials", href: "/about/testimonials" }
      ]}
    >
      {/* Mobile-Optimized Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white via-citrus-peach/10 to-white min-h-[80vh] md:min-h-[90vh]">
        {/* Optimized Background Particles */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          {[...Array(shouldReduceMotion ? 10 : 20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 sm:w-4 sm:h-4 text-citrus-orange opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={shouldReduceMotion ? {} : {
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

        {/* Mobile-Optimized Main Content */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-4 sm:space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-citrus-charcoal leading-tight">
              Oops! We're Drowning in 5-Star Reviews! 🌟
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-citrus-charcoal/70">
              Our cloud of happiness keeps growing...
              <br className="hidden sm:block" />
              <span className="font-semibold">(500+ reviews and counting)</span>
            </p>
            <p className="text-base sm:text-lg text-citrus-charcoal/80 italic px-2 sm:px-0">
              "Our developers tried to display all our amazing reviews, but there are just too many! 
              Want to make our job even harder?"
            </p>
            
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className="inline-block"
            >
              <Button 
                size="lg"
                className="bg-citrus-orange hover:bg-citrus-orange/90 text-white
                  px-4 sm:px-6 md:px-8 
                  py-3 sm:py-4 md:py-6 
                  text-base sm:text-lg md:text-xl
                  rounded-lg sm:rounded-xl 
                  shadow-lg hover:shadow-xl 
                  transition-all duration-300
                  active:translate-y-0.5
                  touch-manipulation"
                onClick={() => setShowForm(true)}
              >
                Add Your Review to the Cloud! ⭐
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile-Optimized Floating Cloud */}
        <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] mt-6 sm:mt-8 md:mt-12">
          <div className="absolute inset-0">
            {testimonials.slice(0, visibleTestimonials).map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                index={index}
                setSelected={setSelectedTestimonial}
              />
            ))}
          </div>

          {/* Mobile-Optimized Review Spotlight */}
          <motion.div
            className="absolute top-4 sm:top-10 left-1/2 -translate-x-1/2 z-50 w-[85%] sm:w-72"
            animate={shouldReduceMotion ? {} : {
              y: [0, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <div className="rounded-lg sm:rounded-xl 
              bg-gradient-to-r from-citrus-orange/20 via-citrus-coral/20 to-citrus-peach/20 
              backdrop-blur-sm 
              flex items-center justify-center 
              border-2 border-dashed border-citrus-orange/30
              h-20 sm:h-24"
            >
              <p className="text-base sm:text-lg text-citrus-charcoal/50 font-medium px-4">
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
