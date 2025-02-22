
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ZipCodeStep from "./steps/ZipCodeStep";
import ServiceSelectionStep from "./steps/ServiceSelectionStep";
import AppointmentStep from "./steps/AppointmentStep";
import AddressStep from "./steps/AddressStep";
import ContactStep from "./steps/ContactStep";

export type ConsultationFormData = {
  zipCode: string;
  services: string[];
  appointmentDate: Date | null;
  appointmentTime: string;
  address: {
    street: string;
    unit?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    fullName: string;
    phone: string;
    email: string;
  };
};

export const ConsultationDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ConsultationFormData>({
    zipCode: "",
    services: [],
    appointmentDate: null,
    appointmentTime: "",
    address: {
      street: "",
      unit: "",
      city: "",
      state: "",
      zipCode: "",
    },
    contact: {
      fullName: "",
      phone: "",
      email: "",
    },
  });

  const steps = [
    <ZipCodeStep
      key="zip"
      value={formData.zipCode}
      onNext={(zipCode) => {
        setFormData((prev) => ({ ...prev, zipCode }));
        setCurrentStep(1);
      }}
    />,
    <ServiceSelectionStep
      key="services"
      selected={formData.services}
      onBack={() => setCurrentStep(0)}
      onNext={(services) => {
        setFormData((prev) => ({ ...prev, services }));
        setCurrentStep(2);
      }}
    />,
    <AppointmentStep
      key="appointment"
      date={formData.appointmentDate}
      time={formData.appointmentTime}
      onBack={() => setCurrentStep(1)}
      onNext={(date, time) => {
        setFormData((prev) => ({ ...prev, appointmentDate: date, appointmentTime: time }));
        setCurrentStep(3);
      }}
    />,
    <AddressStep
      key="address"
      address={formData.address}
      onBack={() => setCurrentStep(2)}
      onNext={(address) => {
        setFormData((prev) => ({ ...prev, address }));
        setCurrentStep(4);
      }}
    />,
    <ContactStep
      key="contact"
      contact={formData.contact}
      onBack={() => setCurrentStep(3)}
      onSubmit={(contact) => {
        setFormData((prev) => ({ ...prev, contact }));
        // Here you would typically submit the form data
        console.log("Form submitted:", { ...formData, contact });
        onClose();
      }}
    />,
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1F2C]/95 backdrop-blur-lg border-white/10 p-0 gap-0 max-w-md mx-auto w-full">
        <DialogTitle className="sr-only">Schedule Consultation</DialogTitle>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        {steps[currentStep]}
      </DialogContent>
    </Dialog>
  );
};
