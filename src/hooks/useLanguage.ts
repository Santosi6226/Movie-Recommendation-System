import { useState, useEffect, useCallback } from "react";
import { LanguageCode, translations } from "@/lib/i18n";

const STORAGE_KEY = "app-language";

export function useLanguage() {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (stored && translations[stored]) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const t = useCallback(
    (key: string) => {
      return translations[language]?.[key] || translations.en[key] || key;
    },
    [language]
  );

  return { language, setLanguage, t };
}
