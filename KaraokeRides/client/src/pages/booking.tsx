// src/pages/booking.jsx
import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { type Vehicle } from "@shared/schema";
import { VehicleCard } from "@/components/vehicle-card";
import { RoutePreview } from "@/components/route-preview";
import { ContactDetailsForm } from "@/components/contact-details-form";
import { ShareRide } from "@/components/share-ride";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useBookingStore } from "@/lib/stores/booking-store";
import { BookingProgress } from "@/components/booking-progress";
import { Navbar } from "@/components/navbar";
import { AddressInput } from "@/components/address-input";
import { motion, AnimatePresence } from "framer-motion";
import { calculatePricing } from "@/lib/pricing";

export default function Booking() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const {
    pickup: storedPickup,
    dropoff: storedDropoff,
    selectedVehicleId,
    setSelectedVehicleId,
    tripType,
    bookingType,
    setTripType,
    setBookingType,
    setPickup,
    setDropoff,
  } = useBookingStore();

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();
  const [route, setRoute] = useState<any>();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedPickup, setEditedPickup] = useState(storedPickup);
  const [editedDropoff, setEditedDropoff] = useState(storedDropoff);
  const [totalPrice, setTotalPrice] = useState(0);

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: (booking) => {
      setCurrentBooking(booking);
      setCompletedSteps([...completedSteps, 1]);
      setCurrentStep(2);
      toast({
        title: "Success!",
        description: "Your details have been saved. Proceed to payment.",
      });
    },
  });

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ["/api/vehicles"],
  });

  // Calculate route using Google Maps Directions Service
  useEffect(() => {
    if (storedPickup && storedDropoff) {
      const directionsService = new google.maps.DirectionsService();
      const request = {
        origin: storedPickup,
        destination: storedDropoff,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: google.maps.TrafficModel.BEST_GUESS
        }
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK" && result) {
          const route = result.routes[0].legs[0];
          setRoute({
            distance: (route.distance?.value || 0) / 1609.34, // Convert meters to miles
            duration: Math.ceil((route.duration?.value || 0) / 60), // Convert seconds to minutes
            trafficDuration: Math.ceil((route.duration_in_traffic?.value || 0) / 60),
          });
        }
      });
    }
  }, [storedPickup, storedDropoff]);

  // Update total price whenever route or vehicle changes
  useEffect(() => {
    if (route && selectedVehicle) {
      const price = calculatePricing(route.distance, selectedVehicle.class);
      setTotalPrice(price);
    }
  }, [route, selectedVehicle]);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setSelectedVehicleId(vehicle.id);
    if (!completedSteps.includes(0)) {
      setCompletedSteps([...completedSteps, 0]);
    }
    setCurrentStep(1);
  };

  const handleSaveEdit = () => {
    setPickup(editedPickup);
    setDropoff(editedDropoff);
    setEditDialogOpen(false);
  };

  const handleEditedPickupChange = (value: string) => {
    setEditedPickup(value);
  };

  const handleEditedDropoffChange = (value: string) => {
    setEditedDropoff(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!storedPickup || !storedDropoff) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {bookingType === 'professional' ? 'Professional Service' : 'Karaoke Experience'}
        </h1>

        <BookingProgress
          currentStep={currentStep}
          completedSteps={completedSteps}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Left Column - Vehicle Selection or Contact Form */}
          <AnimatePresence mode="wait">
            {currentStep === 0 ? (
              <motion.div
                key="vehicles"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Select Your Vehicle</h2>
                <div className="space-y-6">
                  {vehicles?.map((vehicle: Vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      selected={selectedVehicle?.id === vehicle.id}
                      onSelect={handleVehicleSelect}
                      showHourlyRate={tripType === 'hourly'}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="contact-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">Contact Details</h2>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentStep(0);
                    }}
                  >
                    Back to Vehicles
                  </Button>
                </div>
                <ContactDetailsForm
                  onSubmit={(data) => {
                    bookingMutation.mutate({
                      ...data,
                      pickupAddress: storedPickup,
                      dropoffAddress: storedDropoff,
                      totalPrice,
                      vehicleId: selectedVehicle?.id,
                    });
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Column - Ride Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Ride Summary</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {tripType === 'hourly' ? 'Hourly Service' : 'Point to Point'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Trip Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 p-4">
                        <Tabs value={tripType} onValueChange={setTripType as (value: string) => void}>
                          <TabsList className="w-full">
                            <TabsTrigger value="p2p" className="w-1/2">
                              Point to Point
                            </TabsTrigger>
                            <TabsTrigger value="hourly" className="w-1/2">
                              Hourly
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                        <Tabs value={bookingType} onValueChange={setBookingType as (value: string) => void}>
                          <TabsList className="w-full">
                            <TabsTrigger value="professional" className="w-1/2">
                              Professional
                            </TabsTrigger>
                            <TabsTrigger value="karaoke" className="w-1/2">
                              Karaoke
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">From</label>
                            <AddressInput
                              value={editedPickup}
                              onChange={handleEditedPickupChange}
                              placeholder="Enter pickup location"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">To</label>
                            <AddressInput
                              value={editedDropoff}
                              onChange={handleEditedDropoffChange}
                              placeholder="Enter dropoff location"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleSaveEdit}>
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                  >
                    {isSummaryExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className={`${isSummaryExpanded ? 'block' : 'hidden lg:block'} space-y-6`}>
                {route && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">From</p>
                        <p className="font-medium truncate">{storedPickup}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">To</p>
                        <p className="font-medium truncate">{storedDropoff}</p>
                      </div>
                    </div>

                    {/* Route Preview */}
                    <RoutePreview
                      pickup={storedPickup}
                      dropoff={storedDropoff}
                      className="w-full h-48 rounded-lg overflow-hidden"
                    />

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="font-medium">{route.distance.toFixed(1)} miles</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">
                          {route.trafficDuration || route.duration} min
                          {route.trafficDuration && route.trafficDuration > route.duration && (
                            <span className="text-yellow-500 text-sm ml-1">(traffic)</span>
                          )}
                        </p>
                      </div>
                    </div>

                    {selectedVehicle && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground">Selected Vehicle</p>
                        <p className="font-medium">{selectedVehicle.name}</p>
                        <p className="text-sm text-muted-foreground">${selectedVehicle.hourlyRate}/hour</p>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Total Price</span>
                        {selectedVehicle && route ? (
                          <span className="text-xl font-bold">
                            ${totalPrice}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">Please select vehicle</span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Share Dialog */}
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Your Ride Experience!</DialogTitle>
            </DialogHeader>
            {currentBooking && selectedVehicle && (
              <ShareRide booking={currentBooking} vehicle={selectedVehicle} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}