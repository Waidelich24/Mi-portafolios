'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import es from '../../locales/es.json';
import en from '../../locales/en.json';
import pt from '../../locales/pt.json';

export type Language = 'en' | 'es' | 'pt';

type TranslationValue = string | number | boolean | null | TranslationRecord | TranslationValue[];
interface TranslationRecord {
  [key: string]: TranslationValue;
}

const messages = { en, es, pt } as const;
const STORAGE_KEY = 'portfolio-language';
const DEFAULT_LANGUAGE: Language = 'en';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  tRaw: <T = TranslationValue>(key: string) => T;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNestedValue(obj: TranslationRecord, path: string): TranslationValue | undefined {
  return path.split('.').reduce<TranslationValue | undefined>((acc, segment) => {
    if (acc && typeof acc === 'object' && !Array.isArray(acc) && segment in acc) {
      return (acc as TranslationRecord)[segment];
    }
    return undefined;
  }, obj);
}

function isValidLanguage(value: string | null): value is Language {
  return value === 'en' || value === 'es' || value === 'pt';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isValidLanguage(stored)) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  };

  const value = useMemo<LanguageContextValue>(() => {
    const dictionary = messages[language] as TranslationRecord;

    const tRaw = <T = TranslationValue,>(key: string): T => {
      const result = getNestedValue(dictionary, key);
      return (result as T) ?? (key as T);
    };

    const t = (key: string): string => {
      const result = getNestedValue(dictionary, key);
      if (typeof result === 'string' || typeof result === 'number') {
        return String(result);
      }
      return key;
    };

    return {
      language,
      setLanguage,
      t,
      tRaw,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }
  return context;
}