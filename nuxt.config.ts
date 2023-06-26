const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  plugins: [
    { src: '~/plugins/aos', mode: 'client' },
  ],
  imports: {
    dirs: ['./stores', 'composables/**'],
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    'nuxt-headlessui',
  ],
  experimental: {
    inlineSSRStyles: false,
    viewTransition: true,
    renderJsonPayloads: true,
  },
  routeRules: {
    '/': { swr: false },
    '/genres': { prerender: true },
    '/radio': { prerender: true },
    '/faq': { prerender: true },
    '/recent': { ssr: false },
    '/favorites': { ssr: false },
    '/**': isDev ? {} : { cache: { swr: true, maxAge: 60 * 60, staleMaxAge: 60 * 60, headersOnly: true } },
  },
  runtimeConfig: {
  },
  devtools: {
    enabled: true,
  },
  nitro: {
    routeRules: {
      '/**': { isr: false },
    },
  },
  pinia: {
    autoImports: [
      'defineStore', 'useStore', 'acceptHMRUpdate', 'storeToRefs',
    ],
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: false,
      fallbackLocale: 'en',
    },
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'es-ES',
        file: 'es-ES.json',
      },
    ],
    lazy: true,
    langDir: 'internationalization',
    defaultLocale: 'en',
  },
})
