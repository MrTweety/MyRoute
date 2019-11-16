import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonPL from "./app/assets/translations/pl/common";
import commonEN from "./app/assets/translations/en/common";
import homeScreenPL from "./app/assets/translations/pl/homeScreen";
import homeScreenEN from "./app/assets/translations/en/homeScreen";

const resources = {
  pl: {
    translation: {
      common: { ...commonPL },
      home: { ...homeScreenPL }
    }
  },
  en: {
    translation: {
      common: { ...commonEN },
      home: { ...homeScreenEN }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pl",
  fallbackLng: ["en", "pl"],
  interpolation: {
    escapeValue: false
  }
});
