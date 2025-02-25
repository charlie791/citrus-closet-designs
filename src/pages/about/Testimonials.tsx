import PageLayout from "@/components/PageLayout";
import { Star, MapPin } from "lucide-react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useRef } from "react";

// Define the testimonial type
type Testimonial = {
  id: number;
  name: string;
  location: string;
  image: string;
  quote: string;
  rating: number;
  project: string;
  date: string;
};

// Sample testimonial data (we'll generate more programmatically)
const baseTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Winter Park, Orlando",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    quote: "The transformation of my master closet exceeded all expectations. The team was professional and the result is stunning!",
    rating: 5,
    project: "Custom Closet",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Davis Islands, Tampa",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    quote: "Outstanding quality and attention to detail. The 3D design process made it easy to visualize the end result.",
    rating: 5,
    project: "Garage Storage",
    date: new Date().toLocaleDateString(),
  },
  {
    id: 3,
    name: "Emily Roberts",
    location: "Lake Mary, Orlando",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    quote: "As a homeowner in Lake Mary, I couldn't be happier with my new pantry system. It's literally changed how we organize!",
    rating: 5,
    project: "Pantry Solution",
    date: new Date().toLocaleDateString(),
  }
];

// Generate 500+ testimonials by combining elements
const generateTestimonials = (): Testimonial[] => {
  const locations = [
    "Winter Park, Orlando", "Downtown Orlando", "Lake Nona", "Windermere",
    "South Tampa", "Davis Islands", "Hyde Park", "Westchase", "Lake Mary",
    "Baldwin Park", "College Park", "Winter Garden", "Celebration"
  ];
  
  const projects = [
    "Custom Closet", "Garage Storage", "Home Office", "Pantry Solution",
    "Laundry Room", "Entertainment Center", "Wine Storage", "Wall Unit"
  ];
  
  const quotes = [
    "Absolutely transformed our space! The attention to detail was incredible.",
    "Best investment we've made in our home. The organization system is perfect.",
    "Professional team, stunning results. Couldn't be happier!",
    "Finally have the dream closet I've always wanted. Thank you Citrus Closets!",
    "The 3D design process made it so easy to visualize. The result is exactly what we wanted."
  ];

  const expandedTestimonials = Array.from({ length: 500 }, (_, index) => ({
    id: index + 4, // Start after the base testimonials
    name: `Happy Client ${index + 1}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    image: `https://images.unsplash.com/photo-${1500000000000 + index}?q=80&w=200&auto=format&fit=crop`,
    quote: quotes[Math.floor(Math.random() * quotes.length)],
    rating: 5,
    project: projects[Math.floor(Math.random() * projects.length)],
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
  }));

  return [...baseTestimonials, ...expandedTestimonials];
};

const testimonials = generateTestimonials();

