import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Vehicle, type Booking } from "@shared/schema";

interface ShareRideProps {
  booking: Booking;
  vehicle: Vehicle;
}

export function ShareRide({ booking, vehicle }: ShareRideProps) {
  const shareUrl = `${window.location.origin}/booking/${booking.id}`;
  const title = `Just booked a ${vehicle.name} karaoke experience! 🎤✨`;
  const message = `I'm heading from ${booking.pickupAddress} to ${booking.dropoffAddress} in a ${vehicle.name}. Join the party! 🎉`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Share Your Ride
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-4">
          <FacebookShareButton url={shareUrl} title={title} hashtag="#KaraokeRide">
            <FacebookIcon size={40} round className="hover:scale-110 transition-transform" />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={title} hashtags={["KaraokeRide", "PartyOnWheels"]}>
            <TwitterIcon size={40} round className="hover:scale-110 transition-transform" />
          </TwitterShareButton>

          <WhatsappShareButton url={shareUrl} title={`${title}\n\n${message}`}>
            <WhatsappIcon size={40} round className="hover:scale-110 transition-transform" />
          </WhatsappShareButton>
        </div>
      </CardContent>
    </Card>
  );
}