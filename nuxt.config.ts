export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      heyGenToken: process.env.HEYGEN_TOKEN
    }
  }
})
