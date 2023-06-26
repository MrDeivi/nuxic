import AOS from 'aos'
import { defineNuxtPlugin } from '#app'
import 'aos/dist/aos.css'

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window !== 'undefined') {
    nuxtApp.AOS = AOS.init({
      once: true,
    })
  }
})
