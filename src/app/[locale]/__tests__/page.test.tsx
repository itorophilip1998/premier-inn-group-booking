import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { BookingProvider } from "@/context/BookingContext";
import messages from "@/messages/en-GB.json";
import Page from "../page";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const renderPage = () => {
  return render(
    <NextIntlClientProvider locale="en-GB" messages={messages}>
      <BookingProvider>
        <Page />
      </BookingProvider>
    </NextIntlClientProvider>
  );
};

describe("HomePage", () => {
  it("renders the main components", () => {
    renderPage();

    // Check for logo
    expect(screen.getByText(/premier inn/i)).toBeInTheDocument();

    // Check for language switcher
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    // Check for form
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});
