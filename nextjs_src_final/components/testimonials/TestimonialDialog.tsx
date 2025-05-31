
import { Testimonial } from "@/types/testimonial";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TestimonialDialogProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

export const TestimonialDialog = ({ testimonial, onClose }: TestimonialDialogProps) => {
  if (!testimonial) return null;

  return (
    <Dialog open={!!testimonial} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Client Testimonial</DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <div className="flex items-center text-sm text-citrus-charcoal/70">
                <MapPin className="w-4 h-4 mr-1" />
                {testimonial.location}
              </div>
              <div className="flex gap-1 mt-2">
                {Array(5).fill(null).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-citrus-orange text-citrus-orange" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-lg text-citrus-charcoal/80 italic mb-4">
            "{testimonial.quote}"
          </p>
          <div className="flex items-center justify-between text-sm text-citrus-charcoal/60">
            <span>{testimonial.project}</span>
            <span>{testimonial.date}</span>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
