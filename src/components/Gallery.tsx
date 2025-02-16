
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop",
    title: "Modern Walk-in Closet"
  },
  {
    url: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=800&auto=format&fit=crop",
    title: "Luxury Wardrobe"
  },
  {
    url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop",
    title: "Organized Pantry"
  },
  {
    url: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop",
    title: "Garage Storage"
  }
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-white to-citrus-peach/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-citrus-orange/10 text-citrus-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-4">
            Featured Projects
          </h2>
          <p className="text-citrus-charcoal/70 max-w-2xl mx-auto">
            Browse through our collection of custom storage solutions and transformations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-semibold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="secondary" className="group">
            View Full Gallery
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
