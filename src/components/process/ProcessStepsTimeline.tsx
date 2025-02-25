
import { motion } from "framer-motion";
import { Step } from "./types";

interface ProcessStepsTimelineProps {
  steps: Step[];
  activeStep: number;
}

const ProcessStepsTimeline = ({ steps, activeStep }: ProcessStepsTimelineProps) => {
  return (
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
  );
};

export default ProcessStepsTimeline;
