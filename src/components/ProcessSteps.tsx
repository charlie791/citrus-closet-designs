
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    title: "Discovery",
    description: "Work with a designer, virtually or in-home, who will uncover your likes and needs. Based on the measurements of your space and inventory you wish to store in it, we create a design that fits you perfectly.",
    image: "closet-images/Classic walk-in closet with a chair_1920x1072.webp"
  },
  {
    title: "Design",
    description: "With our 3D design software, Idea Books, and samples on hand, we craft plans that detail the organizational structure and flow of the space. Together we explore our vast selection of materials and finishes, and choose enhancements, accessories, and specialty items to create a closet that is truly unique.",
    image: "closet-images/Black colored custom closet_1920x1072.webp"
  },
  {
    title: "Build",
    description: "Once you have approved your design, our craftsmen go to work. We fabricate each component based on the precise specifications of your designs because \"custom\" means individual, cut-to-order construction.",
    image: "closet-images/Gray colored cabinet custom closet_1920x1072.webp"
  },
  {
    title: "Install",
    description: "Your dream closet will become a reality. On installation day, you can expect friendly, contact-free, quick and expert work, meticulous attention to detail, and thorough cleanup of the space. Installers come equipped with masks, gloves, and disinfecting wipes.",
    image: "closet-images/All white closet colorful clothes tall mirror great picture_1920x1072.webp"
  }
];

const ProcessSteps = ({ onScheduleConsultation }: { onScheduleConsultation: () => void }) => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Create separate refs for each step
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex(ref => ref === entry.target);
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-citrus-orange/5 rounded-bl-[100px] transform rotate-12" />
        <div className="absolute left-0 bottom-0 w-1/4 h-1/4 bg-citrus-peach/20 rounded-tr-[80px] transform -rotate-12" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 relative">
            {/* Left Column - Fixed Content */}
            <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <span className="text-sm font-medium tracking-wider text-citrus-charcoal/70">
                  ONLY WHEN YOU ARE READY WE WILL MOVE FORWARD
                </span>

                <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal">
                  Our Process is Easy
                </h2>

                <p className="text-citrus-charcoal/70">
                  We create a storage solution that creates harmony in your home based on your needs, aesthetic and budget.
                </p>

                <div className="pt-4">
                  <Button
                    onClick={onScheduleConsultation}
                    size="lg"
                    className="font-semibold"
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>

              {/* Current Step Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mt-8 rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] bg-gray-100"
              >
                <motion.img
                  key={activeStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">
                    {steps[activeStep].title}
                  </h3>
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-citrus-orange"
                      style={{ width: `${(activeStep + 1) * 25}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Timeline */}
            <div ref={containerRef} className="relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-citrus-orange/10" />
              
              <div className="space-y-16">
                {steps.map((step, index) => (
                  <motion.div 
                    key={step.title}
                    ref={el => stepRefs.current[index] = el}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className={`absolute left-[-13px] top-[14px] w-[10px] h-[10px] rounded-full ${
                        activeStep >= index ? 'bg-citrus-orange' : 'bg-citrus-orange/30'
                      }`} 
                    />
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-[#647585]">
                        {step.title}
                      </h3>
                      <p className="text-citrus-charcoal/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
