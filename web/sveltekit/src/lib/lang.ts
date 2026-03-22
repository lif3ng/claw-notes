import { writable } from 'svelte/store'

export type Lang = 'zh' | 'en'

const LANG_KEY = 'claw-notes-lang'

function createLangStore() {
  let initial: Lang = 'zh'
  if (typeof localStorage !== 'undefined') {
    initial = (localStorage.getItem(LANG_KEY) as Lang) || 'zh'
  }

  const { subscribe, set, update } = writable<Lang>(initial)

  return {
    subscribe,
    set: (val: Lang) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(LANG_KEY, val)
      }
      set(val)
    },
    update
  }
}

export const lang = createLangStore()
