import { useState, useEffect } from "react";
import { Calendar, Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "./consultation/ConsultationDialog";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="text-2xl font-semibold text-citrus-charcoal">
              <img src="/citrus-closets.svg" alt="Citrus Closets" className="h-8" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Location Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <MapPin className="h-6 w-6 text-citrus-charcoal" />
                </button>
                
                {/* Location Dropdown Menu */}
                {isLocationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
                    <h3 className="text-lg font-semibold text-citrus-charcoal mb-4 px-2">Our Showrooms</h3>
                    <div className="space-y-3">
                      <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-citrus-charcoal">Orlando Showroom</h4>
                          <p className="text-sm text-gray-600">123 Storage Lane, Orlando, FL 32801</p>
                        </div>
                      </a>
                      <div className="h-px bg-gray-100" />
                      <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
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
                className="bg-citrus-orange hover:bg-citrus-coral transition-colors"
                onClick={() => setIsConsultationOpen(true)}
              >
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
                {/* Mobile Location Options */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-citrus-charcoal mb-3">Our Showrooms</h3>
                  <div className="space-y-4">
                    <a href="#" className="block p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-semibold text-citrus-charcoal">Orlando Showroom</h4>
                      <p className="text-sm text-gray-600">123 Storage Lane, Orlando, FL 32801</p>
                    </a>
                    <a href="#" className="block p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-semibold text-citrus-charcoal">Tampa Showroom</h4>
                      <p className="text-sm text-gray-600">456 Organization Blvd, Tampa, FL 33601</p>
                    </a>
                  </div>
                </div>

                <Button 
                  className="w-full bg-citrus-orange hover:bg-citrus-coral transition-colors"
                  onClick={() => {
                    setIsConsultationOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Consultation
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <ConsultationDialog
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </>
  );
};

export default Navigation;
