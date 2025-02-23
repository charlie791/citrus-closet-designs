
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
}

const services: Service[] = [
  {
    id: "custom-closets",
    title: "Custom Closets",
    description: "Transform your closet space with custom organization",
    image: "/lovable-uploads/534d080f-8704-4057-be6e-2b8ddc5a5803.png"
  },
  {
    id: "garage-storage",
    title: "Garage Storage",
    description: "Maximize your garage space with smart storage solutions",
    image: "/lovable-uploads/d43e797e-cf6f-49a7-a441-6d661fefbe40.png"
  },
  {
    id: "home-solutions",
    title: "Home Solutions",
    description: "Complete home organization including pantry, laundry, home office, entertainment centers, murphy beds, and more",
    image: "/lovable-uploads/534d080f-8704-4057-be6e-2b8ddc5a5803.png"
  },
];

interface ServiceSelectionProps {
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
  onNext: () => void;
  onCancel: () => void;
}

export function ServiceSelection({ 
  selectedServices, 
  onToggleService, 
  onNext, 
  onCancel 
}: ServiceSelectionProps) {
  return (
    <div className="max-w-md mx-auto">
      <button 
        onClick={onCancel}
        className="absolute right-2 top-2 p-1.5 text-white/70 hover:text-white transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
      
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Let's Get Organized
        </h2>
        <p className="text-sm text-white/70">
          What areas can we help you with?
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onToggleService(service.id)}
            className={cn(
              "w-full flex items-center p-3 rounded-xl border text-left transition-all duration-200",
              selectedServices.includes(service.id)
                ? "border-citrus-orange bg-citrus-orange/5"
                : "border-white/10 hover:border-white/20 bg-white/5"
            )}
          >
            <div 
              className={cn(
                "w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200 mr-3",
                selectedServices.includes(service.id)
                  ? "border-citrus-orange"
                  : "border-white/30"
              )}
            >
              {selectedServices.includes(service.id) && (
                <div className="w-2.5 h-2.5 rounded-full bg-citrus-orange" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-white truncate">{service.title}</h3>
              <p className="text-sm text-white/70 line-clamp-2">{service.description}</p>
            </div>
            {service.image && (
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ml-3">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </button>
        ))}
      </div>

      <Button
        className="w-full py-2 bg-citrus-orange hover:bg-citrus-coral text-white"
        disabled={selectedServices.length === 0}
        onClick={onNext}
      >
        Continue
        <ArrowRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
