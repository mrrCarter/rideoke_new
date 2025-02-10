import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Car, User, Calendar, Star, Music, Briefcase } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Executive Transportation",
      description: "Professional chauffeur service for corporate clients and executives. Door-to-door service with emphasis on punctuality and discretion.",
      icon: Briefcase,
      features: [
        "Professional uniformed chauffeurs",
        "Late-model luxury vehicles",
        "Real-time flight tracking",
        "Corporate account management",
        "24/7 dispatch support"
      ]
    },
    {
      title: "Karaoke Experience",
      description: "Turn your journey into an unforgettable party with our premium mobile karaoke system and ambient lighting.",
      icon: Music,
      features: [
        "State-of-the-art sound system",
        "Extensive song library",
        "Professional lighting setup",
        "Multiple microphones",
        "Touchscreen song selection"
      ]
    },
    {
      title: "Special Events",
      description: "Make your special occasion extraordinary with our luxury transportation services.",
      icon: Star,
      features: [
        "Wedding packages",
        "Prom night specials",
        "Bachelor/Bachelorette parties",
        "Anniversary celebrations",
        "Red carpet events"
      ]
    },
    {
      title: "Group Transportation",
      description: "Comfortable and coordinated group travel solutions for any size party.",
      icon: User,
      features: [
        "Corporate events",
        "Airport transfers",
        "Concert transportation",
        "Sports events",
        "Custom group tours"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience luxury transportation tailored to your needs, whether it's professional service or entertainment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/plan">
            <Button size="lg" className="px-8">
              Start Planning Your Trip
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
