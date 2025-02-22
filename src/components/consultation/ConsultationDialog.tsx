
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ServiceSelection } from "./ServiceSelection";
import { DateTimeSelection } from "./DateTimeSelection";
import { ServiceAddressForm } from "./ServiceAddressForm";
import { ConsultationForm } from "./ConsultationForm";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { toast } from "sonner";

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
  const [step, setStep] = React.useState<'services' | 'datetime' | 'service-address' | 'contact'>('services');
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [serviceAddress, setServiceAddress] = React.useState("");
  const [selectedServiceAddress, setSelectedServiceAddress] = React.useState<AddressComponents | null>(null);
  const [formData, setFormData] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });
  const [selectedContactAddress, setSelectedContactAddress] = React.useState<AddressComponents | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const [isAddressSelecting, setIsAddressSelecting] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setStep('services');
    setSelectedServices([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setServiceAddress("");
    setSelectedServiceAddress(null);
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
    });
    setSelectedContactAddress(null);
  };

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

  const handleServiceAddressSelected = (address: AddressComponents) => {
    setIsAddressSelecting(true);
    startTransition(() => {
      setSelectedServiceAddress(address);
      const formattedAddress = `${address.street}${address.unit ? ` ${address.unit}` : ''}, ${address.city}, ${address.state} ${address.zipCode}`;
      setServiceAddress(formattedAddress);
      setTimeout(() => {
        setIsAddressSelecting(false);
      }, 150);
    });
  };

  const handleContactAddressSelected = (address: AddressComponents) => {
    setIsAddressSelecting(true);
    startTransition(() => {
      setSelectedContactAddress(address);
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
      if (!open) {
        resetForm();
      }
      onOpenChange(open);
    }
  };

  const handleSubmitForm = () => {
    if (!selectedServiceAddress) {
      toast.error("Please select a valid service address");
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error("Please select a valid date and time");
      return;
    }

    setShowConfirmation(true);
    onOpenChange(false);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    resetForm();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent 
          ref={dialogRef}
          className="max-w-lg p-0 overflow-hidden dark-consultation glass-effect"
          onPointerDownOutside={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('.pac-container')) {
              e.preventDefault();
            }
          }}
        >
          <div className="p-4">
            {step === 'services' ? (
              <ServiceSelection
                selectedServices={selectedServices}
                onToggleService={toggleService}
                onNext={() => setStep('datetime')}
                onCancel={() => onOpenChange(false)}
              />
            ) : step === 'datetime' ? (
              <DateTimeSelection
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateSelect={setSelectedDate}
                onTimeSelect={setSelectedTime}
                onBack={() => setStep('services')}
                onNext={() => setStep('service-address')}
              />
            ) : step === 'service-address' ? (
              <ServiceAddressForm
                address={serviceAddress}
                onAddressSelected={handleServiceAddressSelected}
                onBack={() => setStep('datetime')}
                onNext={() => setStep('contact')}
              />
            ) : (
              <ConsultationForm
                formData={formData}
                onInputChange={handleInputChange}
                onPhoneChange={handlePhoneChange}
                onBack={() => setStep('service-address')}
                onSubmit={handleSubmitForm}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={showConfirmation}
        onClose={handleConfirmationClose}
        selectedServices={selectedServices}
        selectedDate={selectedDate!}
        selectedTime={selectedTime!}
        serviceAddress={selectedServiceAddress!}
        contactInfo={{
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
        }}
      />
    </>
  );
}
