
import { Facebook, Instagram, LinkedIn, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-citrus-charcoal text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Citrus Closets</h3>
            <p className="text-white/70 mb-4">
              Creating beautiful, functional spaces that bring order to your life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <LinkedIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-white/70 hover:text-white transition-colors">Services</a></li>
              <li><a href="#gallery" className="text-white/70 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#process" className="text-white/70 hover:text-white transition-colors">Process</a></li>
              <li><a href="#about" className="text-white/70 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#blog" className="text-white/70 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Custom Closets</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Walk-in Closets</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Pantry Storage</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Garage Systems</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>123 Storage Lane</li>
              <li>Organization City, ST 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@citrusclosets.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/70">
          <p>&copy; {new Date().getFullYear()} Citrus Closets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
