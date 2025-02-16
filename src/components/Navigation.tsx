
import { useState, useEffect } from "react";
import { Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="text-2xl font-semibold text-citrus-charcoal">
            Citrus Closets
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-citrus-charcoal hover:text-citrus-orange transition-colors">
              Services
            </a>
            <a href="#gallery" className="text-citrus-charcoal hover:text-citrus-orange transition-colors">
              Gallery
            </a>
            <a href="#process" className="text-citrus-charcoal hover:text-citrus-orange transition-colors">
              Process
            </a>
            <a href="#about" className="text-citrus-charcoal hover:text-citrus-orange transition-colors">
              About
            </a>
            <Button className="bg-citrus-orange hover:bg-citrus-coral transition-colors">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-citrus-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md shadow-lg animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="#services" className="block text-citrus-charcoal hover:text-citrus-orange transition-colors">
                Services
              </a>
              <a href="#gallery" className="block text-citrus-charcoal hover:text-citrus-orange transition-colors">
                Gallery
              </a>
              <a href="#process" className="block text-citrus-charcoal hover:text-citrus-orange transition-colors">
                Process
              </a>
              <a href="#about" className="block text-citrus-charcoal hover:text-citrus-orange transition-colors">
                About
              </a>
              <Button className="w-full bg-citrus-orange hover:bg-citrus-coral transition-colors">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
