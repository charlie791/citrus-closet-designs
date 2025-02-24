
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
        <div className="glass-effect rounded-2xl shadow-2xl p-6 animate-fade-in [animation-delay:1.1s] opacity-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/4">
                  <div className="group relative bg-black/40 rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300 
                    shadow-[0_4px_12px_-1px_rgba(0,0,0,0.3)] 
                    hover:shadow-[0_8px_20px_-2px_rgba(0,0,0,0.4)]
                    hover:bg-black/50 hover:-translate-y-1">
                    <div className="aspect-video overflow-hidden">
                      <div className="relative w-full h-full">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 pointer-events-none" />
                      </div>
                    </div>
                    <div className="relative p-4">
                      <h3 className="text-base font-semibold text-white drop-shadow-sm">
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-2 mt-1 mb-3 drop-shadow-sm">
                        {service.description}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center text-sm font-medium text-citrus-orange hover:text-citrus-coral transition-colors"
                      >
                        Learn More
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-8 bg-black/20 hover:bg-black/30 border-white/10" />
            <CarouselNext className="absolute -right-8 bg-black/20 hover:bg-black/30 border-white/10" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ServicesCarousel;
