import { useBookingStore } from "@/lib/stores/booking-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";

export default function Plan() {
  const {
    tripType,
    bookingType,
    pickup,
    dropoff,
    passengers,
    luggage,
  } = useBookingStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                  Custom Trip Planning
                </span>
              </h1>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Current Details</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">Trip Type:</span>{" "}
                        {tripType === "p2p" ? "Point to Point" : "Hourly"}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Service Type:</span>{" "}
                        {bookingType}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Pickup:</span>{" "}
                        {pickup}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Dropoff:</span>{" "}
                        {dropoff}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Passengers:</span>{" "}
                        {passengers}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Luggage:</span>{" "}
                        {luggage}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional sections will be added based on requirements */}
                <Card className="bg-card/50">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Additional Requirements</h2>
                    <p className="text-muted-foreground mb-4">
                      Tell us more about your custom trip requirements.
                    </p>
                    {/* More form fields will be added here */}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service Type</span>
                      <span className="font-medium">{bookingType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Trip Type</span>
                      <span className="font-medium">
                        {tripType === "p2p" ? "Point to Point" : "Hourly"}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Passengers</span>
                      <span className="font-medium">{passengers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Luggage</span>
                      <span className="font-medium">{luggage}</span>
                    </div>
                    <Separator />
                    <Button className="w-full bg-gradient-to-r from-primary to-purple-600">
                      Proceed to Vehicle Selection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
