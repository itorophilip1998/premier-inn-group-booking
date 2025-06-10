import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { BookingProvider } from "@/context/BookingContext";
import messages from "@/messages/en-GB.json";
import Page from "../page";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/en-GB/success",
}));

// Mock react-confetti
jest.mock("react-confetti", () => {
  return function MockConfetti() {
    return <div data-testid="confetti" />;
  };
});

const mockBookingData = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+1234567890",
  company: "Test Company",
  groupSize: "1-10",
  arrivalDate: "2024-12-01",
  departureDate: "2024-12-05",
  location: "London",
  requirements: "Test requirements",
};

const renderPage = () => {
  return render(
    <NextIntlClientProvider locale="en-GB" messages={messages}>
      <BookingProvider initialData={mockBookingData}>
        <Page />
      </BookingProvider>
    </NextIntlClientProvider>
  );
};

describe("SuccessPage", () => {
  it("renders success message and booking details", async () => {
    await act(async () => {
      renderPage();
    });

    // Check for booking details
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("+1234567890")).toBeInTheDocument();
    expect(screen.getByText("Test Company")).toBeInTheDocument();
    expect(screen.getByText("1-10")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();

    // Check for done button
    expect(screen.getByText("Done")).toBeInTheDocument();

    // Check for confetti
    expect(screen.getByTestId("confetti")).toBeInTheDocument();
  });

  it("shows no booking data message when no data is available", async () => {
    await act(async () => {
      render(
        <NextIntlClientProvider locale="en-GB" messages={messages}>
          <BookingProvider>
            <Page />
          </BookingProvider>
        </NextIntlClientProvider>
      );
    });

    expect(screen.getByText("No booking data found")).toBeInTheDocument();
  });
});
