
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "../GooglePlacesAutocomplete";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

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
  const [confirmedAddress, setConfirmedAddress] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const hasRequiredFields = Boolean(
      address.street && 
      address.city && 
      address.state && 
      address.zipCode
    );
    setIsValid(hasRequiredFields);
  }, [address]);

  const handlePlaceSelected = (selectedAddress: AddressData) => {
    console.log("Address selected:", selectedAddress);
    setAddress(selectedAddress);
    
    if (selectedAddress.street && selectedAddress.city && 
        selectedAddress.state && selectedAddress.zipCode) {
      const formattedAddress = formatDisplayAddress(selectedAddress);
      setConfirmedAddress(formattedAddress);
      toast.success("Address selected");
    } else {
      setConfirmedAddress("");
      toast.error("Please select a valid address");
    }
  };

  const formatDisplayAddress = (addr: AddressData): string => {
    if (!addr.street) return "";
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
      <form onSubmit={(e) => {
        e.preventDefault();
        if (isValid) {
          onNext(address);
        }
      }} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Search for your address
            </label>
            <GooglePlacesAutocomplete
              onPlaceSelected={handlePlaceSelected}
              defaultValue={formatDisplayAddress(address)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirmed Service Address
            </label>
            <Input
              type="text"
              value={confirmedAddress}
              readOnly
              className="bg-white/5 border-white/10 text-white cursor-not-allowed"
              placeholder="Select an address above to confirm"
            />
          </div>
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
            type="submit"
            className="flex-1 bg-citrus-orange hover:bg-citrus-coral"
            disabled={!isValid || !confirmedAddress}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressStep;
