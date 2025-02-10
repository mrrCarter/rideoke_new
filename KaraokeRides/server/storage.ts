import { collection, getDocs, getDoc, addDoc, doc } from 'firebase/firestore';
import { config } from './config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import type { Vehicle, Booking } from '@shared/schema';

const app = initializeApp(config.firebase);
const db = getFirestore(app);

class FirebaseStorage {
  async getVehicles(): Promise<Vehicle[]> {
    const querySnapshot = await getDocs(collection(db, 'vehicles'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Vehicle));
  }

  async getVehicle(id: string): Promise<Vehicle | null> {
    const docRef = doc(db, 'vehicles', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Vehicle : null;
  }

  async createBooking(booking: Omit<Booking, 'id'>): Promise<Booking> {
    const docRef = await addDoc(collection(db, 'bookings'), booking);
    return { id: docRef.id, ...booking };
  }

  async getBooking(id: string): Promise<Booking | null> {
    const docRef = doc(db, 'bookings', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Booking : null;
  }

  async getBookings(): Promise<Booking[]> {
    const querySnapshot = await getDocs(collection(db, 'bookings'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Booking));
  }
}

export const storage = new FirebaseStorage();