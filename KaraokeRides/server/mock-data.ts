export const vehicles = [
  {
    id: 1,
    name: "Black Stretch Limousine",
    description: "Classic 8-passenger stretch limousine with luxurious leather interior and premium sound system.",
    capacity: 8,
    hourlyRate: 180,
    imageUrl: "https://images.unsplash.com/photo-1585011664466-b7bbe92f34ef?q=80&w=800",
    features: [
      "Premium Sound System",
      "Leather Interior",
      "Privacy Partition",
      "LED Lighting",
      "Complimentary Water"
    ],
    class: "luxury"
  },
  {
    id: 2,
    name: "Cadillac Escalade ESV",
    description: "Luxury SUV perfect for executive transportation with spacious interior and professional chauffeur.",
    capacity: 6,
    hourlyRate: 140,
    imageUrl: "https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=800",
    features: [
      "WiFi",
      "Leather Seats",
      "Professional Driver",
      "Climate Control",
      "USB Charging"
    ],
    class: "executive"
  },
  {
    id: 3,
    name: "Mercedes Sprinter Limo",
    description: "High-roof luxury van with executive seating and premium amenities for group travel.",
    capacity: 14,
    hourlyRate: 220,
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800",
    features: [
      "Executive Seating",
      "High Ceiling",
      "Premium Audio",
      "USB Charging",
      "Extra Luggage Space"
    ],
    class: "luxury"
  },
  {
    id: 4,
    name: "Lincoln Navigator L",
    description: "Premium SUV with extended wheelbase for maximum comfort and luxury.",
    capacity: 7,
    hourlyRate: 160,
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800",
    features: [
      "Premium Leather",
      "Surround Sound",
      "Extended Legroom",
      "Privacy Glass",
      "USB Charging"
    ],
    class: "executive"
  },
  {
    id: 5,
    name: "Black Chrysler 300 Stretch",
    description: "Modern stretch limousine with cutting-edge entertainment system and luxurious amenities.",
    capacity: 10,
    hourlyRate: 200,
    imageUrl: "https://images.unsplash.com/photo-1631830372458-53f4c1211c2f?q=80&w=800",
    features: [
      "Touch Screen Controls",
      "Premium Sound",
      "Fiber Optic Lighting",
      "Privacy Partition",
      "Champagne Bar"
    ],
    class: "luxury"
  }
];

// Boston-based pricing model
export function calculatePricing(distance: number, vehicleClass: string) {
  // Base rate for first 10 miles
  const baseRate = 70; // Starting price for local service

  // Additional per mile rate after 10 miles
  const additionalMileRate = 3.50; // Per mile charge beyond 10 miles

  // Vehicle class premium
  const classPremium = vehicleClass === 'luxury' ? 40 : 25; // Premium for vehicle type

  // Calculate total
  let total = baseRate + classPremium;

  // Add additional mile charges if distance > 10
  if (distance > 10) {
    total += (distance - 10) * additionalMileRate;
  }

  // Round to nearest dollar
  return Math.round(total);
}

export function calculateRoute(pickup: string, dropoff: string) {
  // This is just a mock implementation
  // The actual implementation uses Google Maps Directions Service in booking.tsx
  return {
    distance: 15.5,
    duration: 45,
    estimatedPrice: "150.00"
  };
}