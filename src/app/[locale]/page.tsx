import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { GroupBookingForm } from "@/components/GroupBookingForm";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { Logo } from "@/components/Logo";

export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  const t = useTranslations("form");

  return (
    <main className="min-h-screen bg-gray-200">
      <PerformanceMonitor />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        <div className="text-center mb-12">
          <Logo />
        </div>
        <div className="mt-8">
          <GroupBookingForm />
        </div>
      </div>
    </main>
  );
}
