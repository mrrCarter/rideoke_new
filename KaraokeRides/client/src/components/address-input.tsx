import { useLoadScript } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

type Libraries = ("places")[];
const libraries: Libraries = ["places"];

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function AddressInput({ value, onChange, placeholder, className }: AddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAU4OiURduvgpZfhLSJVy2Ga2xjJcwVTAg",
    libraries,
  });

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    const newAutocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ["formatted_address", "geometry"],
      types: ["address"],
      componentRestrictions: { country: "us" }
    });

    newAutocomplete.addListener("place_changed", () => {
      const place = newAutocomplete.getPlace();
      if (place.formatted_address) {
        onChange(place.formatted_address);
      }
    });

    setAutocomplete(newAutocomplete);

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = document.querySelector('.pac-container') as HTMLElement;

      if (e.key === 'Enter') {
        e.preventDefault();
        const place = newAutocomplete.getPlace();
        if (place?.formatted_address) {
          onChange(place.formatted_address);
        }
      }
    };

    inputRef.current.addEventListener('keydown', handleKeyDown);

    // Style suggestions dropdown
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const pacContainer = document.querySelector('.pac-container') as HTMLElement;
          if (pacContainer) {
            // Style container
            pacContainer.style.backgroundColor = 'hsl(222.2, 84%, 4.9%)';
            pacContainer.style.border = '1px solid hsl(217.2, 32.6%, 17.5%)';
            pacContainer.style.color = 'hsl(210, 40%, 98%)';
            pacContainer.style.borderRadius = '0.5rem';
            pacContainer.style.marginTop = '4px';
            pacContainer.style.padding = '0.5rem';
            pacContainer.style.zIndex = '5000'; // Ensure it's above everything else in the modal

            // Style items
            const items = pacContainer.querySelectorAll('.pac-item');
            items.forEach((item: Element) => {
              if (item instanceof HTMLElement) {
                item.style.padding = '0.5rem';
                item.style.cursor = 'pointer';
                item.style.borderTop = '1px solid hsl(217.2, 32.6%, 17.5%)';
                item.style.color = 'hsl(210, 40%, 98%)';

                // Add click handler
                item.addEventListener('click', () => {
                  const suggestion = item.textContent;
                  if (suggestion) {
                    // Use the Places Service to get the full address
                    const placesService = new google.maps.places.PlacesService(document.createElement('div'));
                    const request = {
                      query: suggestion,
                      fields: ['formatted_address']
                    };

                    placesService.findPlaceFromQuery(request, (results, status) => {
                      if (status === google.maps.places.PlacesServiceStatus.OK && results?.[0]) {
                        onChange(results[0].formatted_address!);
                        if (pacContainer) {
                          pacContainer.style.display = 'none';
                        }
                      }
                    });
                  }
                });
              }
            });

            // Style matched text
            const matched = pacContainer.querySelectorAll('.pac-item-query');
            matched.forEach((match: Element) => {
              if (match instanceof HTMLElement) {
                match.style.color = 'hsl(210, 40%, 98%)';
              }
            });
          }
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
      observer.disconnect();
      if (inputRef.current) {
        inputRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [isLoaded, onChange]);

  if (loadError) {
    console.error("Google Maps script failed to load:", loadError);
  }

  return (
    <Input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  );
}