
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Calendar, LayoutGrid, Grid3X3, WandSparkles } from "lucide-react";
import Gallery from "@/components/Gallery";
import OneOnOneCollaboration from "@/components/OneOnOneCollaboration";
import FinalCTA from "@/components/FinalCTA";

const WallUnits = () => {
  const handleScheduleConsultation = () => {
    console.log("Schedule consultation clicked");
  };

  return (
    <PageLayout
      title="Wall Unit Solutions"
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Wall Units", href: "/services/wall-units" }
      ]}
    >
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center mb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
          <img 
            src="/closet-images/Built-in closet on wall single room integrated closet_1920x1072.webp"
            alt="Custom wall unit"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Custom Wall Units
            <br />
            <span className="text-citrus-orange">
              Built For You
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Transform your walls into beautiful, functional storage spaces
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
              <LayoutGrid className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Space Optimization</h3>
            <p className="text-citrus-charcoal/70">
              Maximize your wall space with custom-designed storage solutions.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-citrus-orange/10 text-citrus-orange mb-6">
              <Grid3X3 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Modular Design</h3>
            <p className="text-citrus-charcoal/70">
              Flexible storage solutions that adapt to your changing needs.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-citrus-orange/10 text-citrus-orange mb-6">
              <WandSparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Custom Features</h3>
            <p className="text-citrus-charcoal/70">
              Built-in features designed specifically for your storage needs.
            </p>
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

export default WallUnits;
