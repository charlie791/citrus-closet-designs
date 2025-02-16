
import { Calendar } from "lucide-react";
import { Button } from "./ui/button";

const PromoOffer = () => {
  return (
    <section className="py-16 bg-citrus-orange">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center">
          <span className="inline-block bg-citrus-orange/10 text-citrus-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Limited Time Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-4">
            Save 20% on Custom Closets
          </h2>
          <p className="text-citrus-charcoal/70 max-w-2xl mx-auto mb-8">
            Book your free consultation by the end of the month and receive 20% off your custom closet project. Plus, enjoy special financing options!
          </p>
          <Button size="lg" className="bg-citrus-orange hover:bg-citrus-coral">
            <Calendar className="mr-2 h-5 w-5" />
            Schedule Your Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PromoOffer;
