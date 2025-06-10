"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  groupBookingSchema,
  type GroupBookingFormData,
} from "@/lib/validations";
import { useBooking } from "@/context/BookingContext";

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
      className="space-y-6 bg-white p-[2.5rem] rounded-xl shadow-xl"
    >
      <p className="mt-3 max-w-md mx-auto text-center text-base text-gray-500 sm:text-sm md:mt-5 md:text-md md:max-w-4xl">
        {t2("subtitle")}
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 pl-10 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
              placeholder={t("firstName.placeholder")}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>
          <label
            htmlFor="firstName"
            className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
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
          <div className="relative">
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 pl-10 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
              placeholder={t("lastName.placeholder")}
              aria-invalid={errors.lastName ? "true" : "false"}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>
          <label
            htmlFor="lastName"
            className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
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
          <div className="relative">
            <input
              type="email"
              id="email"
              {...register("email")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 pl-10 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
              placeholder={t("email.placeholder")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
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
          <div className="relative">
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 pl-10 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
              placeholder={t("phone.placeholder")}
              aria-invalid={errors.phone ? "true" : "false"}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <label
            htmlFor="phone"
            className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
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
          <div className="relative">
            <input
              type="text"
              id="company"
              {...register("company")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 pl-10 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
              placeholder={t("company.placeholder")}
              aria-invalid={errors.company ? "true" : "false"}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814l-4.419-2.946-4.419 2.946A1 1 0 014 16V4zm2-1a1 1 0 00-1 1v11.566l3.419-2.28a1 1 0 011.162 0L14 15.566V4a1 1 0 00-1-1H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <label
            htmlFor="company"
            className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
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
          <div className="relative">
            <select
              id="groupSize"
              {...register("groupSize")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 pl-10 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&>option]:bg-white [&>option]:text-gray-900"
              aria-invalid={errors.groupSize ? "true" : "false"}
            >
              <option value="">{t("groupSize.placeholder")}</option>
              <option value="1-10">1-10</option>
              <option value="11-20">11-20</option>
              <option value="21-50">21-50</option>
              <option value="51+">51+</option>
            </select>
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          <label
            htmlFor="groupSize"
            className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
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
          <div className="relative">
            <input
              type="date"
              id="arrivalDate"
              {...register("arrivalDate")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 pl-10 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              aria-invalid={errors.arrivalDate ? "true" : "false"}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <label
            htmlFor="arrivalDate"
            className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
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
          <div className="relative">
            <input
              type="date"
              id="departureDate"
              {...register("departureDate")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 pl-10 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              aria-invalid={errors.departureDate ? "true" : "false"}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <label
            htmlFor="departureDate"
            className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
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
          <div className="relative">
            <input
              type="text"
              id="location"
              {...register("location")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 pl-10 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
              placeholder={t("location.placeholder")}
              aria-invalid={errors.location ? "true" : "false"}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <label
            htmlFor="location"
            className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
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
          <div className="relative">
            <textarea
              id="requirements"
              {...register("requirements")}
              rows={8}
              className="peer mt-1 block w-full rounded-md border border-gray-300 p-4 pl-10 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={t("requirements.placeholder")}
            />
            <svg
              className="absolute left-3 top-4 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <label
            htmlFor="requirements"
            className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
          >
            {t("requirements.label")}
          </label>
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex cursor-pointer justify-center rounded-full shadow-lg border border-transparent bg-indigo-600 px-[4rem] py-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#4F46E5",
            color: "#FFFFFF",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          {isSubmitting ? (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Submitting...
            </motion.span>
          ) : (
            t("Submit")
          )}
        </motion.button>
      </div>
    </form>
  );
}
