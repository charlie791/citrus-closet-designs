
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import OneOnOneCollaboration from "@/components/OneOnOneCollaboration";
import ProcessSteps from "@/components/ProcessSteps";
import Testimonials from "@/components/Testimonials";
import PromoOffer from "@/components/PromoOffer";
import Gallery from "@/components/Gallery";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { ConsultationDialog } from "@/components/consultation/ConsultationDialog";

const Index = () => {
  const [showConsultation, setShowConsultation] = useState(false);

  const handleScheduleConsultation = () => {
    setShowConsultation(true);
  };

  return (
    <main>
      <Navigation />
      <Hero />
      <ServicesGrid />
      <OneOnOneCollaboration onScheduleConsultation={handleScheduleConsultation} />
      <ProcessSteps onScheduleConsultation={handleScheduleConsultation} />
      <PromoOffer onScheduleConsultation={handleScheduleConsultation} />
      <Testimonials />
      <Gallery />
      <FinalCTA onScheduleConsultation={handleScheduleConsultation} />
      <Footer />

      <ConsultationDialog 
        open={showConsultation}
        onOpenChange={setShowConsultation}
      />
    </main>
  );
};

export default Index;
