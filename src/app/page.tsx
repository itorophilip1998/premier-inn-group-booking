import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Logo />
        <p className="text-center text-gray-600 max-w-2xl">
          Welcome to Premier Inn&apos;s Group Booking Portal. We offer
          comfortable accommodations for groups of all sizes.
        </p>

        <div className="flex items-center justify-center">
          <a
            className="rounded-full border border-solid border-gray-300 transition-colors flex items-center justify-center bg-white text-gray-700 gap-2 hover:bg-gray-50 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/en-GB"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            Book us now
          </a>
        </div>
      </main>
    </div>
  );
}
