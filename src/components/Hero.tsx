
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { ConsultationDialog } from "./consultation/ConsultationDialog";

const Hero = () => {
  const [showConsultation, setShowConsultation] = useState(false);

  return (
    <div className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-white/80 z-10" />
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="https://igscountertops.b-cdn.net/Citrus%20Closets/Citrus%20closet%20hero%20cmp.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 text-center">
        {/* Fresh • Clean • Organized Tag */}
        <div className="inline-block animate-fade-in opacity-0 [animation-delay:0.3s] bg-citrus-orange/10 text-citrus-orange px-8 py-2 rounded-full text-lg font-medium mb-6">
          Fresh • Clean • Organized
        </div>

        {/* Main Heading */}
        <div className="max-w-3xl mx-auto">
          <h1 className="animate-fade-in opacity-0 [animation-delay:0.5s] text-4xl md:text-6xl font-bold text-citrus-charcoal mb-6">
            Custom Closets &
            <br />
            Storage Solutions
            <br />
            <span className="text-citrus-orange">
              for Every Room
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <p className="animate-fade-in opacity-0 [animation-delay:0.7s] text-xl md:text-2xl text-citrus-charcoal/80 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform clutter into calm with expertly designed storage for your closets, pantry, laundry, garage, and more. Smart, stylish, and built around your lifestyle.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in opacity-0 [animation-delay:0.9s] flex justify-center">
          <Button 
            size="lg" 
            className="bg-citrus-orange hover:bg-citrus-coral transition-colors text-lg px-8 py-6 rounded-full"
            onClick={() => setShowConsultation(true)}
          >
            <Calendar className="mr-2 h-6 w-6" />
            Schedule Free Consultation
          </Button>
        </div>
      </div>

      <ConsultationDialog 
        open={showConsultation} 
        onOpenChange={setShowConsultation}
      />
    </div>
  );
};

export default Hero;
