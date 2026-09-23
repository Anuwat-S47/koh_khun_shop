import { en } from "../languages/en";
import { lo } from "../languages/lo";
import { th } from "../languages/th";
import { useLanguageStore } from "../stores/language-store";

const translations = {
  th,
  lo,
  en,
};

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);

  const current = translations[language];

  const translate = (key: string) => {
    return key.split(".").reduce((obj: any, k) => obj?.[k], current) ?? key;
  };

  return {
    t: Object.assign(translate, current),
    language,
  };
}
