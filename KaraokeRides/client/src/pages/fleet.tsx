import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Users, Car, Music, Check } from "lucide-react";

export default function Fleet() {
  const vehicles = [
    {
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
      class: "Luxury"
    },
    {
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
      class: "Executive"
    },
    {
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
      class: "Luxury"
    },
    {
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
      class: "Executive"
    },
    {
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
      class: "Luxury"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Fleet</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience luxury and comfort with our diverse fleet of premium vehicles, each maintained to the highest standards.
          </p>
        </div>

        <div className="grid gap-8">
          {vehicles.map((vehicle, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={vehicle.imageUrl} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold">{vehicle.name}</h3>
                      <Badge variant="secondary" className="mt-2">
                        {vehicle.class}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{vehicle.capacity} passengers</span>
                      </div>
                      <p className="text-xl font-bold mt-1">
                        ${vehicle.hourlyRate}/hour
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {vehicle.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {vehicle.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/plan">
            <Button size="lg" className="px-8">
              Book Now
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
