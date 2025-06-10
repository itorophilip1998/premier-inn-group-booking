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

    expect(screen.getByLabelText("firstName.label")).toBeInTheDocument();
    expect(screen.getByLabelText("lastName.label")).toBeInTheDocument();
    expect(screen.getByLabelText("email.label")).toBeInTheDocument();
    expect(screen.getByLabelText("phone.label")).toBeInTheDocument();
    expect(screen.getByLabelText("company.label")).toBeInTheDocument();
    expect(screen.getByLabelText("groupSize.label")).toBeInTheDocument();
    expect(screen.getByLabelText("arrivalDate.label")).toBeInTheDocument();
    expect(screen.getByLabelText("departureDate.label")).toBeInTheDocument();
    expect(screen.getByLabelText("location.label")).toBeInTheDocument();
    expect(screen.getByLabelText("requirements.label")).toBeInTheDocument();
  });

  it("shows validation errors for required fields", async () => {
    renderForm();
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("First name is required")).toBeInTheDocument();
      expect(screen.getByText("Last name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });

  it("validates email format", async () => {
    renderForm();
    const emailInput = screen.getByLabelText("email.label");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    renderForm();

    // Fill in the form
    fireEvent.change(screen.getByLabelText("firstName.label"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("lastName.label"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("email.label"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("phone.label"), {
      target: { value: "+1234567890" },
    });
    fireEvent.change(screen.getByLabelText("company.label"), {
      target: { value: "Test Company" },
    });
    fireEvent.change(screen.getByLabelText("groupSize.label"), {
      target: { value: "1-10" },
    });
    fireEvent.change(screen.getByLabelText("arrivalDate.label"), {
      target: { value: "2024-12-01" },
    });
    fireEvent.change(screen.getByLabelText("departureDate.label"), {
      target: { value: "2024-12-05" },
    });
    fireEvent.change(screen.getByLabelText("location.label"), {
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
