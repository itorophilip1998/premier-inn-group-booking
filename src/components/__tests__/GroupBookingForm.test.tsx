import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GroupBookingForm } from "../GroupBookingForm";
import { NextIntlClientProvider } from "next-intl";
import { BookingProvider } from "@/context/BookingContext";
import messages from "@/messages/en-GB.json";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

const renderForm = () => {
  return render(
    <NextIntlClientProvider locale="en-GB" messages={messages}>
      <BookingProvider>
        <GroupBookingForm />
      </BookingProvider>
    </NextIntlClientProvider>
  );
};

describe("GroupBookingForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    renderForm();

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/group size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/arrival date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/departure date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/requirements/i)).toBeInTheDocument();
  });

  it("shows validation errors for required fields", async () => {
    renderForm();
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it("validates email format", async () => {
    renderForm();
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    renderForm();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "+1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/company/i), {
      target: { value: "Test Company" },
    });
    fireEvent.change(screen.getByLabelText(/group size/i), {
      target: { value: "1-10" },
    });
    fireEvent.change(screen.getByLabelText(/arrival date/i), {
      target: { value: "2024-12-01" },
    });
    fireEvent.change(screen.getByLabelText(/departure date/i), {
      target: { value: "2024-12-05" },
    });
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: "London" },
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.any(String),
      });
    });
  });
});
