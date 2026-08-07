import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Language } from "../types/language-type";

type LanguageState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "th",

      setLanguage: (language) => {
        set({ language });
      },
    }),
    {
      name: "app-language",
    },
  ),
);