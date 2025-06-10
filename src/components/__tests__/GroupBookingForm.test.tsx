import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  prettyDOM,
} from "@testing-library/react";
import { GroupBookingForm } from "../GroupBookingForm";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { BookingProvider } from "@/context/BookingContext";

// Mock the validation module
jest.mock("@/utils/validation/validations", () => ({
  groupBookingSchema: {
    _def: {
      typeName: "ZodObject",
      shape: {
        firstName: { _def: { typeName: "ZodString" } },
        lastName: { _def: { typeName: "ZodString" } },
        email: { _def: { typeName: "ZodString" } },
        phone: { _def: { typeName: "ZodString" } },
        company: { _def: { typeName: "ZodString" } },
        groupSize: { _def: { typeName: "ZodString" } },
        arrivalDate: { _def: { typeName: "ZodString" } },
        departureDate: { _def: { typeName: "ZodString" } },
        location: { _def: { typeName: "ZodString" } },
        requirements: { _def: { typeName: "ZodString" } },
      },
    },
    parse: (data: Record<string, unknown>) => data,
    safeParse: (data: Record<string, unknown>) => {
      const errors: Record<string, { message: string }> = {};
      if (!data.firstName)
        errors.firstName = { message: "First name is required" };
      if (!data.lastName)
        errors.lastName = { message: "Last name is required" };
      if (!data.email) errors.email = { message: "Invalid email address" };
      if (!data.phone)
        errors.phone = { message: "Phone number must be at least 10 digits" };
      if (!data.company)
        errors.company = { message: "Company name is required" };
      if (!data.groupSize)
        errors.groupSize = { message: "Group size is required" };
      if (!data.arrivalDate)
        errors.arrivalDate = { message: "Arrival date is required" };
      if (!data.departureDate)
        errors.departureDate = { message: "Departure date is required" };
      if (!data.location) errors.location = { message: "Location is required" };
      if (
        data.email &&
        typeof data.email === "string" &&
        !data.email.includes("@")
      ) {
        errors.email = { message: "Invalid email address" };
      }

      if (Object.keys(errors).length > 0) {
        return {
          success: false,
          error: {
            errors: Object.entries(errors).map(([path, error]) => ({
              path: [path],
              message: error.message,
            })),
          },
        };
      }

      return {
        success: true,
        data,
      };
    },
  },
}));

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
        "firstName.label": "First Name",
        "lastName.label": "Last Name",
        "email.label": "Email Address",
        "phone.label": "Phone Number",
        "company.label": "Company Name",
        "groupSize.label": "Group Size",
        "arrivalDate.label": "Arrival Date",
        "departureDate.label": "Departure Date",
        "location.label": "Preferred Location",
        "firstName.placeholder": "Enter your first name",
        "lastName.placeholder": "Enter your last name",
        "email.placeholder": "Enter your email",
        "phone.placeholder": "Enter your phone number",
        "company.placeholder": "Enter your company name",
        "groupSize.placeholder": "Select group size",
        "location.placeholder": "Enter preferred location",
      };
      return (key: string) => translations[key] || key;
    });
  });

  const renderForm = () => {
    return render(
      <BookingProvider>
        <GroupBookingForm />
      </BookingProvider>
    );
  };

  it("renders all form fields", async () => {
    await act(async () => {
      renderForm();
    });

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
    await act(async () => {
      renderForm();
    });

    // Fill in all required fields first
    await act(async () => {
      fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "John" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Last Name"), {
        target: { value: "Doe" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Phone Number"), {
        target: { value: "1234567890" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Company Name"), {
        target: { value: "Test Company" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Group Size"), {
        target: { value: "1-10" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Arrival Date"), {
        target: { value: "2024-12-01" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Departure Date"), {
        target: { value: "2024-12-05" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Preferred Location"), {
        target: { value: "London" },
      });
    });

    // Now enter invalid email
    const emailInput = screen.getByLabelText("Email Address");
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: "Submit Booking" });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Debug: print the DOM
    // eslint-disable-next-line no-console
    console.log(prettyDOM());

    // Check for error message
    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  it("validates required fields", async () => {
    const { container } = renderForm();

    // Ensure form is rendered
    expect(container).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: "Submit Booking" });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Wait for validation errors to appear one by one
    await waitFor(() => {
      expect(
        screen.getByText("form.fields.firstName.error")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("form.fields.lastName.error")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("form.fields.email.error")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("form.fields.phone.error")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("form.fields.company.error")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("form.fields.groupSize.error")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("form.fields.arrivalDate.error")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("form.fields.departureDate.error")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText("form.fields.location.error")
      ).toBeInTheDocument();
    });
  }, 30000);

  it("submits form with valid data", async () => {
    const mockFetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
    global.fetch = mockFetch;

    await act(async () => {
      renderForm();
    });

    // Fill in all required fields
    await act(async () => {
      fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "John" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Last Name"), {
        target: { value: "Doe" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Email Address"), {
        target: { value: "john@example.com" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Phone Number"), {
        target: { value: "1234567890" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Company Name"), {
        target: { value: "Test Company" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Group Size"), {
        target: { value: "1-10" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Arrival Date"), {
        target: { value: "2024-12-01" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Departure Date"), {
        target: { value: "2024-12-05" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Preferred Location"), {
        target: { value: "London" },
      });
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: "Submit Booking" });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Wait for all async operations to complete
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
      });
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

  it("handles form submission error", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network error"));

    await act(async () => {
      renderForm();
    });

    // Fill in required fields
    await act(async () => {
      fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "John" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Last Name"), {
        target: { value: "Doe" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Email Address"), {
        target: { value: "john@example.com" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Phone Number"), {
        target: { value: "1234567890" },
      });
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: "Submit Booking" });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Check if error is handled
    await waitFor(() => {
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });
});
