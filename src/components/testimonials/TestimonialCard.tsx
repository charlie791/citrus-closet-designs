
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { Testimonial } from "@/types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  setSelected: (t: Testimonial | null) => void;
}

export const TestimonialCard = ({ testimonial, index, setSelected }: TestimonialCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute bg-white p-4 rounded-lg shadow-lg cursor-pointer"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        zIndex: Math.floor(Math.random() * 10),
        maxWidth: "300px",
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX,
        rotateY,
      }}
      initial={{
        opacity: 0,
        scale: 0.5,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50
      }}
      animate={{
        opacity: [0.7, 1, 0.7],
        scale: [1, 1.05, 1],
        x: Math.random() * 50 - 25,
        y: Math.random() * 50 - 25
      }}
      transition={{
        duration: 10 + Math.random() * 5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      whileHover={{
        scale: 1.1,
        zIndex: 50,
        transition: { duration: 0.2 }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setSelected(testimonial)}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1">
          {Array(5).fill(null).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-citrus-orange text-citrus-orange" />
          ))}
        </div>
        <span className="text-xs text-citrus-charcoal/60">{testimonial.date}</span>
      </div>
      <p className="text-sm text-citrus-charcoal/80 line-clamp-2">{testimonial.quote}</p>
      <div className="mt-2 flex items-center justify-between text-xs text-citrus-charcoal/60">
        <span>{testimonial.location}</span>
        <span>{testimonial.project}</span>
      </div>
    </motion.div>
  );
};
