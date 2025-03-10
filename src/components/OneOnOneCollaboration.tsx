import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const CLOSET_IMAGES = [
  "closet-images/All white closet colorful clothes tall mirror great picture_1920x1072.webp",
  "closet-images/Black colored custom closet_1920x1072.webp",
  "closet-images/Built-in closet on wall single room integrated closet_1920x1072.webp",
  "closet-images/Classic walk-in closet with a chair_1920x1072.webp",
  "closet-images/Gray colored cabinet custom closet_1920x1072.webp",
  "closet-images/Mocha brown slab front very realistic closet_1920x1072.webp"
];

interface OneOnOneCollaborationProps {
  onScheduleConsultation: () => void;
}

const OneOnOneCollaboration = ({ onScheduleConsultation }: OneOnOneCollaborationProps) => {
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden animate-fade-in [animation-delay:0.3s] opacity-0">
              <Carousel
                setApi={setApi}
                plugins={[
                  Autoplay({
                    delay: 5000,
                  }),
                ]}
                opts={{
                  loop: true,
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent>
                  {CLOSET_IMAGES.map((src, index) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full">
                        <img 
                          src={`/${src}`}
                          alt={`Designer consultation ${index + 1}`}
                          className="w-full h-[500px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {CLOSET_IMAGES.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        current === index ? "bg-white scale-125" : "bg-white/50"
                      }`}
                      onClick={() => api?.scrollTo(index)}
                    />
                  ))}
                </div>
              </Carousel>
            </div>

            <div className="space-y-6 animate-fade-in [animation-delay:0.6s] opacity-0">
              <span className="inline-block bg-citrus-orange/10 text-citrus-orange px-4 py-1.5 rounded-full text-sm font-medium">
                Design Consultation
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal">
                One-on-One Collaboration
              </h2>

              <p className="text-xl text-citrus-charcoal/90 font-medium">
                Each Project Starts with a Complimentary In-Home or Online Design Consultation
              </p>

              <p className="text-citrus-charcoal/70">
                You will work closely with one of our expert designers to create a customized, 
                one-of-a-kind design that surpasses all expectations and truly transforms the space. 
                From the initial consultation to the installation date and beyond, your designer is 
                with you every step of the way.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-citrus-orange/10 rounded-lg">
                    <svg className="w-5 h-5 text-citrus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-citrus-charcoal/80">
                    Choose between convenient in-home or online consultation options
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-citrus-orange/10 rounded-lg">
                    <svg className="w-5 h-5 text-citrus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-citrus-charcoal/80">
                    Work directly with an experienced designer from start to finish
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-citrus-orange/10 rounded-lg">
                    <svg className="w-5 h-5 text-citrus-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-citrus-charcoal/80">
                    Receive a customized design plan tailored to your specific needs
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  onClick={onScheduleConsultation}
                  size="lg"
                  className="font-semibold"
                >
                  Schedule Your Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneOnOneCollaboration;
