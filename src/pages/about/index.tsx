
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Book, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <PageLayout
      title="About Us"
      breadcrumbs={[{ label: "About", href: "/about" }]}
    >
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center mb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
          <img 
            src="/closet-images/Classic walk-in closet with a chair_1920x1072.webp"
            alt="Citrus Closets Team"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Your Space
            <br />
            <span className="text-citrus-orange">
              With Experts You Trust
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Creating beautiful, organized spaces in Orlando and Tampa
          </p>
        </div>
      </div>

      {/* Kardes Section */}
      <div className="container mx-auto px-4 mb-24">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-citrus-charcoal">Meet Kardes</h2>
              <div className="space-y-4 text-citrus-charcoal/70">
                <p>
                  As the founder and leader of Citrus Closets, Kardes brings over a decade of expertise in custom storage solutions and interior organization.
                </p>
                <p>
                  His vision for Citrus Closets stems from a deep understanding of how well-designed spaces can transform daily living. Every project is approached with meticulous attention to detail and a commitment to exceeding client expectations.
                </p>
                <p>
                  "Our goal is to create spaces that not only look beautiful but truly enhance how people live and interact with their homes."
                </p>
                <cite className="block font-semibold text-citrus-orange">
                  - Kardes, Founder & CEO
                </cite>
              </div>
            </div>
            <div className="relative h-full min-h-[400px] bg-citrus-peach/20">
              <img
                src="/closet-images/Medium tone, vibrant clothes very realistic custom closet_1920x1072.webp"
                alt="Kardes at work"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="container mx-auto px-4 mb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Story Card */}
          <motion.a
            href="/about/story"
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <img
              src="/closet-images/White closet real life functional good for blogs partially website_1920x1072.webp"
              alt="Our Story"
              className="w-full h-48 object-cover"
            />
            <div className="relative p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-citrus-orange/10 text-citrus-orange mb-4">
                <Book className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Story</h3>
              <p className="text-citrus-charcoal/70">
                Discover how we started and our journey to excellence in custom storage solutions.
              </p>
            </div>
          </motion.a>

          {/* Team Card */}
          <motion.a
            href="/about/team"
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <img
              src="/closet-images/Very clean realistic inside of a homeowners closet_1920x1072.webp"
              alt="Our Team"
              className="w-full h-48 object-cover"
            />
            <div className="relative p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-citrus-orange/10 text-citrus-orange mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Team</h3>
              <p className="text-citrus-charcoal/70">
                Meet the experts behind our exceptional custom storage solutions.
              </p>
            </div>
          </motion.a>

          {/* Testimonials Card */}
          <motion.a
            href="/about/testimonials"
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <img
              src="/closet-images/Slab white custom closet sitting cushion_1920x1072.webp"
              alt="Testimonials"
              className="w-full h-48 object-cover"
            />
            <div className="relative p-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-citrus-orange/10 text-citrus-orange mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Testimonials</h3>
              <p className="text-citrus-charcoal/70">
                Read what our clients say about their transformation journey with us.
              </p>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-citrus-peach/10 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-citrus-charcoal">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-citrus-charcoal/70 mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our team and start your journey to a beautifully organized home.
          </p>
          <Button 
            size="lg" 
            className="bg-citrus-orange hover:bg-citrus-coral"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Schedule Free Consultation
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
