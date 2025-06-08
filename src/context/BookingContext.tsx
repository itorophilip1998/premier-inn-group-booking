"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { GroupBookingFormData } from "@/lib/validations";

interface BookingContextType {
  bookingData: GroupBookingFormData | null;
  setBookingData: (data: GroupBookingFormData) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
  children: ReactNode;
  initialData?: GroupBookingFormData | null;
}

export function BookingProvider({
  children,
  initialData = null,
}: BookingProviderProps) {
  const [bookingData, setBookingData] = useState<GroupBookingFormData | null>(
    initialData
  );

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
