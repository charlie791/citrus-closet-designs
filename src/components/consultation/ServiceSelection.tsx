
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomClosetIcon from "@/components/icons/CustomClosetIcon";
import GarageStorageIcon from "@/components/icons/GarageStorageIcon";
import HomeOfficeIcon from "@/components/icons/HomeOfficeIcon";
import LaundryStorageIcon from "@/components/icons/LaundryStorageIcon";
import CraftRoomIcon from "@/components/icons/CraftRoomIcon";
import EntertainmentIcon from "@/components/icons/EntertainmentIcon";
import WallUnitIcon from "@/components/icons/WallUnitIcon";
import WinePantryIcon from "@/components/icons/WinePantryIcon";

interface Service {
  id: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const services: Service[] = [
  {
    id: "custom-closets",
    title: "Custom Closets",
    description: "Transform your closet space with custom organization",
    Icon: CustomClosetIcon
  },
  {
    id: "garage-storage",
    title: "Garage Storage",
    description: "Maximize your garage space with smart storage solutions",
    Icon: GarageStorageIcon
  },
  {
    id: "home-office",
    title: "Home Office",
    description: "Create an organized and productive workspace",
    Icon: HomeOfficeIcon
  },
  {
    id: "laundry-storage",
    title: "Laundry Storage",
    description: "Optimize your laundry room with custom storage",
    Icon: LaundryStorageIcon
  },
  {
    id: "craft-rooms",
    title: "Craft Rooms",
    description: "Design the perfect space for your creative pursuits",
    Icon: CraftRoomIcon
  },
  {
    id: "entertainment",
    title: "Entertainment",
    description: "Custom entertainment centers and media storage",
    Icon: EntertainmentIcon
  },
  {
    id: "wall-units",
    title: "Wall Units",
    description: "Beautiful and functional wall storage solutions",
    Icon: WallUnitIcon
  },
  {
    id: "wine-pantry",
    title: "Wine Pantry",
    description: "Specialized storage for wine and pantry items",
    Icon: WinePantryIcon
  }
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
    <div className="w-full">
      <button 
        onClick={onCancel}
        className="absolute right-2 top-2 p-2 md:p-1.5 text-white/70 hover:text-white transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
      
      <div className="mb-4 md:mb-6 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
          Let's Get Organized
        </h2>
        <p className="text-xs md:text-sm text-white/70">
          What areas can we help you with?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
        {services.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          return (
            <button
              key={service.id}
              onClick={() => onToggleService(service.id)}
              className={cn(
                "flex flex-col items-center p-3 md:p-4 rounded-xl border text-center transition-all duration-200 active:scale-[0.99] touch-manipulation",
                isSelected
                  ? "border-citrus-orange bg-citrus-orange/5"
                  : "border-white/10 hover:border-white/20 bg-white/5"
              )}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-3">
                <service.Icon 
                  className={cn(
                    "w-full h-full transition-colors duration-300",
                    isSelected ? "text-citrus-orange" : "text-[#999B98]"
                  )} 
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-white mb-1">
                {service.title}
              </h3>
              <p className="text-xs md:text-sm text-white/70 line-clamp-2">
                {service.description}
              </p>
            </button>
          );
        })}
      </div>

      <Button
        className="w-full bg-citrus-orange hover:bg-citrus-coral text-white rounded-xl py-4 md:py-6 h-auto text-sm md:text-base font-medium touch-manipulation"
        disabled={selectedServices.length === 0}
        onClick={onNext}
      >
        Continue
        <ArrowRight className="h-4 md:h-5 w-4 md:w-5 ml-2" />
      </Button>
    </div>
  );
}
