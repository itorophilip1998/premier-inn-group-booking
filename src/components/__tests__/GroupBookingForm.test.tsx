import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GroupBookingForm } from "../GroupBookingForm";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { BookingProvider } from "@/context/BookingContext";

// Mock the next-intl hooks
jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
  useLocale: jest.fn(() => "en-GB"),
}));

// Mock the next/navigation hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the BookingContext
jest.mock("@/context/BookingContext", () => ({
  useBooking: jest.fn(),
  BookingProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("GroupBookingForm", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockSetBookingData = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup default mock implementations
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useBooking as jest.Mock).mockReturnValue({
      setBookingData: mockSetBookingData,
    });

    // Mock translations
    (useTranslations as jest.Mock).mockImplementation((namespace) => {
      const translations: Record<string, string> = {
        "form.fields.firstName.label": "First Name",
        "form.fields.lastName.label": "Last Name",
        "form.fields.email.label": "Email Address",
        "form.fields.phone.label": "Phone Number",
        "form.fields.company.label": "Company Name",
        "form.fields.groupSize.label": "Group Size",
        "form.fields.arrivalDate.label": "Arrival Date",
        "form.fields.departureDate.label": "Departure Date",
        "form.fields.location.label": "Preferred Location",
        "form.fields.requirements.label": "Special Requirements",
        "form.fields.firstName.error": "First name is required",
        "form.fields.lastName.error": "Last name is required",
        "form.fields.email.error": "Invalid email address",
        "form.fields.phone.error": "Phone number must be at least 10 digits",
        "form.fields.company.error": "Company name is required",
        "form.fields.groupSize.error": "Group size is required",
        "form.fields.arrivalDate.error": "Arrival date is required",
        "form.fields.departureDate.error": "Departure date is required",
        "form.fields.location.error": "Location is required",
        "form.fields.Submit": "Submit Booking",
        "form.subtitle":
          "Fill out the form below to make a group booking enquiry. Our team will get back to you shortly.",
      };
      return (key: string) => translations[`${namespace}.${key}`] || key;
    });
  });

  const renderForm = () => {
    return render(
      <BookingProvider>
        <GroupBookingForm />
      </BookingProvider>
    );
  };

  it("renders all form fields", () => {
    renderForm();

    // Check for all form fields
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Company Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Group Size")).toBeInTheDocument();
    expect(screen.getByLabelText("Arrival Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Departure Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Preferred Location")).toBeInTheDocument();
    expect(screen.getByLabelText("Special Requirements")).toBeInTheDocument();
  });

  it("validates email format", async () => {
    renderForm();

    const emailInput = screen.getByLabelText("Email Address");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  it("validates required fields", async () => {
    renderForm();

    const submitButton = screen.getByRole("button", { name: "Submit Booking" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("First name is required")).toBeInTheDocument();
      expect(screen.getByText("Last name is required")).toBeInTheDocument();
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
      expect(
        screen.getByText("Phone number must be at least 10 digits")
      ).toBeInTheDocument();
      expect(screen.getByText("Company name is required")).toBeInTheDocument();
      expect(screen.getByText("Group size is required")).toBeInTheDocument();
      expect(screen.getByText("Arrival date is required")).toBeInTheDocument();
      expect(
        screen.getByText("Departure date is required")
      ).toBeInTheDocument();
      expect(screen.getByText("Location is required")).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    renderForm();

    // Fill in all required fields
    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Company Name"), {
      target: { value: "Test Company" },
    });
    fireEvent.change(screen.getByLabelText("Group Size"), {
      target: { value: "1-10" },
    });
    fireEvent.change(screen.getByLabelText("Arrival Date"), {
      target: { value: "2024-12-01" },
    });
    fireEvent.change(screen.getByLabelText("Departure Date"), {
      target: { value: "2024-12-05" },
    });
    fireEvent.change(screen.getByLabelText("Preferred Location"), {
      target: { value: "London" },
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: "Submit Booking" });
    fireEvent.click(submitButton);

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(mockSetBookingData).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        company: "Test Company",
        groupSize: "1-10",
        arrivalDate: "2024-12-01",
        departureDate: "2024-12-05",
        location: "London",
        requirements: "",
      });
      expect(mockRouter.push).toHaveBeenCalledWith("/en-GB/success");
    });
  });
});
