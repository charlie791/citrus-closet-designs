
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { User, Phone, Mail } from "lucide-react";

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
        Contact Information
      </h2>
      <p className="text-white/70 mb-6">
        Please provide your details so we can get in touch with you.
      </p>

      <div className="space-y-6">
        <div className="input-container">
          <label htmlFor="fullName" className="input-label">Full Name</label>
          <div className="relative">
            <User className="input-icon" size={20} />
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={onInputChange}
              className="consultation-input w-full"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="phone" className="input-label">Phone Number</label>
          <div className="relative">
            <Phone className="input-icon" size={20} />
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onPhoneChange}
              className="consultation-input w-full"
              placeholder="(555) 555-5555"
              maxLength={14}
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="email" className="input-label">Email Address</label>
          <div className="relative">
            <Mail className="input-icon" size={20} />
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onInputChange}
              className="consultation-input w-full"
              placeholder="Enter your email address"
            />
          </div>
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
