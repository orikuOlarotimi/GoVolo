export type BookingStatus = "pending" | "confirmed" | "cancelled" | "expired";
export type PaymentStatus = "unpaid" | "paid" | "failed" | "refunded";

export type Booking = {
  _id: string;
  bookingType: "destination" | "package";
  destinationSnapshot: { title: string; location: string; image: string };
  checkIn: string;
  checkOut: string;
  days: number;
  guests: { adults: number; children: number; total: number };
  roomType?: { name?: string; price?: number };
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
};

export type BookingsResponse = {
  success: boolean;
  page: number;
  totalPages: number;
  total: number;
  count: number;
  bookings: Booking[];
};