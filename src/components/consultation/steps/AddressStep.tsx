
import { Button } from "@/components/ui/button";
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
  const handlePlaceSelected = (addressComponents: AddressComponents) => {
    const formattedAddress = [
      addressComponents.street,
      addressComponents.unit,
      addressComponents.city,
      addressComponents.state,
      addressComponents.zipCode
    ].filter(Boolean).join(", ");
    
    if (formattedAddress) {
      toast.success("Address selected");
      onNext(formattedAddress);
    } else {
      toast.error("Please select a valid address");
    }
  };

  return (
    <div className="p-6 md:p-10 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Service Address</h2>
      <div className="space-y-6">
        <div>
          <GooglePlacesAutocomplete
            onPlaceSelected={handlePlaceSelected}
            defaultValue={address}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
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
        </div>
      </div>
    </div>
  );
};

export default AddressStep;

