import { Logo } from "@/components/Logo";
import Link from "next/link";
import {
  EnvelopeIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Logo />
        <p className="text-center text-gray-700 max-w-md text-lg">
          Welcome to Premier Inn Group Bookings. Experience exceptional comfort
          and service for your group stay.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/en-GB"
            className="rounded-full border border-solid border-transparent transition-all duration-300 transform hover:scale-110 flex items-center justify-center bg-indigo-600 text-white gap-2 hover:bg-indigo-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 whitespace-nowrap"
          >
            <EnvelopeIcon className="w-5 h-5" />
            Send Enquiry
          </Link>
          <Link
            href="/en-GB"
            className="rounded-full border border-solid border-gray-200 transition-all duration-300 transform hover:scale-110 flex items-center justify-center hover:bg-gray-50 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 whitespace-nowrap text-black"
          >
            <CalendarIcon className="w-5 h-5 mr-1" />
            Book Us Now
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-gray-600">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.premierinn.com/gb/en/why.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <QuestionMarkCircleIcon className="w-5 h-5" />
          Why Choose Us
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.premierinn.com/gb/en/hotels.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BuildingOfficeIcon className="w-5 h-5" />
          Our Locations
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.premierinn.com/gb/en/help.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <QuestionMarkCircleIcon className="w-5 h-5" />
          Help & Support →
        </a>
      </footer>
    </div>
  );
}
