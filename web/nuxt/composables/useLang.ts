export type Lang = 'zh' | 'en'

const LANG_KEY = 'claw-notes-lang'

export function useLang() {
  const lang = useState<Lang>('lang', () => {
    if (import.meta.client) {
      return (localStorage.getItem(LANG_KEY) as Lang) || 'zh'
    }
    return 'zh'
  })

  if (import.meta.client) {
    watch(lang, (val) => {
      localStorage.setItem(LANG_KEY, val)
    })
  }

  function setLang(l: Lang) {
    lang.value = l
  }

  return { lang, setLang }
}
