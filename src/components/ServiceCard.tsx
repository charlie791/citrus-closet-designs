
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  icon: string;
  href: string;
}

const ServiceCard = ({ title, icon, href }: ServiceCardProps) => {
  return (
    <Link 
      to={href}
      className="block group relative p-6 bg-white/20 rounded-lg overflow-hidden border border-white/40 backdrop-blur-sm transition-all duration-300 
        hover:shadow-lg hover:bg-white/30 hover:-translate-y-0.5"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 text-[#999B98] transition-colors duration-300 group-hover:text-citrus-orange [&_svg]:w-full [&_svg]:h-full [&_path]:fill-current [&_polygon]:fill-current [&_rect]:fill-current [&_g]:fill-current">
          <img
            src={icon}
            alt={title}
            className="w-full h-full"
          />
        </div>
        <h3 className="text-sm font-medium text-citrus-charcoal text-center">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default ServiceCard;

