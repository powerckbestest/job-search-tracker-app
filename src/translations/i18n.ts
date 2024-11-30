import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './en.json';
import ruTranslations from './ru.json';

const languageDetector = new LanguageDetector();
languageDetector.init({
  order: ['querystring', 'localStorage', 'navigator', 'cookie'],
  caches: ['localStorage', 'cookie'],
});

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ru'],
    resources: {
      en: { translation: enTranslations },
      ru: { translation: ruTranslations },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
