
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GooglePlacesAutocomplete from "@/components/common/GooglePlacesAutocomplete";

interface AddressComponents {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ConsultationFormProps {
  formData: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressSelected: (address: AddressComponents) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function ConsultationForm({
  formData,
  onInputChange,
  onPhoneChange,
  onAddressSelected,
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

        <div>
          <div className="relative">
            <GooglePlacesAutocomplete
              onPlaceSelected={onAddressSelected}
              defaultValue={formData.address}
              className="consultation-input w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-white/10 text-white hover:bg-white/5"
        >
          Back
        </Button>
        <Button
          className="bg-citrus-orange hover:bg-citrus-coral text-white"
          onClick={onSubmit}
        >
          Schedule Consultation
        </Button>
      </div>
    </>
  );
}
