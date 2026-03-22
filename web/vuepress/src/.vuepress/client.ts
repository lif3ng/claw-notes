import { defineClientConfig } from 'vuepress/client'
import LangToggle from './components/LangToggle.vue'
import PostList from './components/PostList.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('LangToggle', LangToggle)
    app.component('PostList', PostList)
  },
  setup() {
    // Apply language class on every navigation
    if (typeof window !== 'undefined') {
      const applyLang = () => {
        const lang = localStorage.getItem('claw-notes-lang') || 'zh'
        document.documentElement.setAttribute('data-lang', lang)
      }
      applyLang()
    }
  },
})
