import { useState, useCallback } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Car, Music2, MapPin, Users, Calendar, Clock,
  ChevronRight, Shield, Sparkles, Navigation, PlusCircle,
  ArrowUp, ArrowDown
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { useBookingStore, type Stop } from "@/lib/stores/booking-store";
import type { TripType, BookingType } from "@/lib/stores/booking-store";
import { calculateRoute } from "@/lib/mock-data";
import { AddressInput } from "@/components/address-input";

export default function Home() {
  const [, setLocation] = useLocation();
  const {
    tripType,
    bookingType,
    pickup,
    dropoff,
    stops,
    passengers,
    luggage,
    multiVehicle,
    setTripType,
    setBookingType,
    setPickup,
    setDropoff,
    addStop,
    updateStop,
    removeStop,
    setPassengers,
    setLuggage,
    setMultiVehicle,
    setTotalDistance,
    setTotalDuration,
    setTotalPrice,
  } = useBookingStore();

  const [showDropoff, setShowDropoff] = useState(false);
  const [showAddStop, setShowAddStop] = useState(false);
  const [showPassengers, setShowPassengers] = useState(false);

  const handleStartPlanning = () => {
    if (pickup && dropoff) {
      // Calculate route details before navigation
      const routeDetails = calculateRoute(pickup, dropoff);
      setTotalDistance(routeDetails.distance);
      setTotalDuration(routeDetails.duration);
      setTotalPrice(parseFloat(routeDetails.estimatedPrice));

      // Navigate to booking page
      setLocation("/booking");
    }
  };

  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAU4OiURduvgpZfhLSJVy2Ga2xjJcwVTAg`
        );
        const data = await response.json();
        if (data.results && data.results[0]) {
          setPickup(data.results[0].formatted_address);
          setShowDropoff(true);
        }
      } catch (error) {
        console.error("Error getting address:", error);
      }
    });
  };

  const handlePickupChange = useCallback((value: string) => {
    setPickup(value);
    if (value.length > 3) {
      setShowDropoff(true);
    }
  }, [setPickup]);

  const handleDropoffChange = useCallback((value: string) => {
    setDropoff(value);
    if (value.length > 3) {
      setShowAddStop(true);
      setShowPassengers(true);
    }
  }, [setDropoff]);

  const handleStopChange = useCallback((index: number, address: string) => {
    updateStop(index, { address });

    // Calculate cumulative route details
    let totalDistance = 0;
    let totalDuration = 0;
    let totalPrice = 0;

    // Calculate from pickup to dropoff
    const firstLeg = calculateRoute(pickup, dropoff);
    totalDistance += firstLeg.distance;
    totalDuration += firstLeg.duration;
    totalPrice += parseFloat(firstLeg.estimatedPrice);

    // Calculate from dropoff through all stops
    let prevAddress = dropoff;
    for (const stop of stops) {
      const leg = calculateRoute(prevAddress, stop.address);
      totalDistance += leg.distance;
      totalDuration += leg.duration;
      totalPrice += parseFloat(leg.estimatedPrice);
      prevAddress = stop.address;
    }

    setTotalDistance(totalDistance);
    setTotalDuration(totalDuration);
    setTotalPrice(totalPrice);
  }, [pickup, dropoff, stops, setTotalDistance, setTotalDuration, setTotalPrice, updateStop]);

  const handleAddStop = useCallback(() => {
    addStop({ address: "" });
  }, [addStop]);

  const adjustValue = useCallback((setter: (val: number) => void, current: number, increment: boolean) => {
    setter(Math.max(0, current + (increment ? 1 : -1)));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1652727180785-53cf5c7a5dd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.15) blur(1px)',
          }}
        />

        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

        <div className="relative z-10">
          <header className="relative overflow-hidden">
            <div className="container mx-auto px-4 py-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                      Premium Transport
                    </span>
                    <span className="block text-foreground/90 mt-2">Your Way</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    Luxury transportation services for every occasion - from executive travel to karaoke parties on wheels.
                  </p>
                </div>

                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                >
                  <Card className="w-full shadow-2xl bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
                    <CardContent className="p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent animate-pulse" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent" />

                      <Tabs value={tripType} onValueChange={(v) => setTripType(v as TripType)} className="mb-4">
                        <TabsList className="w-full">
                          <TabsTrigger value="p2p" className="w-1/2">
                            Point to Point
                          </TabsTrigger>
                          <TabsTrigger value="hourly" className="w-1/2">
                            Hourly
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>

                      <Tabs value={bookingType} onValueChange={(v) => setBookingType(v as BookingType)}>
                        <TabsList className="grid grid-cols-2 mb-6">
                          <TabsTrigger value="professional">
                            <Car className="w-4 h-4 mr-2" />
                            Professional
                          </TabsTrigger>
                          <TabsTrigger value="karaoke">
                            <Music2 className="w-4 h-4 mr-2" />
                            Karaoke
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="professional" className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block text-foreground/80">
                              Pickup Location
                            </label>
                            <div className="relative">
                              <AddressInput
                                placeholder="Enter pickup location"
                                value={pickup}
                                onChange={handlePickupChange}
                                className="pr-24"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={useCurrentLocation}
                              >
                                <Navigation className="w-4 h-4 mr-1" />
                                Current
                              </Button>
                            </div>
                          </div>

                          {showDropoff && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              className="space-y-4"
                            >
                              <div>
                                <label className="text-sm font-medium mb-2 block text-foreground/80">
                                  Dropoff Location
                                </label>
                                <AddressInput
                                  placeholder="Enter dropoff location"
                                  value={dropoff}
                                  onChange={handleDropoffChange}
                                />
                              </div>

                              {showAddStop && (
                                <>
                                  {stops.map((stop, index) => (
                                    <div key={index}>
                                      <label className="text-sm font-medium mb-2 block text-foreground/80">
                                        Stop {index + 1}
                                      </label>
                                      <AddressInput
                                        placeholder={`Enter stop location`}
                                        value={stop.address}
                                        onChange={(value) => handleStopChange(index, value)}
                                      />
                                    </div>
                                  ))}

                                  <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => addStop({ address: "" })}
                                    type="button"
                                  >
                                    <PlusCircle className="w-4 h-4 mr-2" />
                                    Add Stop
                                  </Button>
                                </>
                              )}
                            </motion.div>
                          )}

                          {showPassengers && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              className="space-y-4"
                            >
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium mb-2 block text-foreground/80">
                                    Passengers
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      min="1"
                                      value={passengers}
                                      readOnly
                                      className="text-center"
                                    />
                                    <div className="flex flex-col gap-1">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => adjustValue(setPassengers, passengers, true)}
                                        type="button"
                                      >
                                        <ArrowUp className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => adjustValue(setPassengers, passengers, false)}
                                        type="button"
                                      >
                                        <ArrowDown className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-2 block text-foreground/80">
                                    Luggage
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      min="0"
                                      value={luggage}
                                      readOnly
                                      className="text-center"
                                    />
                                    <div className="flex flex-col gap-1">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => adjustValue(setLuggage, luggage, true)}
                                        type="button"
                                      >
                                        <ArrowUp className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => adjustValue(setLuggage, luggage, false)}
                                        type="button"
                                      >
                                        <ArrowDown className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {passengers > 4 && (
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="multiVehicle"
                                    checked={multiVehicle}
                                    onChange={(e) => setMultiVehicle(e.target.checked)}
                                    className="rounded border-primary/20"
                                  />
                                  <label htmlFor="multiVehicle" className="text-sm text-foreground/80">
                                    I need multiple vehicles
                                  </label>
                                </div>
                              )}

                              <Button
                                onClick={handleStartPlanning}
                                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 shadow-lg shadow-primary/25"
                                size="lg"
                                type="button"
                              >
                                {multiVehicle ? "Plan Multi-Vehicle Trip" : "Continue Booking"}
                                <ChevronRight className="w-4 h-4 ml-2" />
                              </Button>
                            </motion.div>
                          )}
                        </TabsContent>

                        <TabsContent value="karaoke" className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block text-foreground/80">
                              Where's the party starting?
                            </label>
                            <div className="relative">
                              <AddressInput
                                placeholder="Enter party pickup location"
                                value={pickup}
                                onChange={handlePickupChange}
                                className="pr-24"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={useCurrentLocation}
                              >
                                <Navigation className="w-4 h-4 mr-1" />
                                Current
                              </Button>
                            </div>
                          </div>

                          {showDropoff && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              className="space-y-4"
                            >
                              <div>
                                <label className="text-sm font-medium mb-2 block text-foreground/80">
                                  Dropoff Location
                                </label>
                                <AddressInput
                                  placeholder="Enter dropoff location"
                                  value={dropoff}
                                  onChange={handleDropoffChange}
                                />
                              </div>
                              {showAddStop && (
                                <>
                                  {stops.map((stop, index) => (
                                    <div key={index}>
                                      <label className="text-sm font-medium mb-2 block text-foreground/80">
                                        Stop {index + 1}
                                      </label>
                                      <AddressInput
                                        placeholder={`Enter stop location`}
                                        value={stop.address}
                                        onChange={(value) => handleStopChange(index, value)}
                                      />
                                    </div>
                                  ))}

                                  <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => addStop({ address: "" })}
                                    type="button"
                                  >
                                    <PlusCircle className="w-4 h-4 mr-2" />
                                    Add Stop
                                  </Button>
                                </>
                              )}
                            </motion.div>
                          )}

                          {showPassengers && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              className="space-y-4"
                            >
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium mb-2 block text-foreground/80">
                                    Party Size
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      min="1"
                                      value={passengers}
                                      readOnly
                                      className="text-center"
                                    />
                                    <div className="flex flex-col gap-1">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => adjustValue(setPassengers, passengers, true)}
                                        type="button"
                                      >
                                        <ArrowUp className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => adjustValue(setPassengers, passengers, false)}
                                        type="button"
                                      >
                                        <ArrowDown className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-2 block text-foreground/80">
                                    Equipment
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      min="0"
                                      value={luggage}
                                      readOnly
                                      className="text-center"
                                    />
                                    <div className="flex flex-col gap-1">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => adjustValue(setLuggage, luggage, true)}
                                        type="button"
                                      >
                                        <ArrowUp className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => adjustValue(setLuggage, luggage, false)}
                                        type="button"
                                      >
                                        <ArrowDown className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {passengers > 8 && (
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="multiVehicle"
                                    checked={multiVehicle}
                                    onChange={(e) => setMultiVehicle(e.target.checked)}
                                    className="rounded border-primary/20"
                                  />
                                  <label htmlFor="multiVehicle" className="text-sm text-foreground/80">
                                    Split into multiple party buses
                                  </label>
                                </div>
                              )}

                              <Button
                                onClick={handleStartPlanning}
                                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 shadow-lg shadow-primary/25"
                                size="lg"
                                type="button"
                              >
                                {multiVehicle ? "Plan Multi-Vehicle Party" : "Start Party Planning"}
                                <ChevronRight className="w-4 h-4 ml-2" />
                              </Button>
                            </motion.div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </header>

          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, i) => (
                  <Link key={i} href={`/services/${service.title.toLowerCase()}`}>
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="text-center cursor-pointer group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                        <CardContent className="pt-6">
                          <motion.div
                            className="mb-4 inline-flex p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors"
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            {service.icon}
                          </motion.div>
                          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                          <p className="text-muted-foreground">{service.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    icon: <Car className="w-6 h-6 text-primary" />,
    title: "Executive Service",
    description: "Premium black car service for business and luxury travel",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Group Transport",
    description: "Spacious vehicles for larger groups and special events",
  },
  {
    icon: <Music2 className="w-6 h-6 text-primary" />,
    title: "Karaoke Experience",
    description: "Mobile entertainment venue with professional karaoke setup",
  },
  {
    icon: <Calendar className="w-6 h-6 text-primary" />,
    title: "Event Planning",
    description: "Customized transportation solutions for any occasion",
  },
];

const features = [
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Professional Drivers",
    description: "Experienced, vetted drivers ensuring your safety and comfort",
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Reliable Service",
    description: "Punctual pickups and efficient route planning",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: "Premium Fleet",
    description: "Well-maintained luxury vehicles for every occasion",
  },
];