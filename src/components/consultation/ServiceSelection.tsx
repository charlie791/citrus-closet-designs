
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, X, ChevronLeft } from "lucide-react";
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
  },
  {
    id: "garage-storage",
    title: "Garage Storage",
    description: "Maximize your garage space with smart storage solutions",
  },
  {
    id: "home-solutions",
    title: "Home Solutions",
    description: "Complete home organization including pantry, laundry, home office, entertainment centers, murphy beds, and more",
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
    <div className="relative">
      <button 
        onClick={onCancel}
        className="absolute right-0 top-0 p-2 text-white/70 hover:text-white transition-colors"
      >
        <X className="h-6 w-6" />
      </button>
      
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-semibold text-white mb-4">
          Our Organization Solutions
        </h1>
        <p className="text-xl text-white/70">
          What areas can we help you with?
        </p>
      </div>

      <div className="space-y-4 mb-12">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onToggleService(service.id)}
            className={cn(
              "w-full flex items-center p-6 rounded-2xl border-2 text-left transition-all duration-200",
              selectedServices.includes(service.id)
                ? "border-citrus-orange bg-citrus-orange/5"
                : "border-white/10 hover:border-white/20 bg-white/5"
            )}
          >
            <div 
              className={cn(
                "w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 mr-6",
                selectedServices.includes(service.id)
                  ? "border-citrus-orange"
                  : "border-white/30"
              )}
            >
              {selectedServices.includes(service.id) && (
                <div className="w-3 h-3 rounded-full bg-citrus-orange" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-white mb-1">{service.title}</h3>
              <p className="text-white/70">{service.description}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="text-white/70 text-center mb-8">
        Please select at least one area
      </p>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={onCancel}
          className="py-6 text-lg border-white/10 text-white hover:bg-white/5"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <Button
          className="py-6 text-lg bg-citrus-orange hover:bg-citrus-coral text-white"
          disabled={selectedServices.length === 0}
          onClick={onNext}
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
