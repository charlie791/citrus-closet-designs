import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import GooglePlacesAutocomplete from "@/components/common/GooglePlacesAutocomplete";

interface Service {
  id: string;
  title: string;
  description: string;
}

interface AddressComponents {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

const services: Service[] = [
  {
    id: "custom-closets",
    title: "Custom Closets",
    description: "Walk-in closets, reach-in closets, and wardrobe solutions",
  },
  {
    id: "pantry-laundry",
    title: "Pantry & Laundry",
    description: "Organized storage for your kitchen and laundry spaces",
  },
  {
    id: "garage-storage",
    title: "Garage Storage",
    description: "Custom garage organization and storage systems",
  },
  {
    id: "home-office",
    title: "Home Office",
    description: "Productive workspace solutions and organization",
  },
  {
    id: "other-solutions",
    title: "Other Solutions",
    description: "Entertainment centers, murphy beds, and more",
  },
];

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
  const [isAddressSelecting, setIsAddressSelecting] = React.useState(false);

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
    setSelectedAddress(address);
    const formattedAddress = `${address.street}${address.unit ? ` ${address.unit}` : ''}, ${address.city}, ${address.state} ${address.zipCode}`;
    setFormData((prev) => ({
      ...prev,
      address: formattedAddress,
    }));
    setTimeout(() => {
      setIsAddressSelecting(false);
    }, 100);
  };

  const handleOpenChange = (open: boolean) => {
    if (!isAddressSelecting) {
      onOpenChange(open);
    }
  };

  const handleNext = () => {
    if (step === 'services') {
      setStep('contact');
    }
  };

  const handleBack = () => {
    setStep('services');
  };

  const renderServiceSelection = () => (
    <>
      <h2 className="text-2xl font-semibold text-citrus-charcoal mb-2">
        Select Your Areas of Interest
      </h2>
      <p className="text-citrus-charcoal/70 mb-6">
        Choose the areas you'd like to organize and improve.
      </p>

      <div className="grid gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => toggleService(service.id)}
            className={cn(
              "flex items-start p-4 rounded-lg border-2 text-left transition-all duration-200",
              selectedServices.includes(service.id)
                ? "border-citrus-orange bg-citrus-orange/5"
                : "border-gray-200 hover:border-citrus-orange/50"
            )}
          >
            <div className="flex-1">
              <h3 className="font-medium text-citrus-charcoal">{service.title}</h3>
              <p className="text-sm text-citrus-charcoal/70">{service.description}</p>
            </div>
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
              selectedServices.includes(service.id)
                ? "border-citrus-orange bg-citrus-orange text-white"
                : "border-gray-300"
            )}>
              {selectedServices.includes(service.id) && (
                <Check className="w-3 h-3" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button
          className="bg-citrus-orange hover:bg-citrus-coral"
          disabled={selectedServices.length === 0}
          onClick={handleNext}
        >
          <span>Next Step</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );

  const renderContactForm = () => (
    <>
      <h2 className="text-2xl font-semibold text-citrus-charcoal mb-2">
        Contact Information
      </h2>
      <p className="text-citrus-charcoal/70 mb-6">
        Please provide your details so we can get in touch with you.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-citrus-charcoal mb-1">
            Full Name
          </label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-citrus-charcoal mb-1">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            className="w-full"
            placeholder="(123) 456-7890"
            maxLength={14}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-citrus-charcoal mb-1">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-citrus-charcoal mb-1">
            Street Address
          </label>
          <GooglePlacesAutocomplete
            onPlaceSelected={handleAddressSelected}
            defaultValue={formData.address}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          className="bg-citrus-orange hover:bg-citrus-coral"
          onClick={() => {
            console.log("Form submitted:", { selectedServices, formData, selectedAddress });
          }}
        >
          Schedule Consultation
        </Button>
      </div>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="p-6 bg-white">
          {step === 'services' ? renderServiceSelection() : renderContactForm()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
