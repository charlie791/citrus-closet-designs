
import { ComponentType } from "react";
import { ServiceIcon } from "./ServiceIcon";

interface Service {
  id: string;
  title: string;
  Icon: ComponentType<{ className?: string }>;
}

interface ServiceListProps {
  services: Service[];
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
}

export function ServiceList({ services, selectedServices, onToggleService }: ServiceListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {services.map((service) => (
        <ServiceIcon
          key={service.id}
          Icon={service.Icon}
          title={service.title}
          isSelected={selectedServices.includes(service.id)}
          onSelect={() => onToggleService(service.id)}
        />
      ))}
    </div>
  );
}
