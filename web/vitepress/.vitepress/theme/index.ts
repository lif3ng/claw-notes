import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import LangToggle from './LangToggle.vue'
import PostList from './PostList.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LangToggle', LangToggle)
    app.component('PostList', PostList)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(LangToggle),
    })
  },
}
