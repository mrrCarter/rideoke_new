import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, DollarSign } from "lucide-react";

interface RouteDisplayProps {
  pickup: string;
  dropoff: string;
  distance: number;
  duration: number;
  estimatedPrice: string;
}

export function RouteDisplay({ pickup, dropoff, distance, duration, estimatedPrice }: RouteDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Route Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-1 text-primary" />
            <div>
              <p className="font-medium">Pickup</p>
              <p className="text-sm text-muted-foreground">{pickup}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-1 text-primary" />
            <div>
              <p className="font-medium">Dropoff</p>
              <p className="text-sm text-muted-foreground">{dropoff}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="font-medium">{distance} miles</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{duration} min</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Est. Price</p>
              <p className="font-medium">${estimatedPrice}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
