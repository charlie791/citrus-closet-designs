
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ServiceSelection } from "./ServiceSelection";
import { ConsultationForm } from "./ConsultationForm";

interface AddressComponents {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConsultationDialog({ open, onOpenChange }: ConsultationDialogProps) {
  const [step, setStep] = React.useState<'services' | 'contact'>('services');
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const [formData, setFormData] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });
  const [selectedAddress, setSelectedAddress] = React.useState<AddressComponents | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const [isAddressSelecting, setIsAddressSelecting] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  const toggleService = (serviceId: string) => {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({
      ...prev,
      phone: formatted,
    }));
  };

  const handleAddressSelected = (address: AddressComponents) => {
    setIsAddressSelecting(true);
    startTransition(() => {
      setSelectedAddress(address);
      const formattedAddress = `${address.street}${address.unit ? ` ${address.unit}` : ''}, ${address.city}, ${address.state} ${address.zipCode}`;
      setFormData((prev) => ({
        ...prev,
        address: formattedAddress,
      }));
      setTimeout(() => {
        setIsAddressSelecting(false);
      }, 150);
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!isAddressSelecting && !isPending) {
      onOpenChange(open);
    }
  };

  const handleSubmitForm = () => {
    console.log("Form submitted:", { selectedServices, formData, selectedAddress });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        ref={dialogRef}
        className="max-w-2xl p-0 overflow-hidden dark-consultation glass-effect"
        onPointerDownOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('.pac-container')) {
            e.preventDefault();
          }
        }}
      >
        <div className="p-6">
          {step === 'services' ? (
            <ServiceSelection
              selectedServices={selectedServices}
              onToggleService={toggleService}
              onNext={() => setStep('contact')}
              onCancel={() => onOpenChange(false)}
            />
          ) : (
            <ConsultationForm
              formData={formData}
              onInputChange={handleInputChange}
              onPhoneChange={handlePhoneChange}
              onAddressSelected={handleAddressSelected}
              onBack={() => setStep('services')}
              onSubmit={handleSubmitForm}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
