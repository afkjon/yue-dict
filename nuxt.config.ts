export default defineNuxtConfig({
  compatibilityDate: '2025-07-20',
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
  unhead: {
    legacy: true
  },
  typescript: {
    typeCheck: true
  }
})
