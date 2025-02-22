
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GooglePlacesAutocomplete from "../GooglePlacesAutocomplete";
import { toast } from "sonner";

interface AddressComponents {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressStepProps {
  address: string;
  onBack: () => void;
  onNext: (address: string) => void;
}

const AddressStep = ({ address, onBack, onNext }: AddressStepProps) => {
  const [selectedAddress, setSelectedAddress] = useState<AddressComponents | null>(null);
  const [formattedAddress, setFormattedAddress] = useState(address);
  const [isAddressSelected, setIsAddressSelected] = useState(false);

  const handleAddressSelected = (address: AddressComponents) => {
    setSelectedAddress(address);
    const formattedAddr = `${address.street}${address.unit ? ` ${address.unit}` : ''}, ${address.city}, ${address.state} ${address.zipCode}`;
    setFormattedAddress(formattedAddr);
    setIsAddressSelected(true);
    toast.success("Address selected");
  };

  const handleNext = () => {
    if (!selectedAddress || !formattedAddress) {
      toast.error("Please select a valid address from the dropdown");
      return;
    }
    onNext(formattedAddress);
  };

  return (
    <div className="p-6 md:p-10 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Service Address</h2>
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-white/90 mb-2">
              Street Address
            </label>
            <GooglePlacesAutocomplete
              onPlaceSelected={handleAddressSelected}
              defaultValue={formattedAddress}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>

          {selectedAddress && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  City
                </label>
                <Input 
                  value={selectedAddress.city}
                  readOnly
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  State
                </label>
                <Input 
                  value={selectedAddress.state}
                  readOnly
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
          )}
        </div>

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
            type="button"
            variant="default"
            onClick={handleNext}
            disabled={!isAddressSelected}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressStep;