const TestimonialCard = ({ testimonial, index, setSelected }: { 
  testimonial: Testimonial; 
  index: number;
  setSelected: (t: Testimonial | null) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute bg-white p-4 rounded-lg shadow-lg cursor-pointer"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        zIndex: Math.floor(Math.random() * 10),
        maxWidth: "300px",
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX,
        rotateY,
      }}
      initial={{
        opacity: 0,
        scale: 0.5,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50
      }}
      animate={{
        opacity: [0.7, 1, 0.7],
        scale: [1, 1.05, 1],
        x: Math.random() * 50 - 25,
        y: Math.random() * 50 - 25
      }}
      transition={{
        duration: 10 + Math.random() * 5,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      whileHover={{
        scale: 1.1,
        zIndex: 50,
        transition: { duration: 0.2 }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setSelected(testimonial)}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1">
          {Array(5).fill(null).map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-citrus-orange text-citrus-orange" />
          ))}
        </div>
        <span className="text-xs text-citrus-charcoal/60">{testimonial.date}</span>
      </div>
      <p className="text-sm text-citrus-charcoal/80 line-clamp-2">{testimonial.quote}</p>
      <div className="mt-2 flex items-center justify-between text-xs text-citrus-charcoal/60">
        <span>{testimonial.location}</span>
        <span>{testimonial.project}</span>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  return (
    <PageLayout
      title="Client Testimonials"
      breadcrumbs={[
        { label: "About", href: "/about" },
        { label: "Testimonials", href: "/about/testimonials" }
      ]}
    >
      {/* Hero Stats Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-citrus-peach/10 py-12 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-citrus-charcoal mb-6">
              500+ Happy Clients
            </h1>
            <p className="text-xl md:text-2xl text-citrus-charcoal/70 mb-12">
              Hear what our satisfied customers in Tampa and Orlando have to say about their Citrus Closets experience
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Happy Clients", value: "500+" },
                { label: "5-Star Reviews", value: "100%" },
                { label: "Cities Served", value: "15+" },
                { label: "Years of Service", value: "10+" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white rounded-xl shadow-sm"
                >
                  <div className="text-3xl md:text-4xl font-bold text-citrus-orange mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-citrus-charcoal/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Testimonials Carousel */}
      <div className="mb-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Reviews</h2>
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {baseTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-md h-full"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <div className="flex items-center text-sm text-citrus-charcoal/70">
                          <MapPin className="w-4 h-4 mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {Array(5).fill(null).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-citrus-orange text-citrus-orange" />
                      ))}
                    </div>
                    <p className="text-citrus-charcoal/80 italic">"{testimonial.quote}"</p>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Floating Testimonials Cloud */}
      <div className="relative h-[800px] mb-24 overflow-hidden bg-gradient-to-b from-citrus-peach/5 to-white">
        <div className="absolute inset-0">
          {testimonials.slice(0, 50).map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
              setSelected={setSelectedTestimonial}
            />
          ))}
        </div>

        <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Client Testimonial</DialogTitle>
            </DialogHeader>
            {selectedTestimonial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={selectedTestimonial.image}
                    alt={selectedTestimonial.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{selectedTestimonial.name}</h3>
                    <div className="flex items-center text-sm text-citrus-charcoal/70">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedTestimonial.location}
                    </div>
                    <div className="flex gap-1 mt-2">
                      {Array(5).fill(null).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-citrus-orange text-citrus-orange" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-lg text-citrus-charcoal/80 italic mb-4">
                  "{selectedTestimonial.quote}"
                </p>
                <div className="flex items-center justify-between text-sm text-citrus-charcoal/60">
                  <span>{selectedTestimonial.project}</span>
                  <span>{selectedTestimonial.date}</span>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Location-based Grid */}
      <div className="container mx-auto px-4 mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Reviews by Location</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Orlando Reviews */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-citrus-orange" />
              Orlando Area
            </h3>
            <div className="space-y-4">
              {testimonials
                .filter(t => t.location.includes("Orlando"))
                .slice(0, 5)
                .map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex gap-1 mb-2">
                      {Array(5).fill(null).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-citrus-orange text-citrus-orange" />
                      ))}
                    </div>
                    <p className="text-sm text-citrus-charcoal/80 mb-2">{testimonial.quote}</p>
                    <div className="text-xs text-citrus-charcoal/60">
                      {testimonial.location} • {testimonial.project}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Tampa Reviews */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-citrus-orange" />
              Tampa Area
            </h3>
            <div className="space-y-4">
              {testimonials
                .filter(t => t.location.includes("Tampa"))
                .slice(0, 5)
                .map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex gap-1 mb-2">
                      {Array(5).fill(null).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-citrus-orange text-citrus-orange" />
                      ))}
                    </div>
                    <p className="text-sm text-citrus-charcoal/80 mb-2">{testimonial.quote}</p>
                    <div className="text-xs text-citrus-charcoal/60">
                      {testimonial.location} • {testimonial.project}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Testimonials;
