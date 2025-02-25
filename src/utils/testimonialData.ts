
import { Testimonial } from "@/types/testimonial";

export const baseTestimonials: Testimonial[] = [
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

export const generateTestimonials = (): Testimonial[] => {
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
    id: index + 4,
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
