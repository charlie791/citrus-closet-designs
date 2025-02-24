
import { useState } from "react";

const galleryImages = [
  {
    src: "/closet-images/All white closet colorful clothes tall mirror great picture_1920x1072.webp",
    alt: "White closet with colorful clothes and tall mirror",
    title: "Modern Walk-in Closet",
    size: "large"
  },
  {
    src: "/closet-images/Black colored custom closet_1920x1072.webp",
    alt: "Black colored custom closet",
    title: "Luxury Black Custom Closet",
    size: "medium"
  },
  {
    src: "/closet-images/Built-in closet on wall single room integrated closet_1920x1072.webp",
    alt: "Built-in wall closet",
    title: "Integrated Wall Closet",
    size: "small"
  },
  {
    src: "/closet-images/Classic walk-in closet with a chair_1920x1072.webp",
    alt: "Classic walk-in closet",
    title: "Classic Walk-in Design",
    size: "large"
  },
  {
    src: "/closet-images/Gray colored cabinet custom closet_1920x1072.webp",
    alt: "Gray cabinet custom closet",
    title: "Modern Gray Storage",
    size: "medium"
  },
  {
    src: "/closet-images/Mocha brown slab front very realistic closet_1920x1072.webp",
    alt: "Mocha brown closet",
    title: "Elegant Mocha Design",
    size: "small"
  }
];

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-citrus-orange/10 text-citrus-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-4">
            Project Gallery
          </h2>
          <p className="text-citrus-charcoal/70 max-w-2xl mx-auto">
            Explore our collection of custom storage solutions and transformations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] ${
                image.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                image.size === 'medium' ? 'md:col-span-2 lg:col-span-1' :
                ''
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-semibold text-lg">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
