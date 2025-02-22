
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const services: ServiceOption[] = [
  {
    id: "custom-closets",
    title: "Custom Closets",
    description: "Personalized storage solutions for any closet space",
    icon: "🗄️",
  },
  {
    id: "pantry",
    title: "Pantry Organization",
    description: "Maximize your kitchen storage space",
    icon: "🥫",
  },
  {
    id: "garage",
    title: "Garage Storage",
    description: "Transform your garage into an organized space",
    icon: "🚗",
  },
  {
    id: "home-office",
    title: "Home Office",
    description: "Create a productive workspace at home",
    icon: "💼",
  },
];

interface ServiceSelectionStepProps {
  selected: string[];
  onBack: () => void;
  onNext: (services: string[]) => void;
}

const ServiceSelectionStep = ({
  selected,
  onBack,
  onNext,
}: ServiceSelectionStepProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(selected);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="p-6 md:p-8 text-white">
      <h2 className="text-2xl font-bold text-center mb-6">
        Our Organization Solutions
      </h2>
      <div className="grid grid-cols-1 gap-3 mb-6">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => toggleService(service.id)}
            className={`p-4 rounded-lg border text-left transition-all ${
              selectedServices.includes(service.id)
                ? "border-citrus-orange bg-citrus-orange/10"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{service.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold">{service.title}</h3>
                <p className="text-sm text-white/70">{service.description}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedServices.includes(service.id)
                    ? "bg-citrus-orange border-citrus-orange"
                    : "border-white/30"
                }`}
              >
                {selectedServices.includes(service.id) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
        >
          Back
        </Button>
        <Button
          onClick={() => onNext(selectedServices)}
          disabled={selectedServices.length === 0}
          className="flex-1 bg-citrus-orange hover:bg-citrus-coral"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ServiceSelectionStep;
