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

export type VehicleClass = 'luxury' | 'executive';
