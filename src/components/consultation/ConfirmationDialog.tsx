
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
  selectedDate: Date;
  selectedTime: string;
  serviceAddress: AddressComponents;
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
  const formattedAddress = `${serviceAddress.street}${serviceAddress.unit ? ` ${serviceAddress.unit}` : ''}, ${serviceAddress.city}, ${serviceAddress.state} ${serviceAddress.zipCode}`;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 dark-consultation glass-effect">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            You have been scheduled!
          </h2>
          <p className="text-white/70">
            We're looking forward to helping you get organized.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-sm font-medium text-white/50 mb-1">Selected Services</h3>
            <p className="text-white">
              {selectedServices.map(id => serviceNames[id]).join(", ")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white/50 mb-1">Service Location</h3>
            <p className="text-white">{formattedAddress}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white/50 mb-1">Appointment Time</h3>
            <p className="text-white">
              {format(selectedDate, "MMMM d, yyyy")} at {selectedTime}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white/50 mb-1">Contact Information</h3>
            <div className="text-white space-y-1">
              <p>{contactInfo.fullName}</p>
              <p>{contactInfo.phone}</p>
              <p>{contactInfo.email}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-white/70 mb-6">
            Thank you for choosing Citrus Closets!
          </p>
          <Button 
            onClick={onClose}
            className="bg-citrus-orange hover:bg-citrus-coral text-white rounded-xl py-6 h-auto text-base font-medium px-8"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
