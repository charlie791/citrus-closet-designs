"use client";
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ServiceSelection } from "./ServiceSelection"; // Adjusted path if index.tsx is ServiceSelection.tsx
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
    address: "", // This is for contact form, might be different from service address
  });
  // const [selectedContactAddress, setSelectedContactAddress] = React.useState<AddressComponents | null>(null); // Not used in provided code
  const [isPending, startTransition] = React.useTransition(); // isPending not used in provided code
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
    // setSelectedContactAddress(null); // Not used
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
      setServiceAddress(formattedAddress); // This updates the input field in ServiceAddressForm
      setTimeout(() => {
        setIsAddressSelecting(false);
      }, 150);
    });
  };

  // handleContactAddressSelected is not used in the provided logic, can be removed if not needed
  // const handleContactAddressSelected = (address: AddressComponents) => { ... }

  const handleOpenChange = (open: boolean) => {
    if (!isAddressSelecting && !isPending) { // isPending check might be redundant if not used
      if (!open) {
        resetForm();
      }
      onOpenChange(open);
    }
  };

  const handleSubmitForm = () => {
    // Assuming formData.address is for contact, not service location.
    // Validation for formData fields happens in ContactForm component itself.
    if (!selectedServiceAddress) {
      toast.error("Please select a valid service address");
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error("Please select a valid date and time");
      return;
    }

    // Check contact form data
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setShowConfirmation(true);
    onOpenChange(false); // Close the main dialog
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
            // Allow clicks on Google Places Autocomplete suggestions
            if (target.closest('.pac-container')) {
              e.preventDefault();
            }
          }}
        >
          <div className="p-4"> {/* Added padding that was in original individual steps */}
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
                address={serviceAddress} // Pass the string address for the input field
                onAddressSelected={handleServiceAddressSelected} // Callback for when Google Place is selected
                onBack={() => setStep('datetime')}
                onNext={() => setStep('contact')}
              />
            ) : ( // step === 'contact'
              <ConsultationForm
                formData={formData}
                onInputChange={handleInputChange}
                onPhoneChange={handlePhoneChange}
                onBack={() => setStep('service-address')}
                onSubmit={handleSubmitForm} // This now triggers final validation and confirmation
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {selectedDate && selectedTime && selectedServiceAddress && ( /* Ensure all required data is present for ConfirmationDialog */
        <ConfirmationDialog
          open={showConfirmation}
          onClose={handleConfirmationClose}
          selectedServices={selectedServices}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          serviceAddress={selectedServiceAddress}
          contactInfo={{
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
          }}
        />
      )}
    </>
  );
}
