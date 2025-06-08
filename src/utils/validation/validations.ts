import { z } from "zod";

export const groupBookingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().min(1, "Company name is required"),
  groupSize: z.string().min(1, "Group size is required"),
  arrivalDate: z.string().min(1, "Arrival date is required"),
  departureDate: z.string().min(1, "Departure date is required"),
  location: z.string().min(1, "Location is required"),
  requirements: z.string().optional(),
});

export type GroupBookingFormData = z.infer<typeof groupBookingSchema>;
