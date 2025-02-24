
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ServiceCard from "./ServiceCard";

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
    title: "Home Office",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&auto=format&fit=crop",
    href: "/services/home-office"
  },
  {
    title: "Laundry Room",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=800&auto=format&fit=crop",
    href: "/services/pantry-and-laundry"
  },
  {
    title: "Wall Units",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
    href: "/services/other-solutions"
  },
  {
    title: "Entertainment",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop",
    href: "/services/other-solutions"
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
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-4 animate-fade-in [animation-delay:1.1s] opacity-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {services.map((service, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-2 basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <ServiceCard {...service} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-6 bg-white/10 hover:bg-white/20 border-white/20" />
            <CarouselNext className="absolute -right-6 bg-white/10 hover:bg-white/20 border-white/20" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ServicesCarousel;

