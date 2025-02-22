
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import ProcessSteps from "@/components/ProcessSteps";
import Testimonials from "@/components/Testimonials";
import PromoOffer from "@/components/PromoOffer";
import BlogTeaser from "@/components/BlogTeaser";
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
      <Services />
      <WhyChooseUs />
      <Gallery />
      <ProcessSteps />
      <Testimonials />
      <PromoOffer onScheduleConsultation={handleScheduleConsultation} />
      <BlogTeaser />
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
