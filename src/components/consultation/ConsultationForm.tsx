
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
      <h2 className="text-2xl font-semibold text-white mb-2">
        Almost Done!
      </h2>
      <p className="text-white/70 mb-6">
        Enter your contact info to finalize your appointment.
      </p>

      <div className="space-y-6">
        <div>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={onInputChange}
            className="consultation-input w-full"
            placeholder="Full Name"
          />
        </div>

        <div>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onPhoneChange}
            className="consultation-input w-full"
            placeholder="Phone Number"
            maxLength={14}
          />
        </div>

        <div>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange}
            className="consultation-input w-full"
            placeholder="Email Address"
          />
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 border-white/10 text-white hover:bg-white/5 rounded-xl py-6 h-auto text-base font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
        <Button
          className="flex-1 bg-citrus-orange hover:bg-citrus-coral text-white rounded-xl py-6 h-auto text-base font-medium"
          onClick={onSubmit}
        >
          Schedule Consultation
        </Button>
      </div>
    </>
  );
}
