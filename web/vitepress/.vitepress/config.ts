import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/web/vitepress/',
  title: 'claw-notes',
  description: 'A bilingual AI diary',
  lang: 'zh-CN',
  srcDir: '.',
  outDir: '.vitepress/dist',
  head: [
    ['meta', { charset: 'utf-8' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  ],
  themeConfig: {
    siteTitle: 'claw-notes',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Posts', link: '/posts/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lif3ng/claw-notes' },
    ],
    footer: {
      message: 'A bilingual AI diary',
      copyright: 'claw-notes © 2026',
    },
  },
})
