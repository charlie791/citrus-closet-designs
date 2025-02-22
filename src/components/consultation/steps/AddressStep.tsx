
import { Button } from "@/components/ui/button";
import { useState } from "react";
import GooglePlacesAutocomplete from "../GooglePlacesAutocomplete";

interface AddressData {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressStepProps {
  address: AddressData;
  onBack: () => void;
  onNext: (address: AddressData) => void;
}

const AddressStep = ({ address: initialAddress, onBack, onNext }: AddressStepProps) => {
  const [address, setAddress] = useState<AddressData>(initialAddress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.street && address.city && address.state && address.zipCode) {
      onNext(address);
    }
  };

  const formatDisplayAddress = (addr: AddressData): string => {
    const parts = [addr.street];
    if (addr.unit) parts.push(addr.unit);
    if (addr.city) parts.push(addr.city);
    if (addr.state) parts.push(addr.state);
    if (addr.zipCode) parts.push(addr.zipCode);
    return parts.join(", ");
  };

  return (
    <div className="p-6 md:p-10 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Service Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <GooglePlacesAutocomplete
          onPlaceSelected={(addressComponents) => setAddress(addressComponents)}
          defaultValue={formatDisplayAddress(address)}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-citrus-orange hover:bg-citrus-coral"
            disabled={!address.street || !address.city || !address.state || !address.zipCode}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressStep;
