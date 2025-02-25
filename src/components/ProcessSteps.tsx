import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";

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

const ProcessSteps = ({ onScheduleConsultation }: { onScheduleConsultation: () => void }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "-40% 0px -40% 0px" });

  // Handle video time updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      
      // Hide overlay at end time
      if (currentTime >= 19.10) {
        setShowOverlay(false);
        return;
      }

      setShowOverlay(true);
      
      // Find the appropriate step based on current time
      const currentStepIndex = steps.findIndex((step, index) => {
        const nextStepTime = steps[index + 1]?.time ?? 19.10;
        return currentTime >= step.time && currentTime < nextStepTime;
      });

      if (currentStepIndex !== -1) {
        setActiveStep(currentStepIndex);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  // Handle video playback based on visibility
  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(error => {
          console.log("Video autoplay failed:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  // Calculate video progress
  const getProgress = () => {
    if (!videoRef.current) return 0;
    const currentTime = videoRef.current.currentTime;
    return Math.min((currentTime / 19.10) * 100, 100);
  };

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

              {/* Video Section with Step Overlays */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mt-8 rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-100"
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                  loop
                  preload="auto"
                >
                  <source src="https://igscountertops.b-cdn.net/Citrus%20Closets/Process.mp4" type="video/mp4" />
                </video>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Step Information Overlay */}
                {showOverlay && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-6 text-white"
                  >
                    <motion.h3 
                      key={steps[activeStep].title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl font-semibold mb-2"
                    >
                      {steps[activeStep].title}
                    </motion.h3>
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-citrus-orange"
                        style={{ width: `${getProgress()}%` }}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Right Column - Timeline */}
            <div ref={containerRef} className="relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-citrus-orange/10" />
              
              <div className="space-y-16">
                {steps.map((step, index) => (
                  <motion.div 
                    key={step.title}
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
