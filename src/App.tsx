
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import NotFound from "./pages/NotFound";

// Services Routes
import Services from "./pages/services";
import CustomClosets from "./pages/services/CustomClosets";
import GarageStorage from "./pages/services/GarageStorage";
import HomeOffice from "./pages/services/HomeOffice";
import PantryLaundry from "./pages/services/PantryLaundry";
import CraftRooms from "./pages/services/CraftRooms";
import Entertainment from "./pages/services/Entertainment";
import WallUnits from "./pages/services/WallUnits";
import WinePantry from "./pages/services/WinePantry";

// Main Section Routes
import Process from "./pages/process";
import Gallery from "./pages/gallery";
import About from "./pages/about";
import Blog from "./pages/blog";
import Contact from "./pages/contact";
import ServiceAreas from "./pages/service-areas";

// About Section Routes
import Story from "./pages/about/Story";
import Team from "./pages/about/Team";
import Testimonials from "./pages/about/Testimonials";

// Contact Section Routes
import Consultation from "./pages/contact/Consultation";
import Financing from "./pages/contact/Financing";

// Service Areas Routes
import Orlando from "./pages/service-areas/Orlando";
import Tampa from "./pages/service-areas/Tampa";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Services Routes */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/custom-closets" element={<CustomClosets />} />
          <Route path="/services/garage-storage" element={<GarageStorage />} />
          <Route path="/services/home-office" element={<HomeOffice />} />
          <Route path="/services/pantry-and-laundry" element={<PantryLaundry />} />
          <Route path="/services/craft-rooms" element={<CraftRooms />} />
          <Route path="/services/entertainment" element={<Entertainment />} />
          <Route path="/services/wall-units" element={<WallUnits />} />
          <Route path="/services/wine-pantry" element={<WinePantry />} />
          
          {/* Main Section Routes */}
          <Route path="/process" element={<Process />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          
          {/* About Section Routes */}
          <Route path="/about/story" element={<Story />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/testimonials" element={<Testimonials />} />
          
          {/* Contact Section Routes */}
          <Route path="/contact/consultation" element={<Consultation />} />
          <Route path="/contact/financing" element={<Financing />} />
          
          {/* Service Areas Routes */}
          <Route path="/service-areas/orlando" element={<Orlando />} />
          <Route path="/service-areas/tampa" element={<Tampa />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
