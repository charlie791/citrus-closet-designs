
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Place {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface GooglePlacesAutocompleteProps {
  onPlaceSelected: (place: Place) => void;
  defaultValue?: string;
  className?: string;
}

const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=Function.prototype`;
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

  useEffect(() => {
    let mounted = true;

    const initializeAutocomplete = async () => {
      try {
        const { data: secretData, error: fetchError } = await supabase
          .from('_secret')
          .select('google_maps_api_key')
          .maybeSingle();

        if (fetchError || !secretData?.google_maps_api_key) {
          console.error('Error fetching API key:', fetchError);
          toast.error('Failed to initialize address lookup');
          return;
        }

        await loadGoogleMapsScript(secretData.google_maps_api_key);

        if (!mounted) return;

        if (inputRef.current && window.google) {
          autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: "us" },
            fields: ["address_components", "formatted_address"],
            types: ["address"]
          });

          autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current?.getPlace();
            
            if (!place?.address_components) {
              console.error('Invalid place selected:', place);
              return;
            }

            let streetNumber = "";
            let streetName = "";
            let unit = "";
            let city = "";
            let state = "";
            let zipCode = "";

            for (const component of place.address_components) {
              const types = component.types;

              if (types.includes("street_number")) {
                streetNumber = component.long_name;
              } else if (types.includes("route")) {
                streetName = component.long_name;
              } else if (types.includes("subpremise")) {
                unit = component.long_name;
              } else if (types.includes("locality")) {
                city = component.long_name;
              } else if (types.includes("administrative_area_level_1")) {
                state = component.short_name;
              } else if (types.includes("postal_code")) {
                zipCode = component.long_name;
              }
            }

            const formattedPlace: Place = {
              street: `${streetNumber} ${streetName}`.trim(),
              unit,
              city,
              state,
              zipCode,
            };

            setInputValue(place.formatted_address || "");
            onPlaceSelected(formattedPlace);
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
    />
  );
};

export default GooglePlacesAutocomplete;
