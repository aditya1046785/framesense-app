"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations, TranslationKey } from '@/lib/i18n';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, replacements?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey, replacements?: { [key: string]: string | number }): string => {
    const keys = key.split('.');
    let text = translations[language];
    
    for (const k of keys) {
      if (text && typeof text === 'object' && k in text) {
        text = text[k];
      } else {
        return key; // Return the key itself if not found
      }
    }

    if (typeof text !== 'string') return key;

    if (replacements) {
        Object.entries(replacements).forEach(([key, value]) => {
            text = (text as string).replace(`{{${key}}}`, String(value));
        });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
