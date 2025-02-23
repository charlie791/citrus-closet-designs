
import { useState, useEffect } from "react";
import { Menu, X, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

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
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <a 
            href="/" 
            className="relative group transition-transform duration-200 hover:scale-105"
          >
            <img 
              src="/citrus-closets.svg" 
              alt="Citrus Closets" 
              className="h-12 relative z-10" 
            />
            <div className="absolute inset-0 bg-citrus-peach/20 filter blur-xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-300" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Location Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="p-3 hover:bg-white/50 rounded-full transition-colors duration-200 hover:shadow-md"
              >
                <MapPin className="h-6 w-6 text-citrus-charcoal hover:text-citrus-orange transition-colors duration-200" />
              </button>
              
              {/* Location Dropdown Menu */}
              {isLocationDropdownOpen && (
                <div className="absolute right-0 mt-3 w-96 bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-6 z-50 border border-white/20 animate-scale-in">
                  <h3 className="text-lg font-semibold text-citrus-charcoal mb-4 px-2">Our Showrooms</h3>
                  <div className="space-y-3">
                    <a href="#" className="block p-4 rounded-lg hover:bg-white/80 transition-all duration-200 hover:shadow-md">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-citrus-charcoal">Orlando Showroom</h4>
                        <p className="text-sm text-gray-600">123 Storage Lane, Orlando, FL 32801</p>
                      </div>
                    </a>
                    <div className="h-px bg-gray-100" />
                    <a href="#" className="block p-4 rounded-lg hover:bg-white/80 transition-all duration-200 hover:shadow-md">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-citrus-charcoal">Tampa Showroom</h4>
                        <p className="text-sm text-gray-600">456 Organization Blvd, Tampa, FL 33601</p>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <Button 
              className="bg-citrus-orange hover:bg-citrus-coral transition-all duration-200 px-6 py-2.5 h-auto text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 rounded-full flex items-center gap-2"
              onClick={() => window.location.href = '/contact'}
            >
              <Calendar className="h-4 w-4" />
              Schedule Free Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 hover:bg-white/50 rounded-full transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 
              <X className="h-6 w-6 text-citrus-charcoal" /> : 
              <Menu className="h-6 w-6 text-citrus-charcoal" />
            }
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-24 left-0 w-full bg-white/95 backdrop-blur-md shadow-xl animate-fade-in border-t border-white/20">
            <div className="container mx-auto px-6 py-6 space-y-6">
              {/* Mobile Location Options */}
              <div className="p-6 bg-white/50 rounded-xl">
                <h3 className="text-lg font-semibold text-citrus-charcoal mb-4">Our Showrooms</h3>
                <div className="space-y-4">
                  <a href="#" className="block p-4 bg-white/80 rounded-lg hover:bg-white transition-colors duration-200 hover:shadow-md">
                    <h4 className="font-semibold text-citrus-charcoal">Orlando Showroom</h4>
                    <p className="text-sm text-gray-600">123 Storage Lane, Orlando, FL 32801</p>
                  </a>
                  <a href="#" className="block p-4 bg-white/80 rounded-lg hover:bg-white transition-colors duration-200 hover:shadow-md">
                    <h4 className="font-semibold text-citrus-charcoal">Tampa Showroom</h4>
                    <p className="text-sm text-gray-600">456 Organization Blvd, Tampa, FL 33601</p>
                  </a>
                </div>
              </div>

              <Button 
                className="w-full bg-citrus-orange hover:bg-citrus-coral transition-all duration-200 px-6 py-3 h-auto text-sm shadow-md hover:shadow-lg rounded-full flex items-center justify-center gap-2"
                onClick={() => window.location.href = '/contact'}
              >
                <Calendar className="h-4 w-4" />
                Schedule Free Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
