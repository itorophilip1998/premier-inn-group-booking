import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/en-GB.json";

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
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
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders language options", () => {
    renderLanguageSwitcher();
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("en-GB");
  });

  it("changes language when selecting a different option", () => {
    renderLanguageSwitcher();
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "de-DE" } });

    // Verify the router.push was called with the correct path
    expect(mockPush).toHaveBeenCalledWith("/de-DE");
  });
});
