import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
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

const renderLayout = async () => {
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
  it("renders layout with children", async () => {
    await act(async () => {
      await renderLayout();
    });

    // Check for test content
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders layout with valid locale", async () => {
    await act(async () => {
      await renderLayout();
    });

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders language switcher", async () => {
    await act(async () => {
      await renderLayout();
    });

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders with Spanish locale", async () => {
    await act(async () => {
      await renderLayout();
    });

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
