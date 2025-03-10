import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

declare global {
  interface Window {
    initGoogle?: () => void;
    google: typeof google;
  }
}

interface AddressComponents {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
}

interface GooglePlacesAutocompleteProps {
  onPlaceSelected: (address: AddressComponents) => void;
  defaultValue?: string;
  className?: string;
}

const loadGoogleMapsScript = async (apiKey: string): Promise<void> => {
  if (window.google?.maps?.places?.Autocomplete) {
    console.log("Google Maps Places API already loaded");
    return Promise.resolve();
  }

  console.log("Loading Google Maps Places API");
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async&callback=initGoogle`;
    script.async = true;
    script.defer = true;

    window.initGoogle = () => {
      console.log("Google Maps Places API loaded successfully");
      resolve();
    };

    script.onerror = () => {
      console.error("Failed to load Google Maps script");
      reject(new Error('Failed to load Google Maps script'));
      toast.error('Failed to load Google Maps');
    };

    document.head.appendChild(script);
  });
};

const extractAddressComponents = (place: google.maps.places.PlaceResult): AddressComponents => {
  const addressComponents = place.address_components || [];
  let street = '';
  let unit = '';
  let city = '';
  let state = '';
  let zipCode = '';

  for (const component of addressComponents) {
    const types = component.types;
    
    if (types.includes('street_number')) {
      street = component.long_name + ' ';
    }
    if (types.includes('route')) {
      street += component.long_name;
    }
    if (types.includes('subpremise')) {
      unit = component.long_name;
    }
    if (types.includes('locality')) {
      city = component.long_name;
    }
    if (types.includes('administrative_area_level_1')) {
      state = component.short_name;
    }
    if (types.includes('postal_code')) {
      zipCode = component.long_name;
    }
  }

  return {
    street: street.trim(),
    ...(unit && { unit }),
    city,
    state,
    zipCode
  };
};

const GooglePlacesAutocomplete = ({
  onPlaceSelected,
  defaultValue = "",
  className,
}: GooglePlacesAutocompleteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const scriptLoadAttempted = useRef(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .pac-container {
        z-index: 99999 !important;
        position: fixed !important;
        background-color: white;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 0.375rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        margin-top: 4px;
        pointer-events: auto !important;
      }
      .pac-item {
        padding: 8px 12px;
        cursor: pointer !important;
        pointer-events: auto !important;
      }
      .pac-item:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const initializeAutocomplete = async () => {
      if (scriptLoadAttempted.current) {
        return;
      }
      
      scriptLoadAttempted.current = true;
      console.log("Initializing Google Places Autocomplete");

      try {
        const { data, error } = await supabase.functions.invoke('get-google-maps-key');
        
        if (error || !data?.apiKey) {
          throw new Error('Failed to fetch API key: ' + (error?.message || 'No API key returned'));
        }

        await loadGoogleMapsScript(data.apiKey);

        if (!mounted) return;

        if (!inputRef.current || !window.google?.maps?.places) {
          throw new Error('Required dependencies not available');
        }

        if (autocompleteRef.current) {
          google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "us" },
          fields: ["address_components", "formatted_address", "geometry", "name", "place_id"],
          types: ["address"]
        });

        autocompleteRef.current = autocomplete;

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          
          if (!place?.address_components) {
            console.warn('Invalid place selected:', place);
            toast.error('Please select a valid address from the dropdown');
            return;
          }

          const addressComponents = extractAddressComponents(place);
          
          if (place.formatted_address && inputRef.current) {
            inputRef.current.value = place.formatted_address;
          }

          onPlaceSelected(addressComponents);
        });

        setIsLoading(false);

      } catch (error) {
        console.error('Error in Google Places setup:', error);
        toast.error('Failed to initialize address lookup');
        setIsLoading(false);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      defaultValue={defaultValue}
      placeholder="Start typing your address..."
      className={`${className} cursor-text`}
      disabled={isLoading}
      onKeyDown={handleKeyDown}
      aria-label="Address autocomplete"
      data-loading={isLoading}
    />
  );
};

export default GooglePlacesAutocomplete;
