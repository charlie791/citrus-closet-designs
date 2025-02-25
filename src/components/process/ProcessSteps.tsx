
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import ProcessVideo from "./ProcessVideo";
import ProcessStepsTimeline from "./ProcessStepsTimeline";
import { ProcessStepsProps } from "./types";

const steps = [
  {
    title: "Discovery",
    description: "Work with a designer, virtually or in-home, who will uncover your likes and needs. Based on the measurements of your space and inventory you wish to store in it, we create a design that fits you perfectly.",
    time: 0,
  },
  {
    title: "Design",
    description: "With our 3D design software, Idea Books, and samples on hand, we craft plans that detail the organizational structure and flow of the space. Together we explore our vast selection of materials and finishes, and choose enhancements, accessories, and specialty items to create a closet that is truly unique.",
    time: 4.19,
  },
  {
    title: "Build",
    description: "Once you have approved your design, our craftsmen go to work. We fabricate each component based on the precise specifications of your designs because \"custom\" means individual, cut-to-order construction.",
    time: 9.08,
  },
  {
    title: "Install",
    description: "Your dream closet will become a reality. On installation day, you can expect friendly, contact-free, quick and expert work, meticulous attention to detail, and thorough cleanup of the space. Installers come equipped with masks, gloves, and disinfecting wipes.",
    time: 14.10,
  }
];

const ProcessSteps = ({ onScheduleConsultation }: ProcessStepsProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-40% 0px -40% 0px" });

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-citrus-orange/5 rounded-bl-[100px] transform rotate-12" />
        <div className="absolute left-0 bottom-0 w-1/4 h-1/4 bg-citrus-peach/20 rounded-tr-[80px] transform -rotate-12" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 relative">
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
              </motion.div>

              <ProcessVideo 
                steps={steps}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                showOverlay={showOverlay}
                setShowOverlay={setShowOverlay}
              />

              <div className="hidden lg:block">
                <Button
                  onClick={onScheduleConsultation}
                  size="lg"
                  className="font-semibold w-full"
                >
                  Get Started
                </Button>
              </div>
            </div>

            <div className="relative">
              <div ref={containerRef} className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-citrus-orange/10" />
                <ProcessStepsTimeline steps={steps} activeStep={activeStep} />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-16 pl-8 lg:hidden"
              >
                <Button
                  onClick={onScheduleConsultation}
                  size="lg"
                  className="font-semibold w-full sm:w-auto"
                >
                  Get Started
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
