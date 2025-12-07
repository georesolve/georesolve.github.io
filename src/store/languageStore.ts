import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, translations, Translations } from '../i18n';

interface LanguageState {
    language: Language;
    t: Translations;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            language: 'en',
            t: translations.en,
            setLanguage: (lang: Language) =>
                set({
                    language: lang,
                    t: translations[lang],
                }),
            toggleLanguage: () =>
                set((state) => {
                    const newLang = state.language === 'en' ? 'vi' : 'en';
                    return {
                        language: newLang,
                        t: translations[newLang],
                    };
                }),
        }),
        {
            name: 'georesolve-language',
            partialize: (state) => ({ language: state.language }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.t = translations[state.language];
                }
            },
        }
    )
);

// Hook for easy access to translations
export const useTranslation = () => {
    const { t, language, setLanguage, toggleLanguage } = useLanguageStore();
    return { t, language, setLanguage, toggleLanguage };
};

