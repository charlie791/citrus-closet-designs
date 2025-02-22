import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface AddressStepProps {
  address: Address;
  onBack: () => void;
  onNext: (address: Address) => void;
}

const AddressStep = ({ address: initialAddress, onBack, onNext }: AddressStepProps) => {
  const [address, setAddress] = useState<Address>(initialAddress);
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Address, string>> = {};
    
    if (!address.street.trim()) {
      newErrors.street = "Street address is required";
    }
    if (!address.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!address.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!address.zipCode.trim() || address.zipCode.length !== 5) {
      newErrors.zipCode = "Valid ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(address);
    }
  };

  return (
    <div className="p-6 md:p-10 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Service Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Street Address"
            value={address.street}
            onChange={(e) => {
              setAddress((prev) => ({ ...prev, street: e.target.value }));
              setErrors((prev) => ({ ...prev, street: "" }));
            }}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
          {errors.street && <p className="text-red-400 text-sm mt-1">{errors.street}</p>}
        </div>
        
        <Input
          placeholder="Apartment, suite, etc. (optional)"
          value={address.unit || ""}
          onChange={(e) => setAddress((prev) => ({ ...prev, unit: e.target.value }))}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="City"
              value={address.city}
              onChange={(e) => {
                setAddress((prev) => ({ ...prev, city: e.target.value }));
                setErrors((prev) => ({ ...prev, city: "" }));
              }}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
            {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <Input
              placeholder="State"
              value={address.state}
              onChange={(e) => {
                setAddress((prev) => ({ ...prev, state: e.target.value }));
                setErrors((prev) => ({ ...prev, state: "" }));
              }}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
            {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
          </div>
        </div>

        <div>
          <Input
            placeholder="ZIP Code"
            value={address.zipCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 5);
              setAddress((prev) => ({ ...prev, zipCode: value }));
              setErrors((prev) => ({ ...prev, zipCode: "" }));
            }}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            maxLength={5}
          />
          {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
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
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressStep;
