
import { useLoadScript } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const libraries = ["places"];

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
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { data, error } = await supabase
          .from('_secret')
          .select('google_maps_api_key')
          .maybeSingle();
          
        if (error) {
          console.error('Error fetching API key:', error);
          return;
        }
        
        if (data?.google_maps_api_key) {
          console.log('API key fetched successfully');
          setApiKey(data.google_maps_api_key);
        } else {
          console.error('No API key found in database');
        }
      } catch (error) {
        console.error('Error fetching API key:', error);
      }
    };

    fetchApiKey();
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries as any,
    version: "weekly"
  });

  const handlePlaceSelect = useCallback(() => {
    const place = autocompleteRef.current?.getPlace();
    
    if (!place || !place.address_components) {
      console.error('No place or address components found');
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

    console.log('Selected place:', formattedPlace);
    console.log('Full place object:', place);
    onPlaceSelected(formattedPlace);
  }, [onPlaceSelected]);

  // Initialize autocomplete when the script is loaded
  useEffect(() => {
    if (!isLoaded || !window.google || !inputRef.current) {
      return;
    }

    console.log('Initializing autocomplete...');
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "formatted_address", "geometry", "name"],
      types: ["address"]
    });

    autocompleteRef.current.addListener("place_changed", handlePlaceSelect);

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, handlePlaceSelect]);

  if (loadError) {
    console.error("Error loading Google Maps:", loadError);
    return (
      <Input
        type="text"
        placeholder="Error loading address lookup"
        className={className}
        disabled
      />
    );
  }

  if (!isLoaded || !apiKey) {
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
