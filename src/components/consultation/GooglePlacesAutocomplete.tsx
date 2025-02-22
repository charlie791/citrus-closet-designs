
import { useLoadScript } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
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

  const handlePlaceSelect = useCallback((place: google.maps.places.PlaceResult) => {
    if (!place.address_components) {
      console.error('No address components found in place result');
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
    onPlaceSelected(formattedPlace);
  }, [onPlaceSelected]);

  const initAutocomplete = useCallback((input: HTMLInputElement | null) => {
    if (!input || !window.google) {
      console.log('Input element or Google API not available');
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: "us" },
      fields: ["address_components", "formatted_address"],
      types: ["address"]
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      handlePlaceSelect(place);
    });
  }, [handlePlaceSelect]);

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
      type="text"
      ref={initAutocomplete}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Start typing your address..."
      className={className}
    />
  );
};

export default GooglePlacesAutocomplete;
