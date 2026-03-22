'use client';

import { useLang } from '@/hooks/useLang';

export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <button
      onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
      className="font-mono text-sm border border-black px-2 py-0.5 hover:bg-black hover:text-white transition-colors"
      aria-label="Toggle language"
    >
      {lang === 'zh' ? 'EN' : '中'}
    </button>
  );
}
