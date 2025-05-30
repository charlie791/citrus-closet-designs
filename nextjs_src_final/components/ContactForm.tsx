
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GooglePlacesAutocomplete from "@/components/common/GooglePlacesAutocomplete";
import { toast } from "sonner";
import { Mail } from "lucide-react";

interface AddressComponents {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });
  const [selectedAddress, setSelectedAddress] = useState<AddressComponents | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({
      ...prev,
      phone: formatted,
    }));
  };

  const handleAddressSelected = (address: AddressComponents) => {
    setSelectedAddress(address);
    const formattedAddress = `${address.street}${address.unit ? ` ${address.unit}` : ''}, ${address.city}, ${address.state} ${address.zipCode}`;
    setFormData((prev) => ({
      ...prev,
      address: formattedAddress,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.fullName.trim()) {
      toast.error("Please enter your name");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid phone number");
      setIsSubmitting(false);
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a valid address from the dropdown");
      setIsSubmitting(false);
      return;
    }

    // Here you would typically send the form data to your backend
    console.log("Form submitted:", { ...formData, fullAddress: selectedAddress });
    toast.success("Thank you for contacting us! We'll get back to you soon.");

    // Reset form
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
    });
    setSelectedAddress(null);
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-citrus-peach/20 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-4">
            Get in Touch
          </h2>
          <p className="text-citrus-charcoal/70 mb-8">
            Have questions about our services? Fill out the form below and we'll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-citrus-charcoal mb-2">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-citrus-charcoal mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full"
                  placeholder="(123) 456-7890"
                  maxLength={14}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-citrus-charcoal mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-citrus-charcoal mb-2">
                  Street Address
                </label>
                <GooglePlacesAutocomplete
                  onPlaceSelected={handleAddressSelected}
                  defaultValue={formData.address}
                  className="w-full"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-citrus-orange hover:bg-citrus-coral"
              disabled={isSubmitting}
            >
              <Mail className="mr-2 h-5 w-5" />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
