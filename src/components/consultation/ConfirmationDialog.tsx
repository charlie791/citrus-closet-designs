
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { format } from "date-fns";

interface AddressComponents {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  selectedServices: string[];
  selectedDate: Date | null;
  selectedTime: string | null;
  serviceAddress: AddressComponents | null;
  contactInfo: {
    fullName: string;
    phone: string;
    email: string;
  };
}

const serviceNames: Record<string, string> = {
  "custom-closets": "Custom Closets",
  "garage-storage": "Garage Storage",
  "home-solutions": "Home Solutions",
};

export function ConfirmationDialog({
  open,
  onClose,
  selectedServices,
  selectedDate,
  selectedTime,
  serviceAddress,
  contactInfo,
}: ConfirmationDialogProps) {
  if (!selectedDate || !selectedTime || !serviceAddress) {
    return null;
  }

  const formattedAddress = `${serviceAddress.street}${serviceAddress.unit ? ` ${serviceAddress.unit}` : ''}, ${serviceAddress.city}, ${serviceAddress.state} ${serviceAddress.zipCode}`;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-4 md:p-6 dark-consultation glass-effect max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6 md:mb-8">
          <div className="mx-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 md:h-8 md:w-8 text-green-400" />
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
            You have been scheduled!
          </h2>
          <p className="text-xs md:text-sm text-white/70">
            We're looking forward to helping you get organized.
          </p>
        </div>

        <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
          <div>
            <h3 className="text-xs md:text-sm font-medium text-white/50 mb-1">Selected Services</h3>
            <p className="text-sm md:text-base text-white">
              {selectedServices.map(id => serviceNames[id]).join(", ")}
            </p>
          </div>

          <div>
            <h3 className="text-xs md:text-sm font-medium text-white/50 mb-1">Service Location</h3>
            <p className="text-sm md:text-base text-white">{formattedAddress}</p>
          </div>

          <div>
            <h3 className="text-xs md:text-sm font-medium text-white/50 mb-1">Appointment Time</h3>
            <p className="text-sm md:text-base text-white">
              {format(selectedDate, "MMMM d, yyyy")} at {selectedTime}
            </p>
          </div>

          <div>
            <h3 className="text-xs md:text-sm font-medium text-white/50 mb-1">Contact Information</h3>
            <div className="text-sm md:text-base text-white space-y-1">
              <p>{contactInfo.fullName}</p>
              <p>{contactInfo.phone}</p>
              <p>{contactInfo.email}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs md:text-sm text-white/70 mb-4 md:mb-6">
            Thank you for choosing Citrus Closets!
          </p>
          <Button 
            onClick={onClose}
            className="w-full md:w-auto bg-citrus-orange hover:bg-citrus-coral text-white rounded-xl py-4 md:py-6 h-auto text-sm md:text-base font-medium px-6 md:px-8 touch-manipulation"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
