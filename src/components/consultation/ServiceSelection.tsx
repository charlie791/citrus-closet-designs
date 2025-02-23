
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    id: "custom-closets",
    title: "Custom Closets",
    description: "Walk-in closets, reach-in closets, and wardrobe solutions",
  },
  {
    id: "pantry-laundry",
    title: "Pantry & Laundry",
    description: "Organized storage for your kitchen and laundry spaces",
  },
  {
    id: "garage-storage",
    title: "Garage Storage",
    description: "Custom garage organization and storage systems",
  },
  {
    id: "home-office",
    title: "Home Office",
    description: "Productive workspace solutions and organization",
  },
  {
    id: "other-solutions",
    title: "Other Solutions",
    description: "Entertainment centers, murphy beds, and more",
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
    <>
      <h2 className="text-2xl font-semibold text-citrus-charcoal mb-2">
        Select Your Areas of Interest
      </h2>
      <p className="text-citrus-charcoal/70 mb-6">
        Choose the areas you'd like to organize and improve.
      </p>

      <div className="grid gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onToggleService(service.id)}
            className={cn(
              "flex items-start p-4 rounded-lg border-2 text-left transition-all duration-200",
              selectedServices.includes(service.id)
                ? "border-citrus-orange bg-citrus-orange/5"
                : "border-gray-200 hover:border-citrus-orange/50"
            )}
          >
            <div className="flex-1">
              <h3 className="font-medium text-citrus-charcoal">{service.title}</h3>
              <p className="text-sm text-citrus-charcoal/70">{service.description}</p>
            </div>
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
              selectedServices.includes(service.id)
                ? "border-citrus-orange bg-citrus-orange text-white"
                : "border-gray-300"
            )}>
              {selectedServices.includes(service.id) && (
                <Check className="w-3 h-3" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          className="bg-citrus-orange hover:bg-citrus-coral"
          disabled={selectedServices.length === 0}
          onClick={onNext}
        >
          <span>Next Step</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
