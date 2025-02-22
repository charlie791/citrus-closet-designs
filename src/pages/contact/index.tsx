
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GooglePlacesAutocomplete from "@/components/common/GooglePlacesAutocomplete";
import { useState } from "react";
import { toast } from "sonner";

interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
}

interface AddressComponents {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const [selectedAddress, setSelectedAddress] = useState<AddressComponents | null>(null);

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

    // Basic validation
    if (!formData.fullName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a valid address from the dropdown");
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
  };

  return (
    <PageLayout
      title="Contact Us"
      breadcrumbs={[{ label: "Contact", href: "/contact" }]}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-citrus-charcoal/70 mb-8">
          Get in touch with us to discuss your storage and organization needs. Fill out the form below and we'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
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

          <Button
            type="submit"
            className="w-full bg-citrus-orange hover:bg-citrus-coral text-white"
          >
            Send Message
          </Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default Contact;
