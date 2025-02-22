
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
import { useState } from "react";
import { ConsultationDialog } from "@/components/consultation/ConsultationDialog";

const Index = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <main>
      <Navigation />
      <Hero onScheduleConsultation={() => setIsConsultationOpen(true)} />
      <Services />
      <WhyChooseUs />
      <Gallery />
      <ProcessSteps />
      <Testimonials />
      <PromoOffer onScheduleConsultation={() => setIsConsultationOpen(true)} />
      <BlogTeaser />
      <FinalCTA onScheduleConsultation={() => setIsConsultationOpen(true)} />
      <Footer />
      <ConsultationDialog
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
};

export default Index;
