"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  groupBookingSchema,
  type GroupBookingFormData,
} from "@/lib/validations";
import { useBooking } from "@/context/BookingContext";
import { Logo } from "./Logo";

export function GroupBookingForm() {
  const t = useTranslations("form.fields");
  const t2 = useTranslations("form");
  const locale = useLocale();
  const router = useRouter();
  const { setBookingData } = useBooking();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GroupBookingFormData>({
    resolver: zodResolver(groupBookingSchema),
  });

  const onSubmit = async (data: GroupBookingFormData) => {
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

      // Store the booking data in context
      setBookingData(data);

      // Redirect to success page with current locale
      router.push(`/${locale}/success`);
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-4 rounded-md"
    >
      <p className="mt-3 max-w-md mx-auto text-center text-base text-gray-500 sm:text-sm md:mt-5 md:text-lg md:max-w-4xl">
        {t2("subtitle")}
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="relative">
          <input
            type="text"
            id="firstName"
            {...register("firstName")}
            className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
            placeholder={t("firstName.placeholder")}
            aria-invalid={errors.firstName ? "true" : "false"}
          />
          <label
            htmlFor="firstName"
            className="pointer-events-none absolute left-4 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
          >
            {t("firstName.label")}
          </label>
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            id="lastName"
            {...register("lastName")}
            className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
            placeholder={t("lastName.placeholder")}
            aria-invalid={errors.lastName ? "true" : "false"}
          />
          <label
            htmlFor="lastName"
            className="pointer-events-none absolute left-4 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
          >
            {t("lastName.label")}
          </label>
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type="email"
            id="email"
            {...register("email")}
            className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
            placeholder={t("email.placeholder")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-4 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
          >
            {t("email.label")}
          </label>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
            placeholder={t("phone.placeholder")}
            aria-invalid={errors.phone ? "true" : "false"}
          />
          <label
            htmlFor="phone"
            className="pointer-events-none absolute left-4 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
          >
            {t("phone.label")}
          </label>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            id="company"
            {...register("company")}
            className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
            placeholder={t("company.placeholder")}
            aria-invalid={errors.company ? "true" : "false"}
          />
          <label
            htmlFor="company"
            className="pointer-events-none absolute left-4 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
          >
            {t("company.label")}
          </label>
          {errors.company && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.company.message}
            </p>
          )}
        </div>

        <div className="relative">
          <select
            id="groupSize"
            {...register("groupSize")}
            className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&>option]:bg-white [&>option]:text-gray-900"
            aria-invalid={errors.groupSize ? "true" : "false"}
          >
            <option value="">{t("groupSize.placeholder")}</option>
            <option value="1-10">1-10</option>
            <option value="11-20">11-20</option>
            <option value="21-50">21-50</option>
            <option value="51+">51+</option>
          </select>
          <label
            htmlFor="groupSize"
            className="pointer-events-none absolute left-4 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
          >
            {t("groupSize.label")}
          </label>
          {errors.groupSize && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.groupSize.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type="date"
            id="arrivalDate"
            {...register("arrivalDate")}
            className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            aria-invalid={errors.arrivalDate ? "true" : "false"}
          />
          <label
            htmlFor="arrivalDate"
            className="pointer-events-none absolute left-4 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
          >
            {t("arrivalDate.label")}
          </label>
          {errors.arrivalDate && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.arrivalDate.message}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type="date"
            id="departureDate"
            {...register("departureDate")}
            className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            aria-invalid={errors.departureDate ? "true" : "false"}
          />
          <label
            htmlFor="departureDate"
            className="pointer-events-none absolute left-4 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
          >
            {t("departureDate.label")}
          </label>
          {errors.departureDate && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.departureDate.message}
            </p>
          )}
        </div>

        <div className="relative sm:col-span-2">
          <input
            type="text"
            id="location"
            {...register("location")}
            className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
            placeholder={t("location.placeholder")}
            aria-invalid={errors.location ? "true" : "false"}
          />
          <label
            htmlFor="location"
            className="pointer-events-none absolute left-4 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
          >
            {t("location.label")}
          </label>
          {errors.location && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="relative sm:col-span-2">
          <textarea
            id="requirements"
            {...register("requirements")}
            rows={8}
            className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={t("requirements.placeholder")}
          />
          <label
            htmlFor="requirements"
            className="pointer-events-none absolute left-4 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
          >
            {t("requirements.label")}
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : t("Submit")}
        </button>
      </div>
    </form>
  );
}
