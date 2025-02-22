
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

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

const GooglePlacesAutocomplete = ({
  onPlaceSelected,
  defaultValue = "",
  className,
}: GooglePlacesAutocompleteProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        setIsLoading(true);
        
        // Fetch API key from Supabase
        const { data: secretData, error: fetchError } = await supabase
          .from('_secret')
          .select('google_maps_api_key')
          .single();
          
        if (fetchError || !secretData?.google_maps_api_key) {
          console.error('Error fetching API key:', fetchError);
          return;
        }

        // Load Google Maps script if not already loaded
        if (!window.google) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${secretData.google_maps_api_key}&libraries=places`;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Google Maps script'));
            document.head.appendChild(script);
          });
        }

        // Initialize Autocomplete
        if (inputRef.current && window.google) {
          autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
            componentRestrictions: { country: "us" },
            fields: ["address_components", "formatted_address"],
            types: ["address"]
          });

          autocompleteRef.current.addListener("place_changed", () => {
            if (!autocompleteRef.current) return;

            const place = autocompleteRef.current.getPlace();
            if (!place || !place.address_components) {
              console.error('Invalid place selected:', place);
              return;
            }

            let streetNumber = "";
            let streetName = "";
            let unit = "";
            let city = "";
            let state = "";
            let zipCode = "";

            place.address_components.forEach((component) => {
              const types = component.types;

              if (types.includes("street_number")) {
                streetNumber = component.long_name;
              }
              if (types.includes("route")) {
                streetName = component.long_name;
              }
              if (types.includes("subpremise")) {
                unit = component.long_name;
              }
              if (types.includes("locality")) {
                city = component.long_name;
              }
              if (types.includes("administrative_area_level_1")) {
                state = component.short_name;
              }
              if (types.includes("postal_code")) {
                zipCode = component.long_name;
              }
            });

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
      } finally {
        setIsLoading(false);
      }
    };

    initializeAutocomplete();

    // Cleanup
    return () => {
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
      placeholder={isLoading ? "Loading address lookup..." : "Start typing your address..."}
      className={className}
      disabled={isLoading}
    />
  );
};

export default GooglePlacesAutocomplete;
