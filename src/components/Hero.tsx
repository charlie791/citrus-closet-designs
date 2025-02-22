
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-white/80 z-10" />
        <img
          src="/lovable-uploads/d43e797e-cf6f-49a7-a441-6d661fefbe40.png"
          alt="Custom Closet Organization"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 text-center">
        {/* Fresh • Clean • Organized Tag */}
        <div className="inline-block animate-fade-in opacity-0 [animation-delay:0.3s] bg-citrus-orange/10 text-citrus-orange px-8 py-2 rounded-full text-lg font-medium mb-6">
          Fresh • Clean • Organized
        </div>

        {/* Main Heading */}
        <h1 className="animate-fade-in opacity-0 [animation-delay:0.5s] text-4xl md:text-6xl font-bold text-citrus-charcoal mb-6 max-w-5xl mx-auto">
          Central Florida's Premier{" "}
          <span className="text-citrus-orange">
            Custom<br />Closets
          </span>
        </h1>

        {/* Subheading */}
        <p className="animate-fade-in opacity-0 [animation-delay:0.7s] text-xl md:text-2xl text-citrus-charcoal/80 mb-12 max-w-4xl mx-auto leading-relaxed">
          Experience the difference of a fresh, clean, and perfectly organized space with our expertly crafted custom closet solutions.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in opacity-0 [animation-delay:0.9s] space-x-6">
          <Button 
            asChild
            size="lg" 
            className="bg-citrus-orange hover:bg-citrus-coral transition-colors text-lg px-8 py-6 rounded-full"
          >
            <Link to="/contact/consultation">
              <Calendar className="mr-2 h-6 w-6" />
              Schedule Free Consultation
            </Link>
          </Button>

          <Button 
            asChild
            variant="outline" 
            size="lg" 
            className="border-2 border-citrus-charcoal/20 text-citrus-charcoal hover:bg-citrus-charcoal/5 text-lg px-8 py-6 rounded-full"
          >
            <Link to="/gallery">
              View Our Work
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
