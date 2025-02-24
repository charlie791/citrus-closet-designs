
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
  Icon: React.ComponentType<{ className?: string }>;
}

const services: Service[] = [
  {
    id: "custom-closets",
    title: "Custom Closets",
    Icon: CustomClosetIcon
  },
  {
    id: "garage-storage",
    title: "Garage Storage",
    Icon: GarageStorageIcon
  },
  {
    id: "home-office",
    title: "Home Office",
    Icon: HomeOfficeIcon
  },
  {
    id: "laundry-storage",
    title: "Laundry Storage",
    Icon: LaundryStorageIcon
  },
  {
    id: "craft-rooms",
    title: "Craft Rooms",
    Icon: CraftRoomIcon
  },
  {
    id: "entertainment",
    title: "Entertainment",
    Icon: EntertainmentIcon
  },
  {
    id: "wall-units",
    title: "Wall Units",
    Icon: WallUnitIcon
  },
  {
    id: "wine-pantry",
    title: "Wine Pantry",
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
        className="absolute right-2 top-2 p-1.5 md:p-2 text-white/70 hover:text-white transition-colors"
      >
        <X className="h-4 w-4 md:h-5 md:w-5" />
      </button>
      
      <div className="mb-3 md:mb-6 text-center">
        <h2 className="text-lg md:text-2xl font-semibold text-white mb-1 md:mb-2">
          Let's Get Organized
        </h2>
        <p className="text-xs md:text-sm text-white/70">
          What areas can we help you with?
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-6">
        {services.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          return (
            <button
              key={service.id}
              onClick={() => onToggleService(service.id)}
              className={cn(
                "flex flex-col items-center p-2 md:p-3 rounded-lg md:rounded-xl border text-center transition-all duration-200 active:scale-[0.98] touch-manipulation",
                isSelected
                  ? "border-citrus-orange bg-citrus-orange/5"
                  : "border-white/10 hover:border-white/20 bg-white/5"
              )}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 mb-1.5 md:mb-2">
                <service.Icon 
                  className={cn(
                    "w-full h-full transition-colors duration-300",
                    isSelected ? "text-citrus-orange" : "text-[#999B98]"
                  )} 
                />
              </div>
              <h3 className="text-xs md:text-sm font-medium text-white">
                {service.title}
              </h3>
            </button>
          );
        })}
      </div>

      <Button
        className="w-full bg-citrus-orange hover:bg-citrus-coral text-white rounded-lg md:rounded-xl py-3 md:py-6 h-auto text-sm md:text-base font-medium touch-manipulation"
        disabled={selectedServices.length === 0}
        onClick={onNext}
      >
        Continue
        <ArrowRight className="h-4 w-4 md:h-5 md:w-5 ml-1.5 md:ml-2" />
      </Button>
    </div>
  );
}
