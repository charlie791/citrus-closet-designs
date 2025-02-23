
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GooglePlacesAutocomplete from "@/components/common/GooglePlacesAutocomplete";

interface AddressComponents {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ServiceAddressFormProps {
  address: string;
  onAddressSelected: (address: AddressComponents) => void;
  onBack: () => void;
  onNext: () => void;
}

export function ServiceAddressForm({
  address,
  onAddressSelected,
  onBack,
  onNext
}: ServiceAddressFormProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold text-white mb-2">
        Service Address
      </h2>
      <p className="text-white/70 mb-6">
        Where would you like us to perform the service?
      </p>

      <div className="space-y-6">
        <div>
          <div className="relative">
            <GooglePlacesAutocomplete
              onPlaceSelected={onAddressSelected}
              defaultValue={address}
              className="consultation-input w-full"
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
          onClick={onNext}
          disabled={!address}
        >
          Continue
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </>
  );
}
