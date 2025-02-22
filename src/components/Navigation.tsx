
import { useState, useEffect } from "react";
import { Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "./consultation/ConsultationDialog";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

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
            <div className="hidden md:flex items-center">
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
              <div className="container mx-auto px-4 py-4">
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
