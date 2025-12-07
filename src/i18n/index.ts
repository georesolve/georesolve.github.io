import { en, Translations } from './translations/en';
import { vi } from './translations/vi';

export type Language = 'en' | 'vi';

export const translations: Record<Language, Translations> = {
    en,
    vi,
};

export const languageNames: Record<Language, string> = {
    en: 'English',
    vi: 'Tiếng Việt',
};

export const languageFlags: Record<Language, string> = {
    en: '🇺🇸',
    vi: '🇻🇳',
};

export { en, vi };
export type { Translations };

