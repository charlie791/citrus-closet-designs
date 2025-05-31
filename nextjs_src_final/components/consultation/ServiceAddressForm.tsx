"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
// import GooglePlacesAutocomplete from "@/components/common/GooglePlacesAutocomplete"; // Commented out
import { Input } from "@/components/ui/input"; // Added for manual input

interface AddressComponents {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ServiceAddressFormProps {
  address: string; // This will now be the manually entered address string
  onAddressSelected: (address: AddressComponents) => void; // This might need to be adjusted or used differently
  onBack: () => void;
  onNext: () => void;
}

export function ServiceAddressForm({
  address,
  onAddressSelected, // Keep for now, but its usage will change
  onBack,
  onNext
}: ServiceAddressFormProps) {
  // Temporary state for manual input if needed, or assume `address` prop is directly manipulated by parent
  const [manualAddress, setManualAddress] = React.useState(address);

  React.useEffect(() => {
    setManualAddress(address);
  }, [address]);

  const handleManualAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualAddress(e.target.value);
    // If we need to parse this into AddressComponents, it would happen here or on submit
    // For now, we'll assume the parent component handles the raw string or this component will later parse it.
    // To fulfill the onAddressSelected prop for now, we can make a simple mock structure.
    // This part needs to be thought out based on how form submission will work without GooglePlaces.
    onAddressSelected({ street: e.target.value, city: '', state: '', zipCode: '' });
  };


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
            {/* <GooglePlacesAutocomplete
              onPlaceSelected={onAddressSelected}
              defaultValue={address}
              className="consultation-input w-full"
            /> */}
            <Input
              type="text"
              placeholder="Enter service address"
              value={manualAddress}
              onChange={handleManualAddressChange}
              className="consultation-input w-full h-12 md:h-14 text-sm md:text-base"
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
          disabled={!manualAddress.trim()} // Changed to check manualAddress
        >
          Continue
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </>
  );
}
