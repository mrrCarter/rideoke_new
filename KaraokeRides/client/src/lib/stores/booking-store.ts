import { create } from 'zustand';

export type TripType = "hourly" | "p2p";
export type BookingType = "professional" | "karaoke";

export interface Stop {
  address: string;
  arrivalTime?: string;
  duration?: number; // duration of stay in minutes
}

interface BookingState {
  tripType: TripType;
  bookingType: BookingType;
  pickup: string;
  dropoff: string;
  stops: Stop[];
  passengers: number;
  luggage: number;
  multiVehicle: boolean;
  totalDistance: number;
  totalDuration: number;
  totalPrice: number;
  selectedVehicleId?: number;

  setTripType: (type: TripType) => void;
  setBookingType: (type: BookingType) => void;
  setPickup: (location: string) => void;
  setDropoff: (location: string) => void;
  addStop: (stop: Stop) => void;
  updateStop: (index: number, stop: Stop) => void;
  removeStop: (index: number) => void;
  setPassengers: (count: number) => void;
  setLuggage: (count: number) => void;
  setMultiVehicle: (multi: boolean) => void;
  setTotalDistance: (distance: number) => void;
  setTotalDuration: (duration: number) => void;
  setTotalPrice: (price: number) => void;
  setSelectedVehicleId: (id?: number) => void;
  reset: () => void;
}

const initialState = {
  tripType: "p2p" as TripType,
  bookingType: "professional" as BookingType,
  pickup: "",
  dropoff: "",
  stops: [],
  passengers: 1,
  luggage: 0,
  multiVehicle: false,
  totalDistance: 0,
  totalDuration: 0,
  totalPrice: 0,
  selectedVehicleId: undefined,
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  setTripType: (tripType) => set({ tripType }),
  setBookingType: (bookingType) => set({ bookingType }),
  setPickup: (pickup) => set({ pickup }),
  setDropoff: (dropoff) => set({ dropoff }),
  addStop: (stop) => set((state) => ({ stops: [...state.stops, stop] })),
  updateStop: (index, stop) => set((state) => ({
    stops: state.stops.map((s, i) => i === index ? stop : s)
  })),
  removeStop: (index) => set((state) => ({
    stops: state.stops.filter((_, i) => i !== index)
  })),
  setPassengers: (passengers) => set({ passengers }),
  setLuggage: (luggage) => set({ luggage }),
  setMultiVehicle: (multiVehicle) => set({ multiVehicle }),
  setTotalDistance: (totalDistance) => set({ totalDistance }),
  setTotalDuration: (totalDuration) => set({ totalDuration }),
  setTotalPrice: (totalPrice) => set({ totalPrice }),
  setSelectedVehicleId: (selectedVehicleId) => set({ selectedVehicleId }),
  reset: () => set(initialState),
}));