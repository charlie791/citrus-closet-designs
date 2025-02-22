
import { Calendar } from "lucide-react";
import { Button } from "./ui/button";

interface FinalCTAProps {
  onScheduleConsultation: () => void;
}

const FinalCTA = ({ onScheduleConsultation }: FinalCTAProps) => {
  return (
    <section className="py-24 bg-gradient-to-b from-citrus-peach/20 to-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-6">
          Ready to Transform Your Space?
        </h2>
        <p className="text-citrus-charcoal/70 max-w-2xl mx-auto mb-8">
          Take the first step towards a beautifully organized home. Schedule your free consultation today.
        </p>
        <Button 
          size="lg" 
          className="bg-citrus-orange hover:bg-citrus-coral"
          onClick={onScheduleConsultation}
        >
          <Calendar className="mr-2 h-5 w-5" />
          Schedule Free Consultation
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
