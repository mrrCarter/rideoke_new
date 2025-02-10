export const calculateRoute = (pickup: string, dropoff: string) => {
  // Mock route calculation
  const baseDistance = Math.floor(Math.random() * 10) + 2; // 2-12 miles
  const baseRate = 10; // $10 per mile
  const baseTime = Math.ceil(baseDistance * 3); // Rough estimate: 3 min per mile

  return {
    distance: baseDistance,
    duration: baseTime,
    estimatedPrice: (baseDistance * baseRate).toFixed(2)
  };
};

export const calculateTotalRoute = (pickup: string, stops: string[]) => {
  let totalDistance = 0;
  let totalDuration = 0;
  let totalPrice = 0;

  // Calculate from pickup to first stop
  if (stops.length > 0) {
    const firstLeg = calculateRoute(pickup, stops[0]);
    totalDistance += firstLeg.distance;
    totalDuration += firstLeg.duration;
    totalPrice += parseFloat(firstLeg.estimatedPrice);
  }

  // Calculate between stops
  for (let i = 0; i < stops.length - 1; i++) {
    const leg = calculateRoute(stops[i], stops[i + 1]);
    totalDistance += leg.distance;
    totalDuration += leg.duration;
    totalPrice += parseFloat(leg.estimatedPrice);
  }

  return {
    totalDistance,
    totalDuration,
    totalPrice: totalPrice.toFixed(2)
  };
};