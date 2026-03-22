'use client';

import { createContext, useContext, useState, useEffect, ReactNode, createElement } from 'react';

export type Lang = 'zh' | 'en';

const LANG_KEY = 'claw-notes-lang';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const LangContext = createContext<LangContextValue>({
  lang: 'zh',
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');

  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY) as Lang | null;
    if (stored === 'zh' || stored === 'en') {
      setLangState(stored);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem(LANG_KEY, newLang);
  };

  return createElement(LangContext.Provider, { value: { lang, setLang } }, children);
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
