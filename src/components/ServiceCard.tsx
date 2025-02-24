
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const ServiceCard = ({ title, Icon, href }: ServiceCardProps) => {
  return (
    <Link 
      to={href}
      className="block group relative p-6 bg-white/20 rounded-lg overflow-hidden border border-white/40 backdrop-blur-sm transition-all duration-300 
        hover:shadow-lg hover:bg-white/30 hover:-translate-y-0.5"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16">
          <Icon className="w-full h-full text-[#999B98] transition-colors duration-300 group-hover:text-citrus-orange" />
        </div>
        <h3 className="text-sm font-medium text-citrus-charcoal text-center">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default ServiceCard;
