
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceList } from "./ServiceList";
import CustomClosetIcon from "@/components/icons/CustomClosetIcon";
import GarageStorageIcon from "@/components/icons/GarageStorageIcon";
import HomeOfficeIcon from "@/components/icons/HomeOfficeIcon";
import LaundryStorageIcon from "@/components/icons/LaundryStorageIcon";
import CraftRoomIcon from "@/components/icons/CraftRoomIcon";
import EntertainmentIcon from "@/components/icons/EntertainmentIcon";
import WallUnitIcon from "@/components/icons/WallUnitIcon";
import WinePantryIcon from "@/components/icons/WinePantryIcon";

const services = [
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
    <div className="w-full animate-fade-in">
      <button 
        onClick={onCancel}
        className="absolute right-2 top-2 p-2 text-white/70 hover:text-white transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
      
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-white mb-1">
          Let's Get Organized
        </h2>
        <p className="text-sm text-white/70">
          What areas can we help you with?
        </p>
      </div>

      <div className="mb-4">
        <ServiceList
          services={services}
          selectedServices={selectedServices}
          onToggleService={onToggleService}
        />
      </div>

      <Button
        className="w-full bg-citrus-orange hover:bg-citrus-coral text-white rounded-xl py-4 h-auto text-sm font-medium touch-manipulation"
        disabled={selectedServices.length === 0}
        onClick={onNext}
      >
        Continue
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
