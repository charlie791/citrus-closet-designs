
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GooglePlacesAutocompleteProps {
  onPlaceSelected: (fullAddress: string) => void;
  defaultValue?: string;
  className?: string;
}

const loadGoogleMapsScript = async (apiKey: string): Promise<void> => {
  if (window.google?.maps?.places) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Maps script'));
    document.head.appendChild(script);
  });
};

const GooglePlacesAutocomplete = ({
  onPlaceSelected,
  defaultValue = "",
  className,
}: GooglePlacesAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const scriptLoadAttempted = useRef(false);

  useEffect(() => {
    let mounted = true;

    const initializeAutocomplete = async () => {
      if (scriptLoadAttempted.current) return;
      scriptLoadAttempted.current = true;

      try {
        const { data, error } = await supabase
          .from('_secret')
          .select('google_maps_api_key')
          .maybeSingle();

        if (error) {
          console.error('Error fetching API key:', error);
          toast.error('Failed to initialize address lookup');
          return;
        }

        if (!data?.google_maps_api_key) {
          console.error('No API key found');
          toast.error('Missing Google Maps configuration');
          return;
        }

        await loadGoogleMapsScript(data.google_maps_api_key);

        if (!mounted) return;

        if (inputRef.current && window.google) {
          autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: "us" },
            fields: ["formatted_address"],
            types: ["address"]
          });

          autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current?.getPlace();
            
            if (!place?.formatted_address) {
              console.error('Invalid place selected:', place);
              return;
            }

            setInputValue(place.formatted_address);
            onPlaceSelected(place.formatted_address);
          });
        }
      } catch (error) {
        console.error('Error setting up Google Places:', error);
        toast.error('Failed to initialize address lookup');
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAutocomplete();

    return () => {
      mounted = false;
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onPlaceSelected]);

  return (
    <Input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Start typing your address..."
      className={className}
      disabled={isLoading}
    />
  );
};

export default GooglePlacesAutocomplete;
