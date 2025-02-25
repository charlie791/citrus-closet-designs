
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Palette, Grid3X3, WandSparkles } from "lucide-react";
import Gallery from "@/components/Gallery";
import OneOnOneCollaboration from "@/components/OneOnOneCollaboration";
import FinalCTA from "@/components/FinalCTA";

const CraftRooms = () => {
  const handleScheduleConsultation = () => {
    console.log("Schedule consultation clicked");
  };

  return (
    <PageLayout
      title="Craft Room Solutions"
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: "Craft Rooms", href: "/services/craft-rooms" }
      ]}
    >
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center mb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
          <img 
            src="/closet-images/White closet realistic clean_1920x1072.webp"
            alt="Custom craft room design"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create Your Perfect
            <br />
            <span className="text-citrus-orange">
              Craft Room
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Custom craft room solutions designed for creativity and organization
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
              <Palette className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Creative Space</h3>
            <p className="text-citrus-charcoal/70">
              Designed specifically for your creative hobbies and crafting needs.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-citrus-orange/10 text-citrus-orange mb-6">
              <Grid3X3 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Organization</h3>
            <p className="text-citrus-charcoal/70">
              Innovative storage solutions to keep all your supplies organized and accessible.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-citrus-orange/10 text-citrus-orange mb-6">
              <WandSparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Custom Features</h3>
            <p className="text-citrus-charcoal/70">
              Tailored storage solutions designed around your specific crafting needs.
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

export default CraftRooms;
