
import ServiceCard from "./ServiceCard";
import CustomClosetIcon from "./icons/CustomClosetIcon";
import GarageStorageIcon from "./icons/GarageStorageIcon";
import HomeOfficeIcon from "./icons/HomeOfficeIcon";
import LaundryStorageIcon from "./icons/LaundryStorageIcon";
import CraftRoomIcon from "./icons/CraftRoomIcon";
import EntertainmentIcon from "./icons/EntertainmentIcon";
import WallUnitIcon from "./icons/WallUnitIcon";
import WinePantryIcon from "./icons/WinePantryIcon";

const services = [
  {
    title: "Custom Closets",
    Icon: CustomClosetIcon,
    href: "/services/custom-closets"
  },
  {
    title: "Garage Storage",
    Icon: GarageStorageIcon,
    href: "/services/garage-storage"
  },
  {
    title: "Home Office",
    Icon: HomeOfficeIcon,
    href: "/services/home-office"
  },
  {
    title: "Laundry Storage",
    Icon: LaundryStorageIcon,
    href: "/services/pantry-and-laundry"
  },
  {
    title: "Craft Rooms",
    Icon: CraftRoomIcon,
    href: "/services/craft-rooms"
  },
  {
    title: "Entertainment",
    Icon: EntertainmentIcon,
    href: "/services/entertainment"
  },
  {
    title: "Wall Units",
    Icon: WallUnitIcon,
    href: "/services/wall-units"
  },
  {
    title: "Wine Pantry",
    Icon: WinePantryIcon,
    href: "/services/wine-pantry"
  }
];

const ServicesGrid = () => {
  return (
    <div className="relative z-20 -mt-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white/30 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 animate-fade-in [animation-delay:1.1s] opacity-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {services.map((service, index) => (
              <ServiceCard 
                key={index} 
                title={service.title}
                Icon={service.Icon}
                href={service.href}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;
