
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Calendar, WashingMachine, Box, Grid3X3, WandSparkles, Basket } from "lucide-react";
import Gallery from "@/components/Gallery";
import OneOnOneCollaboration from "@/components/OneOnOneCollaboration";
import FinalCTA from "@/components/FinalCTA";

const PantryLaundry = () => {
  const handleScheduleConsultation = () => {
    // This will be handled by the parent component
    console.log("Schedule consultation clicked");
  };

  return (
    <PageLayout
      title="Pantry & Laundry Solutions"
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Pantry & Laundry", href: "/services/pantry-and-laundry" }
      ]}
    >
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center mb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
          <img 
            src="/closet-images/Front view small custom closet realistic_1920x1072.webp"
            alt="Modern pantry and laundry organization"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your
            <br />
            <span className="text-citrus-orange">
              Pantry & Laundry Space
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Custom organization solutions for efficient, beautiful storage and laundry spaces
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
              <Box className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Storage</h3>
            <p className="text-citrus-charcoal/70">
              Maximize your space with intelligent storage solutions and organization systems.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-citrus-orange/10 text-citrus-orange mb-6">
              <WashingMachine className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Laundry Efficiency</h3>
            <p className="text-citrus-charcoal/70">
              Custom laundry room designs that make washing, drying, and folding a breeze.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-citrus-orange/10 text-citrus-orange mb-6">
              <WandSparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Premium Materials</h3>
            <p className="text-citrus-charcoal/70">
              High-quality materials and expert craftsmanship for lasting organization.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#f5f5f5] py-24 mb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-6">
              Transform Your Space
            </h2>
            <p className="text-xl text-citrus-charcoal/70">
              Our custom pantry and laundry solutions help you create efficient,
              organized spaces that make daily tasks easier.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Custom pantry shelving systems",
              "Pull-out organization solutions",
              "Efficient laundry sorting stations",
              "Integrated appliance spaces",
              "Specialized cleaning supply storage",
              "Ergonomic folding areas"
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

export default PantryLaundry;

