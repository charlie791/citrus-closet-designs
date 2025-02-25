
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

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
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-white/70 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/gallery" className="text-white/70 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/process" className="text-white/70 hover:text-white transition-colors">Process</Link></li>
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/about/testimonials" className="text-white/70 hover:text-white transition-colors">Testimonials</Link></li>
              <li><Link to="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services/custom-closets" className="text-white/70 hover:text-white transition-colors">Custom Closets</Link></li>
              <li><Link to="/services/garage-storage" className="text-white/70 hover:text-white transition-colors">Garage Systems</Link></li>
              <li><Link to="/services/pantry-and-laundry" className="text-white/70 hover:text-white transition-colors">Pantry Storage</Link></li>
              <li><Link to="/services/home-office" className="text-white/70 hover:text-white transition-colors">Home Office</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>4450 Seaboard Rd</li>
              <li>Orlando, FL 32808</li>
              <li>Phone: (407) 349-8466</li>
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

