
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

interface ConsultationFormProps {
  formData: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function ConsultationForm({
  formData,
  onInputChange,
  onPhoneChange,
  onBack,
  onSubmit
}: ConsultationFormProps) {
  return (
    <>
      <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
        Almost Done!
      </h2>
      <p className="text-xs md:text-sm text-white/70 mb-4 md:mb-6">
        Enter your contact info to finalize your appointment.
      </p>

      <div className="space-y-4 md:space-y-6">
        <div>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onInputChange}
            className="consultation-input w-full h-12 md:h-14 text-sm md:text-base"
            placeholder="Full Name"
            autoComplete="name"
          />
        </div>

        <div>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onPhoneChange}
            className="consultation-input w-full h-12 md:h-14 text-sm md:text-base"
            placeholder="Phone Number"
            maxLength={14}
            autoComplete="tel"
          />
        </div>

        <div>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange}
            className="consultation-input w-full h-12 md:h-14 text-sm md:text-base"
            placeholder="Email Address"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-2 md:gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full md:flex-1 border-white/10 text-white hover:bg-white/5 rounded-xl py-4 md:py-6 h-auto text-sm md:text-base font-medium touch-manipulation"
        >
          <ArrowLeft className="h-4 md:h-5 w-4 md:w-5 mr-2" />
          Back
        </Button>
        <Button
          className="w-full md:flex-1 bg-citrus-orange hover:bg-citrus-coral text-white rounded-xl py-4 md:py-6 h-auto text-sm md:text-base font-medium touch-manipulation"
          onClick={onSubmit}
        >
          Schedule Consultation
        </Button>
      </div>
    </>
  );
}
