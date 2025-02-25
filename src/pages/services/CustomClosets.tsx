
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Ruler, Shirt, Boxes, Grid3X3, WandSparkles } from "lucide-react";
import Gallery from "@/components/Gallery";
import OneOnOneCollaboration from "@/components/OneOnOneCollaboration";
import FinalCTA from "@/components/FinalCTA";

const CustomClosets = () => {
  const handleScheduleConsultation = () => {
    // This will be handled by the parent component
    console.log("Schedule consultation clicked");
  };

  return (
    <PageLayout
      title="Custom Closet Solutions"
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Custom Closets", href: "/services/custom-closets" }
      ]}
    >
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center mb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
          <img 
            src="/closet-images/Classic walk-in closet with a chair_1920x1072.webp"
            alt="Luxury custom closet design"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Closet Into a
            <br />
            <span className="text-citrus-orange">
              Luxury Space
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Custom closet solutions designed to maximize space and enhance your daily routine
          </p>
          <Button 
            size="lg" 
            onClick={handleScheduleConsultation}
            className="bg-citrus-orange hover:bg-citrus-coral"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Schedule Free Consultation
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-citrus-orange/10 text-citrus-orange mb-6">
              <Ruler className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Custom Design</h3>
            <p className="text-citrus-charcoal/70">
              Tailored storage solutions designed specifically for your space and lifestyle needs.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-citrus-orange/10 text-citrus-orange mb-6">
              <Grid3X3 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Perfect Organization</h3>
            <p className="text-citrus-charcoal/70">
              Innovative organization systems that make the most of every inch of space.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-citrus-orange/10 text-citrus-orange mb-6">
              <WandSparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Premium Materials</h3>
            <p className="text-citrus-charcoal/70">
              High-quality materials and expert craftsmanship ensure lasting beauty and durability.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#f5f5f5] py-24 mb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-6">
              Transform Your Closet
            </h2>
            <p className="text-xl text-citrus-charcoal/70">
              Our custom closet solutions help you create an organized, 
              functional space that elevates your daily routine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Custom drawer configurations and organizers",
              "LED lighting solutions for visibility",
              "Boutique-style hanging spaces",
              "Dedicated shoe and accessory storage",
              "Pull-out racks and valet rods",
              "Built-in hampers and laundry solutions"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 bg-citrus-orange/10 rounded-lg shrink-0">
                  <svg 
                    className="w-5 h-5 text-citrus-orange" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                <p className="text-citrus-charcoal/80">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery />

      {/* Consultation Section */}
      <OneOnOneCollaboration onScheduleConsultation={handleScheduleConsultation} />

      {/* Final CTA */}
      <FinalCTA onScheduleConsultation={handleScheduleConsultation} />
    </PageLayout>
  );
};

export default CustomClosets;
