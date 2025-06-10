"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import AOS from "aos";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function SuccessPage() {
  const t = useTranslations("form");
  const locale = useLocale();
  const router = useRouter();
  const { bookingData } = useBooking();
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Set window size for confetti
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDone = () => {
    router.push(`/${locale}`);
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">No booking data found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={500}
      />
      <div className="max-w-3xl  mt-12 mx-auto">
        {/* <div data-aos="fade-down" className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            {t("success.title")}
          </h1>
          <p className="mt-4 text-xl text-gray-600">{t("success.subtitle")}</p>
        </div> */}

        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div data-aos="fade-right" className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("fields.firstName.label")}
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {bookingData.firstName}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("fields.lastName.label")}
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {bookingData.lastName}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("fields.email.label")}
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {bookingData.email}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("fields.phone.label")}
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {bookingData.phone}
                </p>
              </div>
            </div>

            <div data-aos="fade-left" className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("fields.company.label")}
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {bookingData.company}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("fields.groupSize.label")}
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {bookingData.groupSize}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("fields.arrivalDate.label")}
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {bookingData.arrivalDate}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  {t("fields.departureDate.label")}
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {bookingData.departureDate}
                </p>
              </div>
            </div>
          </div>

          {bookingData.requirements && (
            <div data-aos="fade-up" className="mt-6">
              <h3 className="text-sm font-medium text-gray-500">
                {t("fields.requirements.label")}
              </h3>
              <p className="mt-1 text-lg text-gray-900">
                {bookingData.requirements}
              </p>
            </div>
          )}

          <div data-aos="fade-up" className="mt-8 flex justify-center">
            <button
              onClick={handleDone}
              className="inline-flex justify-center rounded-md border px-5 border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
