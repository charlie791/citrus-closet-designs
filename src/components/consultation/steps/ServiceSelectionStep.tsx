
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceOption {
  id: string;
  title: string;
  description: string;
  image: string;
}

const services: ServiceOption[] = [
  {
    id: "custom-closets",
    title: "Custom Closets",
    description: "Transform your closet space with custom organization",
    image: "/lovable-uploads/534d080f-8704-4057-be6e-2b8ddc5a5803.png",
  },
  {
    id: "garage",
    title: "Garage Storage",
    description: "Maximize your garage space with smart storage solutions",
    image: "/lovable-uploads/534d080f-8704-4057-be6e-2b8ddc5a5803.png", // You'll want to replace this with an actual garage image
  },
  {
    id: "home-office",
    title: "Home Office",
    description: "Design a productive and organized home office",
    image: "/lovable-uploads/534d080f-8704-4057-be6e-2b8ddc5a5803.png", // You'll want to replace this with an actual office image
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
      <h2 className="text-3xl font-bold text-center mb-2">
        Our Organization Solutions
      </h2>
      <p className="text-lg text-gray-400 text-center mb-8">
        What areas can we help you with?
      </p>
      <div className="space-y-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => toggleService(service.id)}
            className={`w-full p-4 rounded-2xl border text-left transition-all ${
              selectedServices.includes(service.id)
                ? "border-citrus-orange bg-[#1E2330]"
                : "border-white/10 hover:border-white/20 bg-[#1E2330]"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${
                  selectedServices.includes(service.id)
                    ? "bg-citrus-orange border-citrus-orange"
                    : "border-white/30"
                }`}
              >
                {selectedServices.includes(service.id) && (
                  <Check className="h-3.5 w-3.5 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="text-gray-400 mt-1">{service.description}</p>
              </div>
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="flex gap-3 mt-8">
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
