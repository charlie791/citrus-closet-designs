
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video/Image Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1597858520171-563a8e8b9925?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Walk-in Closet"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 text-center">
        <span className="inline-block animate-fade-in opacity-0 [animation-delay:0.3s] bg-citrus-orange/10 text-citrus-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          Transform Your Space
        </span>
        <h1 className="animate-fade-in opacity-0 [animation-delay:0.5s] text-4xl md:text-6xl font-bold text-citrus-charcoal mb-6 max-w-4xl mx-auto">
          Luxury Custom Closets 
          <span className="text-citrus-orange">
            {" "}Designed For Your Life
          </span>
        </h1>
        <p className="animate-fade-in opacity-0 [animation-delay:0.7s] text-lg md:text-xl text-citrus-charcoal/80 mb-8 max-w-2xl mx-auto">
          Experience the perfect blend of style and functionality with our premium custom storage solutions.
        </p>
        <div className="animate-fade-in opacity-0 [animation-delay:0.9s] space-x-4">
          <Button size="lg" className="bg-citrus-orange hover:bg-citrus-coral transition-colors">
            <Calendar className="mr-2 h-5 w-5" />
            Schedule Free Consultation
          </Button>
          <Button variant="outline" size="lg" className="border-citrus-charcoal/20 text-citrus-charcoal hover:bg-citrus-charcoal/5">
            View Our Work
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
