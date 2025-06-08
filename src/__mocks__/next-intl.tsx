import React from "react";

export const useTranslations = () => (key: string) => key;
export const useLocale = () => "en-GB";
export const useNow = () => new Date();
export const useTimeZone = () => "UTC";
export const useMessages = () => ({});
export const useFormatter = () => ({
  dateTime: () => "",
  number: () => "",
  relativeTime: () => "",
});
export const NextIntlClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => <>{children}</>;
