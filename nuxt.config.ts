// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  nitro: {
    preset: 'github-pages'
  },
  app: {
    baseURL: '/yue-dict/', // Replace with your GitHub repo name
    buildAssetsDir: 'assets/'
  },
  ssr: false, // Enable SPA mode for GitHub Pages,
  runtimeConfig: {
    public: {
      dictionaryApiBase: process.env.NUXT_PUBLIC_DICTIONARY_API_BASE
    }
  }
})

