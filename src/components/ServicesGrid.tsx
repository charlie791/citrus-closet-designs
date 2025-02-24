
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Custom Closets",
    icon: "/svg-cat/1 Custom closets.svg",
    href: "/services/custom-closets"
  },
  {
    title: "Garage Storage",
    icon: "/svg-cat/2 Garage storage.svg",
    href: "/services/garage-storage"
  },
  {
    title: "Home Office",
    icon: "/svg-cat/3 Home office.svg",
    href: "/services/home-office"
  },
  {
    title: "Laundry Storage",
    icon: "/svg-cat/4 Laundry storage.svg",
    href: "/services/pantry-and-laundry"
  },
  {
    title: "Craft Rooms",
    icon: "/svg-cat/5 Craft rooms.svg",
    href: "/services/other-solutions"
  },
  {
    title: "Entertainment",
    icon: "/svg-cat/6 Entertainment centers.svg",
    href: "/services/other-solutions"
  },
  {
    title: "Wall Units",
    icon: "/svg-cat/7 Wall units.svg",
    href: "/services/other-solutions"
  },
  {
    title: "Wine Pantry",
    icon: "/svg-cat/8 Wine pantry.svg",
    href: "/services/pantry-and-laundry"
  }
];

const ServicesGrid = () => {
  return (
    <div className="relative z-20 -mt-16 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white/30 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-3 animate-fade-in [animation-delay:1.1s] opacity-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesGrid;

