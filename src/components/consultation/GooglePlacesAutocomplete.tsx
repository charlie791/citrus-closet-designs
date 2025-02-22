
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
  const [apiKey, setApiKey] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // Fetch API key and load Google Maps script
  useEffect(() => {
    const fetchApiKeyAndLoadScript = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('_secret')
          .select('google_maps_api_key')
          .single();
          
        if (fetchError) {
          console.error('Error fetching API key:', fetchError);
          setError('Failed to load address lookup');
          setIsLoading(false);
          return;
        }
        
        if (!data?.google_maps_api_key) {
          console.error('No API key found');
          setError('Address lookup configuration missing');
          setIsLoading(false);
          return;
        }

        setApiKey(data.google_maps_api_key);
        
        // Load Google Maps script
        if (!window.google) {
          scriptRef.current = document.createElement('script');
          scriptRef.current.src = `https://maps.googleapis.com/maps/api/js?key=${data.google_maps_api_key}&libraries=places`;
          scriptRef.current.async = true;
          scriptRef.current.defer = true;
          
          scriptRef.current.onload = () => {
            console.log('Google Maps script loaded successfully');
            setIsLoading(false);
            initializeAutocomplete();
          };
          
          scriptRef.current.onerror = () => {
            console.error('Failed to load Google Maps script');
            setError('Failed to load address lookup');
            setIsLoading(false);
          };
          
          document.head.appendChild(scriptRef.current);
        } else {
          setIsLoading(false);
          initializeAutocomplete();
        }
      } catch (error) {
        console.error('Error in setup:', error);
        setError('Failed to initialize address lookup');
        setIsLoading(false);
      }
    };

    fetchApiKeyAndLoadScript();

    return () => {
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, []);

  const initializeAutocomplete = useCallback(() => {
    if (!inputRef.current || !window.google) {
      console.log('Not ready to initialize autocomplete');
      return;
    }

    try {
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

      console.log('Autocomplete initialized successfully');
    } catch (error) {
      console.error('Error initializing autocomplete:', error);
      setError('Failed to initialize address lookup');
    }
  }, [onPlaceSelected]);

  if (error) {
    return (
      <Input
        type="text"
        placeholder={error}
        className={className}
        disabled
      />
    );
  }

  if (isLoading) {
    return (
      <Input
        type="text"
        placeholder="Loading address lookup..."
        className={className}
        disabled
      />
    );
  }

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
