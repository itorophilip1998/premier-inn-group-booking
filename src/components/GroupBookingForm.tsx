"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CalendarIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

import { useBooking } from "@/context/BookingContext";
import {
  groupBookingSchema,
  type GroupBookingFormData,
} from "@/utils/validation/validations";

const labelVariants = {
  focus: { y: -20, scale: 0.8, color: "#4F46E5" },
  blur: { y: 0, scale: 1, color: "#6B7280" },
};

export function GroupBookingForm() {
  const t = useTranslations("form");
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
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white rounded-lg shadow p-[2rem]"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("title")}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <motion.div className="relative" whileHover={{ scale: 1.02 }}>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 pl-10 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
              placeholder={t("firstName.placeholder")}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
            <motion.label
              htmlFor="firstName"
              variants={labelVariants}
              initial="blur"
              whileFocus="focus"
              className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
            >
              {t("firstName.label")}
            </motion.label>
          </div>
          {errors.firstName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.firstName.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="relative" whileHover={{ scale: 1.02 }}>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 pl-10 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
              placeholder={t("lastName.placeholder")}
              aria-invalid={errors.lastName ? "true" : "false"}
            />
            <motion.label
              htmlFor="lastName"
              variants={labelVariants}
              initial="blur"
              whileFocus="focus"
              className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
            >
              {t("lastName.label")}
            </motion.label>
          </div>
          {errors.lastName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.lastName.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="relative" whileHover={{ scale: 1.02 }}>
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              id="email"
              {...register("email")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 pl-10 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
              placeholder={t("email.placeholder")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            <motion.label
              htmlFor="email"
              variants={labelVariants}
              initial="blur"
              whileFocus="focus"
              className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
            >
              {t("email.label")}
            </motion.label>
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="relative" whileHover={{ scale: 1.02 }}>
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 pl-10 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
              placeholder={t("phone.placeholder")}
              aria-invalid={errors.phone ? "true" : "false"}
            />
            <motion.label
              htmlFor="phone"
              variants={labelVariants}
              initial="blur"
              whileFocus="focus"
              className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
            >
              {t("phone.label")}
            </motion.label>
          </div>
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.phone.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="relative" whileHover={{ scale: 1.02 }}>
          <div className="relative">
            <BuildingOfficeIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="company"
              {...register("company")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 pl-10 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
              placeholder={t("company.placeholder")}
              aria-invalid={errors.company ? "true" : "false"}
            />
            <motion.label
              htmlFor="company"
              variants={labelVariants}
              initial="blur"
              whileFocus="focus"
              className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
            >
              {t("company.label")}
            </motion.label>
          </div>
          {errors.company && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.company.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="relative" whileHover={{ scale: 1.02 }}>
          <div className="relative">
            <UserGroupIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
              id="groupSize"
              {...register("groupSize")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 pl-10 p-4 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&>option]:bg-white [&>option]:text-gray-900"
              aria-invalid={errors.groupSize ? "true" : "false"}
            >
              <option value="">{t("groupSize.placeholder")}</option>
              <option value="1-10">1-10</option>
              <option value="11-20">11-20</option>
              <option value="21-50">21-50</option>
              <option value="51+">51+</option>
            </select>
            <motion.label
              htmlFor="groupSize"
              variants={labelVariants}
              initial="blur"
              whileFocus="focus"
              className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
            >
              {t("groupSize.label")}
            </motion.label>
          </div>
          {errors.groupSize && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.groupSize.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="relative" whileHover={{ scale: 1.02 }}>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              id="arrivalDate"
              {...register("arrivalDate")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 pl-10 p-4 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              aria-invalid={errors.arrivalDate ? "true" : "false"}
            />
            <motion.label
              htmlFor="arrivalDate"
              variants={labelVariants}
              initial="blur"
              whileFocus="focus"
              className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
            >
              {t("arrivalDate.label")}
            </motion.label>
          </div>
          {errors.arrivalDate && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.arrivalDate.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="relative" whileHover={{ scale: 1.02 }}>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              id="departureDate"
              {...register("departureDate")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 pl-10 p-4 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              aria-invalid={errors.departureDate ? "true" : "false"}
            />
            <motion.label
              htmlFor="departureDate"
              variants={labelVariants}
              initial="blur"
              whileFocus="focus"
              className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
            >
              {t("departureDate.label")}
            </motion.label>
          </div>
          {errors.departureDate && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.departureDate.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="relative col-span-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="location"
              {...register("location")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 pl-10 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm [&:-webkit-autofill]:!bg-white [&:-webkit-autofill]:!shadow-none [&:-webkit-autofill]:!text-gray-900 [&:-webkit-autofill]:![-webkit-text-fill-color:rgb(17,24,39)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0_1000px_white_inset]"
              placeholder={t("location.placeholder")}
              aria-invalid={errors.location ? "true" : "false"}
            />
            <motion.label
              htmlFor="location"
              variants={labelVariants}
              initial="blur"
              whileFocus="focus"
              className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
            >
              {t("location.label")}
            </motion.label>
          </div>
          {errors.location && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.location.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="relative col-span-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative">
            <ChatBubbleLeftRightIcon className="absolute left-3 top-6 h-5 w-5 text-gray-400" />
            <textarea
              id="requirements"
              {...register("requirements")}
              className="peer mt-1 block w-full rounded-md border border-gray-300 pl-10 p-4 text-gray-900 placeholder:text-transparent focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={t("requirements.placeholder")}
              rows={4}
            />
            <motion.label
              htmlFor="requirements"
              variants={labelVariants}
              initial="blur"
              whileFocus="focus"
              className="pointer-events-none absolute left-10 top-1 -translate-y-1/2 bg-white px-1 text-[12px] text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[12px] peer-focus:text-indigo-600"
            >
              {t("requirements.label")}
            </motion.label>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="flex justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            t("submit")
          )}
        </button>
      </motion.div>
    </motion.form>
  );
}
