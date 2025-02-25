
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import OneOnOneCollaboration from "@/components/OneOnOneCollaboration";
import ProcessSteps from "@/components/ProcessSteps";
import Testimonials from "@/components/Testimonials";
import PromoOffer from "@/components/PromoOffer";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { ConsultationDialog } from "@/components/consultation/ConsultationDialog";
import { TooltipProvider } from "@/components/ui/tooltip";

const GalleryPage = () => {
  const [showConsultation, setShowConsultation] = useState(false);

  const handleScheduleConsultation = () => {
    setShowConsultation(true);
  };

  return (
    <TooltipProvider>
      <main>
        <Navigation />
        <Hero onScheduleConsultation={handleScheduleConsultation} />
        <Gallery />
        <OneOnOneCollaboration onScheduleConsultation={handleScheduleConsultation} />
        <ProcessSteps onScheduleConsultation={handleScheduleConsultation} />
        <PromoOffer onScheduleConsultation={handleScheduleConsultation} />
        <Testimonials />
        <FinalCTA onScheduleConsultation={handleScheduleConsultation} />
        <Footer />

        <ConsultationDialog 
          open={showConsultation}
          onOpenChange={setShowConsultation}
        />
      </main>
    </TooltipProvider>
  );
};

export default GalleryPage;
