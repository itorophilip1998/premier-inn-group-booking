"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function LanguageSwitcher() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-900">{t("language")}</span>
      <select
        value={locale}
        onChange={(e) => switchLocale(e.target.value)}
        className="rounded-md border border-gray-300 text-gray-900 p-2 text-sm"
        aria-label={t("language")}
      >
        <option value="en-GB">{t("switchToEnglish")}</option>
        <option value="de-DE">{t("switchToGerman")}</option>
      </select>
    </div>
  );
}
