import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en/translation.json";
import es from "./es/translation.json";
import ru from "./ru/translation.json";

// Тексты лежат в json, а сами json собирает i18next-cli из вызовов t()
// (`make i18n-extract`, настройки — i18next.config.ts). Руками ни json,
// ни src/@types не правятся.
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    es: { translation: es },
  },
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
