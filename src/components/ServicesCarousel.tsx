
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
    href: "/services/custom-closets"
  },
  {
    title: "Walk-in Closets",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=800&auto=format&fit=crop",
    href: "/services/custom-closets"
  },
  {
    title: "Pantry Storage",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop",
    href: "/services/pantry-and-laundry"
  },
  {
    title: "Garage Systems",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop",
    href: "/services/garage-storage"
  }
];

const ServicesCarousel = () => {
  return (
    <div className="relative z-20 -mt-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 animate-fade-in [animation-delay:1.1s] opacity-0">
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
                  <Link 
                    to={service.href}
                    className="block group relative bg-gradient-to-b from-white/15 to-white/5 rounded-lg overflow-hidden border border-white/25 backdrop-blur-sm transition-all duration-300 
                      shadow-[0_4px_12px_-1px_rgba(0,0,0,0.2),0_0_8px_-2px_rgba(255,255,255,0.1)] 
                      hover:shadow-[0_8px_20px_-2px_rgba(0,0,0,0.25),0_0_12px_-2px_rgba(255,255,255,0.2)]
                      hover:bg-white/20 hover:-translate-y-1"
                  >
                    <div className="aspect-video overflow-hidden">
                      <div className="relative w-full h-full">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Darker overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/70" />
                        {/* Centered title */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <h3 className="text-xl font-semibold text-white text-center px-4 drop-shadow-lg">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Link>
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
