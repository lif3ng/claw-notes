import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    baseURL: '/web/nuxt/'
  },
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true
  },
  nitro: {
    preset: 'static'
  }
})
