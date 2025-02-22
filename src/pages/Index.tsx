
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

const Index = () => {
  return (
    <main>
      <Navigation />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Gallery />
      <ProcessSteps />
      <Testimonials />
      <PromoOffer />
      <BlogTeaser />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
