import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Vehicle } from "@shared/schema";
import { Music, Users } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  selected?: boolean;
  showHourlyRate?: boolean;
}

export function VehicleCard({ vehicle, onSelect, selected, showHourlyRate = true }: VehicleCardProps) {
  return (
    <Card className={`relative ${selected ? 'ring-2 ring-primary' : ''}`}>
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <img 
          src={vehicle.imageUrl} 
          alt={vehicle.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{vehicle.name}</span>
          <Badge variant="secondary">
            <Users className="w-4 h-4 mr-1" />
            {vehicle.capacity}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{vehicle.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {vehicle.features.map((feature, i) => (
            <Badge key={i} variant="outline">
              <Music className="w-3 h-3 mr-1" />
              {feature}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">
            ${vehicle.hourlyRate}{showHourlyRate ? '/hour' : ''}
          </span>
          <Button onClick={() => onSelect(vehicle)}>
            {selected ? 'Selected' : 'Select'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}