export enum Level {
  Fönstertvätt = "Fönstertvätt",
  Basic = "Basic Städning",
  Topp = "Topp Städning",
  Diamant = "Diamant Städning"
}

export type Booking = {
  _id: string;
  date: Date;
  time: string;
  serviceType: Level;
  cleaner: string;
  completed: boolean;
};


export type BookingListProps = {
  bookings: Booking[];
  onDeleteBooking: (id: string) => void;
};

export interface AddBookingFormProps {
  addBooking: (booking: Booking) => Promise<void>;
}

export type BookingPageProps = {
  bookings: Booking[];
  addBooking: (booking: Booking) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
};
