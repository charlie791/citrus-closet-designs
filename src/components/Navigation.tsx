
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
    <>
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="h-24 flex items-center justify-between relative">
            {/* Logo (Left) */}
            <Link 
              to="/" 
              className="relative group transition-transform duration-200 hover:scale-105"
            >
              <img 
                src="/citrus-closets.svg" 
                alt="Citrus Closets" 
                className="h-12 relative z-10" 
              />
              <div className="absolute inset-0 bg-citrus-peach/20 filter blur-xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-300" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/services/custom-closets" 
                className="text-sm font-medium tracking-wide hover:text-citrus-orange transition-colors duration-200"
              >
                CLOSETS
              </Link>
              <Link 
                to="/services" 
                className="text-sm font-medium tracking-wide hover:text-citrus-orange transition-colors duration-200"
              >
                CUSTOM SPACES
              </Link>
              <a 
                href="tel:8445673477" 
                className="flex items-center space-x-2 text-sm font-medium tracking-wide hover:text-citrus-orange transition-colors duration-200"
              >
                <Phone className="h-4 w-4" />
                <span>CALL NOW (844) 567-3477</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 hover:bg-white/50 rounded-full transition-colors duration-200"
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
            <div className="lg:hidden absolute top-24 left-0 w-full bg-white/95 backdrop-blur-md shadow-xl animate-fade-in border-t border-white/20">
              <div className="px-6 py-6 space-y-4">
                <Link 
                  to="/services/custom-closets"
                  className="block p-4 text-center font-medium hover:bg-white/80 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CLOSETS
                </Link>
                <Link 
                  to="/services"
                  className="block p-4 text-center font-medium hover:bg-white/80 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CUSTOM SPACES
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Floating Phone Widget (Mobile Only) */}
      <a 
        href="tel:8445673477" 
        className="lg:hidden fixed bottom-6 right-6 bg-citrus-orange hover:bg-citrus-coral shadow-lg rounded-full p-4 flex items-center justify-center text-white z-50 transition-all duration-200 active:scale-95"
      >
        <Phone className="h-6 w-6" />
      </a>
    </>
  );
};

export default Navigation;
