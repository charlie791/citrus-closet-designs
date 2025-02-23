
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
            onChange={onInputChange}
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
            onChange={onPhoneChange}
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
            onChange={onInputChange}
            className="w-full"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-citrus-charcoal mb-1">
            Street Address
          </label>
          <div className="relative">
            <GooglePlacesAutocomplete
              onPlaceSelected={onAddressSelected}
              defaultValue={formData.address}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          className="bg-citrus-orange hover:bg-citrus-coral"
          onClick={onSubmit}
        >
          Schedule Consultation
        </Button>
      </div>
    </>
  );
}
