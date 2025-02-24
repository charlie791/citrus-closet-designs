
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const services = [
  {
    title: "Custom Closets",
    description: "Tailored storage solutions that maximize space and style",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Walk-in Closets",
    description: "Luxury walk-in closets designed for your lifestyle",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Pantry Storage",
    description: "Organized kitchen storage that makes life easier",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Garage Systems",
    description: "Transform your garage into an organized space",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop"
  }
];

const ServicesCarousel = () => {
  return (
    <div className="relative z-20 -mt-24 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 animate-fade-in [animation-delay:1.1s] opacity-0">
          <div className="text-center mb-6">
            <span className="inline-block bg-citrus-orange/10 text-citrus-orange px-3 py-1 rounded-full text-sm font-medium mb-2">
              Our Services
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Solutions for Every Space
            </h2>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/70 mb-2">
                        {service.description}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center text-sm text-citrus-orange hover:text-citrus-coral transition-colors"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-8 bg-white/10 hover:bg-white/20 border-white/20" />
            <CarouselNext className="absolute -right-8 bg-white/10 hover:bg-white/20 border-white/20" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ServicesCarousel;
