import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Star, Shield, Clock, Heart, GraduationCap, Gift, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const testimonials = [
  {
    quote: "I had a group of friends who were in a terrible mood when they got into the car. By the end of the ride, they were laughing and singing along. It was like a magic transformation! Mission accomplished!",
    author: "Satisfied Customer"
  },
  {
    quote: "Carpool Rideoke is the best way to get to a concert. We were so pumped up by the time we got to the venue that we were ready to rock out!",
    author: "Concert-goer"
  },
  {
    quote: "I've tried all the ride-sharing apps, but Carpool Rideoke is by far the most fun. The drivers are always friendly and upbeat, and the karaoke is a blast.",
    author: "Regular Rider"
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-4xl font-bold mb-4">Carpool Rideoke</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Where Every Ride is a Show
          </p>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-24">
          {/* Section 1: Introduction */}
          <motion.section 
            className="grid md:grid-cols-2 gap-8 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Because Every Ride Deserves a Little Fun</h2>
              <p className="text-lg text-muted-foreground">
                We don't just give you a ride—we give you an experience. Inside our luxury black cars and SUVs, 
                the lights pulse to the beat of your favorite tunes, setting the perfect mood. Our microphones 
                light up in sync with your voice, and yes, we've got the lyrics too!
              </p>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <div className="text-4xl">🎤</div>
            </div>
          </motion.section>

          {/* Section 2: Concert Experience */}
          <motion.section 
            className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="order-2 md:order-1">
              <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <div className="text-4xl">🎵</div>
              </div>
            </div>
            <div className="space-y-4 order-1 md:order-2">
              <h2 className="text-3xl font-bold">Getting Ready for Your Concert?</h2>
              <p className="text-lg text-muted-foreground">
                What better way to get hyped for the show than by jamming out to all your favorite artist's hits 
                on the way? You can get familiar with every song before you step into the venue, singing along 
                with your friends like the show's already started.
              </p>
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <motion.section 
            className="py-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-center mb-12">What Our Riders Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="pt-6">
                    <div className="text-primary mb-4">
                      <Star className="w-6 h-6" />
                    </div>
                    <blockquote className="text-lg mb-4">"{testimonial.quote}"</blockquote>
                    <footer className="text-sm text-muted-foreground">- {testimonial.author}</footer>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Special Offers Section */}
          <motion.section 
            className="py-16 bg-card rounded-lg p-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Special Offers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-xl">Student Discount</h3>
                <p className="text-muted-foreground">
                  Show your Boston area student ID and receive 15% off your next ride
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Gift className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-xl">Refer a Friend</h3>
                <p className="text-muted-foreground">
                  Get a $10 credit for every friend who books their first ride
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Share2 className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-xl">#RideokeChallenge</h3>
                <p className="text-muted-foreground">
                  Join our inter-college competition and share your Rideoke moments!
                </p>
              </div>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.div 
            className="text-center py-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-6">Ready for Your Rideoke Adventure?</h2>
            <Link href="/plan">
              <Button size="lg" className="px-8">
                Book Your Ride
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}