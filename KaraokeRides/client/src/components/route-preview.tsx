import { useEffect, useRef } from "react";
import { useLoadScript } from "@react-google-maps/api";

interface RoutePreviewProps {
  pickup: string;
  dropoff: string;
  className?: string;
}

export function RoutePreview({ pickup, dropoff, className = "" }: RoutePreviewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAU4OiURduvgpZfhLSJVy2Ga2xjJcwVTAg",
  });

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !pickup || !dropoff) return;

    const geocoder = new google.maps.Geocoder();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(mapRef.current, {
      zoom: 12,
      center: { lat: 0, lng: 0 },
      disableDefaultUI: true,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#242f3e" }],
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#242f3e" }],
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#746855" }],
        },
      ],
    });

    const directionsRenderer = new google.maps.DirectionsRenderer({
      map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#7c3aed", // Purple color for the route
        strokeWeight: 4,
      },
    });

    Promise.all([
      new Promise<google.maps.LatLng>((resolve) => {
        geocoder.geocode({ address: pickup }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            resolve(results[0].geometry.location);
          }
        });
      }),
      new Promise<google.maps.LatLng>((resolve) => {
        geocoder.geocode({ address: dropoff }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            resolve(results[0].geometry.location);
          }
        });
      }),
    ]).then(([origin, destination]) => {
      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            directionsRenderer.setDirections(result);
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(origin);
            bounds.extend(destination);
            map.fitBounds(bounds);
          }
        }
      );

      // Add custom markers
      new google.maps.Marker({
        position: origin,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#7c3aed",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff",
        },
      });

      new google.maps.Marker({
        position: destination,
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#7c3aed",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff",
        },
      });
    });
  }, [isLoaded, pickup, dropoff]);

  return (
    <div
      ref={mapRef}
      className={`w-full h-48 rounded-lg overflow-hidden ${className}`}
    />
  );
}
