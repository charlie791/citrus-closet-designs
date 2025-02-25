
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Step } from "./types";

interface ProcessVideoProps {
  steps: Step[];
  activeStep: number;
  setActiveStep: (step: number) => void;
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
}

const ProcessVideo = ({ 
  steps, 
  activeStep, 
  setActiveStep, 
  showOverlay, 
  setShowOverlay 
}: ProcessVideoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
  }, [setActiveStep, setShowOverlay, steps]);

  // New useEffect for handling autoplay based on intersection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(error => {
        console.log("Video autoplay failed:", error);
        setIsPlaying(false);
      });
    } else {
      video.pause();
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
    <motion.div
      ref={containerRef}
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
  );
};

export default ProcessVideo;

