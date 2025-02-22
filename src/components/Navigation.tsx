
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
              Citrus Closets
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
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-citrus-charcoal">Orlando Showroom</h3>
                        <p className="text-gray-600">123 Storage Lane, Orlando, FL 32801</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-citrus-charcoal">Tampa Showroom</h3>
                        <p className="text-gray-600">456 Organization Blvd, Tampa, FL 33601</p>
                      </div>
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
                  <h3 className="text-lg font-semibold text-citrus-charcoal mb-2">Our Locations</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-citrus-charcoal">Orlando Showroom</h4>
                      <p className="text-gray-600">123 Storage Lane, Orlando, FL 32801</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-citrus-charcoal">Tampa Showroom</h4>
                      <p className="text-gray-600">456 Organization Blvd, Tampa, FL 33601</p>
                    </div>
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
