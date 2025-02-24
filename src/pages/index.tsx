
import { useState } from "react";
import Head from 'next/head';
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
import { TooltipProvider } from "@/components/ui/tooltip";

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const Index = () => {
  const [showConsultation, setShowConsultation] = useState(false);

  const handleScheduleConsultation = () => {
    setShowConsultation(true);
  };

  return (
    <>
      <Head>
        <title>Citrus Closets Orlando | Custom Storage Solutions</title>
        <meta 
          name="description" 
          content="Transform your space with custom closets and storage solutions in Orlando. Professional design and installation by Citrus Closets." 
        />
        <meta property="og:title" content="Citrus Closets Orlando | Custom Storage Solutions" />
        <meta 
          property="og:description" 
          content="Transform your space with custom closets and storage solutions in Orlando. Professional design and installation by Citrus Closets." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://citrusclosets.com" />
      </Head>
      <TooltipProvider>
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
      </TooltipProvider>
    </>
  );
};

export default Index;
