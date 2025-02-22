
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Extend Window interface to include our callback
declare global {
  interface Window {
    initGoogle?: () => void;
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
  if (window.google?.maps?.places) {
    return Promise.resolve();
  }

  // Remove any existing Google Maps script to prevent duplicates
  const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
  if (existingScript) {
    existingScript.remove();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async&callback=initGoogle`;
    script.async = true;
    script.defer = true;

    // Define the callback function
    window.initGoogle = () => {
      resolve();
    };

    script.onerror = () => {
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
        // Get API key from Supabase secrets
        const { data: apiKey, error: secretError } = await supabase
          .from('_secret')
          .select('google_maps_api_key')
          .single();

        if (secretError || !apiKey?.google_maps_api_key) {
          console.error('Error fetching API key:', secretError);
          toast.error('Failed to initialize address lookup');
          return;
        }

        await loadGoogleMapsScript(apiKey.google_maps_api_key);

        if (!mounted) return;

        if (inputRef.current && window.google?.maps?.places) {
          try {
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

              const addressComponents = extractAddressComponents(place);
              setInputValue(place.formatted_address || '');
              onPlaceSelected(addressComponents);
            });
          } catch (error) {
            console.error('Error initializing Autocomplete:', error);
            toast.error('Failed to initialize address lookup');
          }
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
