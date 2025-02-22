
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ZipCodeStepProps {
  value: string;
  onNext: (zipCode: string) => void;
}

const ZipCodeStep = ({ value, onNext }: ZipCodeStepProps) => {
  const [zipCode, setZipCode] = useState(value);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length !== 5) {
      setError("Please enter a valid ZIP code");
      return;
    }
    onNext(zipCode);
  };

  return (
    <div className="p-6 md:p-10 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Let's Get You Organized</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          <Input
            type="text"
            placeholder="Enter ZIP Code"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5));
              setError("");
            }}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
            maxLength={5}
          />
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
        <Button
          type="submit"
          className="w-full bg-citrus-orange hover:bg-citrus-coral text-white py-6 text-lg"
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default ZipCodeStep;
