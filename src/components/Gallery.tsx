
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const galleryImages = [
  {
    src: "/closet-images/All white closet colorful clothes tall mirror great picture_1920x1072.webp",
    alt: "White closet with colorful clothes and tall mirror",
    title: "Modern Walk-in Closet",
  },
  {
    src: "/closet-images/Black colored custom closet_1920x1072.webp",
    alt: "Black colored custom closet",
    title: "Luxury Black Custom Closet",
  },
  {
    src: "/closet-images/Built-in closet on wall single room integrated closet_1920x1072.webp",
    alt: "Built-in wall closet",
    title: "Integrated Wall Closet",
  },
  {
    src: "/closet-images/Classic walk-in closet with a chair_1920x1072.webp",
    alt: "Classic walk-in closet",
    title: "Classic Walk-in Design",
  },
  {
    src: "/closet-images/Gray colored cabinet custom closet_1920x1072.webp",
    alt: "Gray cabinet custom closet",
    title: "Modern Gray Storage",
  },
  {
    src: "/closet-images/Mocha brown slab front very realistic closet_1920x1072.webp",
    alt: "Mocha brown closet",
    title: "Elegant Mocha Design",
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const galleryRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setCursorPosition({ x, y });
        mouseX.set(x * 100);
        mouseY.set(y * 100);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const calculatePosition = (index: number) => {
    const offset = Math.sin((Date.now() + index * 1000) / 2000) * 10;
    return offset;
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-citrus-orange/10 text-citrus-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4"
          >
            Our Work
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Project Gallery
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Explore our collection of custom storage solutions and transformations
          </motion.p>
        </div>

        <div 
          ref={galleryRef}
          className="relative min-h-[80vh] perspective-[1000px]"
          style={{
            background: `radial-gradient(circle at ${cursorPosition.x * 100}% ${
              cursorPosition.y * 100
            }%, rgba(242,103,34,0.15), transparent 25%)`
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => {
              const offset = calculatePosition(index);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: [0, 2, -2, 0],
                    transition: { duration: 0.5 }
                  }}
                  animate={{
                    y: [offset, -offset],
                    transition: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 3 + index,
                      ease: "easeInOut"
                    }
                  }}
                  onClick={() => setSelectedImage(selectedImage === index ? null : index)}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: selectedImage === index ? "scale(1.1)" : "scale(1)"
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-citrus-orange/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(225deg, rgba(242,103,34,0.3) 0%, transparent 100%)`,
                    }}
                  />
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-[400px] object-cover rounded-2xl"
                    style={{
                      filter: selectedImage === index ? "brightness(1.2)" : "brightness(1)",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <h3 className="text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {image.title}
                    </h3>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
