import { z } from "zod";
import { useTranslations } from "next-intl";

export const createGroupBookingSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z.string().min(1, t("form.fields.firstName.error")),
    lastName: z.string().min(1, t("form.fields.lastName.error")),
    email: z.string().email(t("form.fields.email.error")),
    phone: z.string().min(10, t("form.fields.phone.error")),
    company: z.string().min(1, t("form.fields.company.error")),
    groupSize: z.string().min(1, t("form.fields.groupSize.error")),
    arrivalDate: z.string().min(1, t("form.fields.arrivalDate.error")),
    departureDate: z.string().min(1, t("form.fields.departureDate.error")),
    location: z.string().min(1, t("form.fields.location.error")),
    requirements: z.string().optional(),
  });

export type GroupBookingFormData = z.infer<
  ReturnType<typeof createGroupBookingSchema>
>;
