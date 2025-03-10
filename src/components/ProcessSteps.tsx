
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { Loader2 } from "lucide-react";

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

interface ProcessStepsProps {
  onScheduleConsultation: () => void;
}

const ProcessSteps = ({ onScheduleConsultation }: ProcessStepsProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      
      if (currentTime >= 19.10) {
        setShowOverlay(false);
        return;
      }

      setShowOverlay(true);
      
      const currentStepIndex = steps.findIndex((step, index) => {
        const nextStepTime = steps[index + 1]?.time ?? 19.10;
        return currentTime >= step.time && currentTime < nextStepTime;
      });

      if (currentStepIndex !== -1) {
        setActiveStep(currentStepIndex);
      }
    };

    const handleLoadedData = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      console.error("Video loading error");
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(error => {
          console.log("Video autoplay failed:", error);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play().catch(error => {
        console.log("Video play failed:", error);
      });
    } else {
      videoRef.current.pause();
    }
  };

  const getProgress = () => {
    if (!videoRef.current) return 0;
    const currentTime = videoRef.current.currentTime;
    return Math.min((currentTime / 19.10) * 100, 100);
  };

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

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mt-8 rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-100"
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <Loader2 className="w-8 h-8 animate-spin text-citrus-orange" />
                  </div>
                )}

                {hasError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p className="text-red-500">Failed to load video. Please try again later.</p>
                  </div>
                )}

                <div 
                  className="relative cursor-pointer" 
                  onClick={handleVideoClick}
                  role="button"
                  tabIndex={0}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                    loop
                    preload="auto"
                    poster="/closet-images/Classic walk-in closet with a chair_1920x1072.webp"
                  >
                    <source src="https://igscountertops.b-cdn.net/Citrus%20Closets/Process.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
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
                </div>
              </motion.div>

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
