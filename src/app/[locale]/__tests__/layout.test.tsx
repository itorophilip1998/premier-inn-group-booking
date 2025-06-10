import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { BookingProvider } from "@/context/BookingContext";
import messages from "@/messages/en-GB.json";
import Layout from "../layout";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const renderLayout = () => {
  return render(
    <NextIntlClientProvider locale="en-GB" messages={messages}>
      <BookingProvider>
        <Layout params={Promise.resolve({ locale: "en-GB" })}>
          <div>Test Content</div>
        </Layout>
      </BookingProvider>
    </NextIntlClientProvider>
  );
};

describe("Layout", () => {
  it("renders layout with children", () => {
    renderLayout();

    // Check for test content
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders layout with valid locale", () => {
    renderLayout();

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders language switcher", () => {
    renderLayout();

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders with Spanish locale", () => {
    renderLayout();

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
