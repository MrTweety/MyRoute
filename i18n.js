import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonPL from "./app/assets/translations/pl/common";
import commonEN from "./app/assets/translations/en/common";
import commonFR from "./app/assets/translations/fr/common";
import homeScreenPL from "./app/assets/translations/pl/homeScreen";
import homeScreenEN from "./app/assets/translations/en/homeScreen";
import homeScreenFR from "./app/assets/translations/fr/homeScreen";
import mapScreenPL from "./app/assets/translations/pl/mapScreen";
import mapScreenEN from "./app/assets/translations/en/mapScreen";
import mapScreenFR from "./app/assets/translations/fr/mapScreen";
import profileScreenFR from "./app/assets/translations/fr/profileScreen";
import profileScreenEN from "./app/assets/translations/en/profileScreen";
import profileScreenPL from "./app/assets/translations/pl/profileScreen";

const resources = {
  pl: {
    translation: {
      common: { ...commonPL },
      home: { ...homeScreenPL },
      map: { ...mapScreenPL },
      profile: { ...profileScreenPL }
    }
  },
  en: {
    translation: {
      common: { ...commonEN },
      home: { ...homeScreenEN },
      map: { ...mapScreenEN },
      profile: { ...profileScreenEN }
    }
  },
  fr: {
    translation: {
      common: { ...commonFR },
      home: { ...homeScreenFR },
      map: { ...mapScreenFR },
      profile: { ...profileScreenFR }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pl",
  fallbackLng: ["en", "pl", "fr"],
  interpolation: {
    escapeValue: false
  }
});
