import { getRequestConfig } from "next-intl/server";
import type { GetRequestConfigParams } from "next-intl/server";

export const locales = ["en-GB", "de-DE"] as const;
export const defaultLocale = "en-GB" as const;

export default getRequestConfig(async ({ locale }: GetRequestConfigParams) => ({
  locale: locale || defaultLocale,
  messages: (await import(`../messages/${locale || defaultLocale}.json`))
    .default,
}));
