"use client";

import { createContext, useContext } from "react";

interface I18nContextValue {
  locale: "ar";
  direction: "rtl";
}

const I18nContext = createContext<I18nContextValue>({
  locale: "ar",
  direction: "rtl",
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nContext.Provider value={{ locale: "ar", direction: "rtl" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  return useContext(I18nContext);
}
