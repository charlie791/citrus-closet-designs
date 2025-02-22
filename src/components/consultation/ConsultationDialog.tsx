
import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ZipCodeStep from "./steps/ZipCodeStep";
import ServiceSelectionStep from "./steps/ServiceSelectionStep";
import AppointmentStep from "./steps/AppointmentStep";
import ContactStep from "./steps/ContactStep";

export type ConsultationFormData = {
  zipCode: string;
  services: string[];
  appointmentDate: Date | null;
  appointmentTime: string;
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
    contact: {
      fullName: "",
      phone: "",
      email: "",
    },
  });

  const handleStepChange = useCallback((step: number) => {
    console.log("Changing to step:", step);
    setCurrentStep(step);
  }, []);

  const steps = [
    <ZipCodeStep
      key="zip"
      value={formData.zipCode}
      onNext={(zipCode) => {
        setFormData((prev) => ({ ...prev, zipCode }));
        handleStepChange(1);
      }}
    />,
    <ServiceSelectionStep
      key="services"
      selected={formData.services}
      onBack={() => handleStepChange(0)}
      onNext={(services) => {
        setFormData((prev) => ({ ...prev, services }));
        handleStepChange(2);
      }}
    />,
    <AppointmentStep
      key="appointment"
      date={formData.appointmentDate}
      time={formData.appointmentTime}
      onBack={() => handleStepChange(1)}
      onNext={(date, time) => {
        setFormData((prev) => ({ ...prev, appointmentDate: date, appointmentTime: time }));
        handleStepChange(3);
      }}
    />,
    <ContactStep
      key="contact"
      contact={formData.contact}
      onBack={() => handleStepChange(2)}
      onSubmit={(contact) => {
        setFormData((prev) => ({ ...prev, contact }));
        console.log("Form submitted:", { ...formData, contact });
        onClose();
      }}
    />,
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1F2C]/95 backdrop-blur-lg border-white/10 p-0 gap-0 max-w-md mx-auto w-full">
        <DialogTitle className="sr-only">Schedule Consultation</DialogTitle>
        <DialogDescription className="sr-only">
          Schedule a consultation with our team to discuss your storage needs.
        </DialogDescription>
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
