
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ContactInfo {
  fullName: string;
  phone: string;
  email: string;
}

interface ContactStepProps {
  contact: ContactInfo;
  onBack: () => void;
  onSubmit: (contact: ContactInfo) => void;
}

const ContactStep = ({
  contact: initialContact,
  onBack,
  onSubmit,
}: ContactStepProps) => {
  const [contact, setContact] = useState<ContactInfo>(initialContact);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfo, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ContactInfo, string>> = {};
    
    if (contact.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name";
    }
    
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(contact.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(contact);
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  return (
    <div className="p-6 md:p-10 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Almost Done!</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Full Name"
            value={contact.fullName}
            onChange={(e) => {
              setContact((prev) => ({ ...prev, fullName: e.target.value }));
              setErrors((prev) => ({ ...prev, fullName: "" }));
            }}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
          {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <Input
            placeholder="Phone Number"
            value={contact.phone}
            onChange={(e) => {
              const formatted = formatPhone(e.target.value);
              setContact((prev) => ({ ...prev, phone: formatted }));
              setErrors((prev) => ({ ...prev, phone: "" }));
            }}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            maxLength={14}
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email Address"
            value={contact.email}
            onChange={(e) => {
              setContact((prev) => ({ ...prev, email: e.target.value }));
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 border-white/10 text-white hover:bg-white/5"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-citrus-orange hover:bg-citrus-coral"
          >
            Book Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactStep;
