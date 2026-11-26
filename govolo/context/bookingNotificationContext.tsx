"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "@/context/authContext";

type BookingNotificationContextType = {
  hasNewBooking: boolean;
  notifyNewBooking: () => void;
  clearNewBooking: () => void;
};

const BookingNotificationContext = createContext<
  BookingNotificationContextType | undefined
>(undefined);

export function BookingNotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();
  const [hasNewBooking, setHasNewBooking] = useState(false);

  // Logging out (or switching accounts) must never leave a stale indicator
  useEffect(() => {
    if (!user) setHasNewBooking(false);
  }, [user]);

  const notifyNewBooking = useCallback(() => setHasNewBooking(true), []);
  const clearNewBooking = useCallback(() => setHasNewBooking(false), []);

  const value = useMemo(
    () => ({
      // only authenticated users ever see the indicator
      hasNewBooking: !!user && hasNewBooking,
      notifyNewBooking,
      clearNewBooking,
    }),
    [user, hasNewBooking, notifyNewBooking, clearNewBooking],
  );

  return (
    <BookingNotificationContext.Provider value={value}>
      {children}
    </BookingNotificationContext.Provider>
  );
}

export function useBookingNotification() {
  const ctx = useContext(BookingNotificationContext);
  if (!ctx) {
    throw new Error(
      "useBookingNotification must be used within a BookingNotificationProvider",
    );
  }
  return ctx;
}
