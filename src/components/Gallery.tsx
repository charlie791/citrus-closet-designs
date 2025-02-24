import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const galleryImages = [
  {
    src: "/closet-images/All white closet colorful clothes tall mirror great picture_1920x1072.webp",
    alt: "White closet with colorful clothes and tall mirror",
    title: "Modern Walk-in Closet",
    note: "Perfect blend of style & function ✨",
  },
  {
    src: "/closet-images/Black colored custom closet_1920x1072.webp",
    alt: "Black colored custom closet",
    title: "Luxury Black Custom Closet",
    note: "Sleek & sophisticated design 🖤",
  },
  {
    src: "/closet-images/Built-in closet on wall single room integrated closet_1920x1072.webp",
    alt: "Built-in wall closet",
    title: "Integrated Wall Closet",
    note: "Smart space utilization 📐",
  },
  {
    src: "/closet-images/Classic walk-in closet with a chair_1920x1072.webp",
    alt: "Classic walk-in closet",
    title: "Classic Walk-in Design",
    note: "Timeless elegance ⭐",
  },
  {
    src: "/closet-images/Gray colored cabinet custom closet_1920x1072.webp",
    alt: "Gray cabinet custom closet",
    title: "Modern Gray Storage",
    note: "Contemporary & clean 🌟",
  },
  {
    src: "/closet-images/Mocha brown slab front very realistic closet_1920x1072.webp",
    alt: "Mocha brown closet",
    title: "Elegant Mocha Design",
    note: "Warm & inviting space ✨",
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const getRandomRotation = (index: number) => {
    return (((index * 137.5) % 11) - 5);
  };

  const getRandomOffset = (index: number) => {
    return {
      x: ((index * 137.5) % 40) - 20,
      y: ((index * 137.5) % 30) - 15
    };
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setModalOpen(true);
  };

  return (
    <section className="py-24 bg-[#f5f5f5] overflow-hidden">
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
            className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-4"
          >
            Project Gallery
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            A collection of our favorite transformations
          </motion.p>
        </div>

        <div 
          ref={galleryRef}
          className="relative min-h-[80vh] max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {galleryImages.map((image, index) => {
                const rotation = getRandomRotation(index);
                const offset = getRandomOffset(index);
                
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
                      scale: 1.02,
                      rotate: rotation,
                      zIndex: 20,
                      transition: { duration: 0.3 }
                    }}
                    onClick={() => handleImageClick(index)}
                    className="relative cursor-pointer"
                    style={{
                      transformOrigin: "center",
                      transform: `rotate(${rotation}deg) translate(${offset.x}px, ${offset.y}px)`,
                      zIndex: selectedImage === index ? 30 : 10,
                    }}
                  >
                    <div className="
                      bg-white p-3 pb-24 rounded shadow-lg
                      transform transition-all duration-300
                      hover:shadow-xl
                    ">
                      <motion.img
                        src={image.src}
                        alt={image.alt}
                        className="w-full aspect-[4/3] object-cover rounded"
                      />
                      <motion.div
                        className="absolute bottom-6 left-4 right-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="font-['Caveat'] text-2xl text-gray-800 -rotate-2 mb-2">
                          {image.title}
                        </p>
                        <p className="font-['Caveat'] text-lg text-gray-600 rotate-1">
                          {image.note}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-5xl bg-white p-0 border-none">
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-lg"
            >
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <h3 className="font-['Caveat'] text-3xl text-white mb-2">
                  {galleryImages[selectedImage].title}
                </h3>
                <p className="font-['Caveat'] text-2xl text-white/90">
                  {galleryImages[selectedImage].note}
                </p>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
