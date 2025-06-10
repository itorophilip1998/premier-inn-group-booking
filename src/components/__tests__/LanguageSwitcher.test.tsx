import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/en-GB.json";
import { useTranslations } from "use-intl";

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname: () => "/en-GB",
  useRouter: () => ({
    push: mockPush,
  }),
}));

// const renderLanguageSwitcher = () => {
//   return render(
//     <NextIntlClientProvider locale="en-GB" messages={messages}>
//       <LanguageSwitcher />
//     </NextIntlClientProvider>
//   );
// };

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    mockPush.mockClear();
    (useTranslations as jest.Mock).mockImplementation(() => {
      const translations: Record<string, string> = {
        "firstName.error": "First name is required",
        "lastName.error": "Last name is required",
        "email.error": "Invalid email address",
        "phone.error": "Phone number must be at least 10 digits",
        "company.error": "Company name is required",
        "groupSize.error": "Group size is required",
        "arrivalDate.error": "Arrival date is required",
        "departureDate.error": "Departure date is required",
        "location.error": "Location is required",
        // ...other keys
      };
      return (key: string) => translations[key] || key;
    });
  });
});
