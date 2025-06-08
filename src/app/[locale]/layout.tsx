import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { locales } from "@/i18n/request";
import { Metadata } from "next";
import { BookingProvider } from "@/context/BookingContext";
//@typescript-eslint/no-unused-expressions
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premier Inn Group Booking",
  description: "Book group stays at Premier Inn hotels",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  let messages;
  try {
    messages = (await import(`@/utils/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <meta
          httpEquiv="Cache-Control"
          content="public, max-age=31536000, immutable"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <BookingProvider>{children}</BookingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
