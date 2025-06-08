import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { NextIntlClientProvider } from "next-intl";
import { messages } from "@/messages/en-GB.json";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/en-GB",
}));

const renderLanguageSwitcher = () => {
  return render(
    <NextIntlClientProvider locale="en-GB" messages={messages}>
      <LanguageSwitcher />
    </NextIntlClientProvider>
  );
};

describe("LanguageSwitcher", () => {
  it("renders language options", () => {
    renderLanguageSwitcher();
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("en-GB");
  });

  it("changes language when selecting a different option", () => {
    renderLanguageSwitcher();
    const select = screen.getByRole("combobox");

    // Mock the window.location.href
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: "" } as any;

    fireEvent.change(select, { target: { value: "de-DE" } });

    // Verify the URL was updated
    expect(window.location.href).toContain("/de-DE");

    // Restore window.location
    window.location = originalLocation;
  });
});
