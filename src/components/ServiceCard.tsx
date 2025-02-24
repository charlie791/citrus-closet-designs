
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  image: string;
  href: string;
}

const ServiceCard = ({ title, image, href }: ServiceCardProps) => {
  return (
    <Link 
      to={href}
      className="block group relative bg-gradient-to-b from-white/15 to-white/5 rounded-lg overflow-hidden border border-white/25 backdrop-blur-sm transition-all duration-300 
        shadow-[0_2px_8px_-1px_rgba(0,0,0,0.1),0_0_4px_-1px_rgba(255,255,255,0.1)] 
        hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15),0_0_8px_-1px_rgba(255,255,255,0.2)]
        hover:bg-white/20 hover:-translate-y-0.5"
    >
      <div className="aspect-square overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-lg font-semibold text-white text-center px-3 drop-shadow-lg">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;

