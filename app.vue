<script setup>
import '@unocss/reset/tailwind.css'
import LoadingIndicator from './components/LoadingIndicator'

const img = useImage()

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  charset: 'utf-8',
  title: 'Nuxic',
  titleTemplate: title => title !== 'Nuxic' ? `${title} · Nuxic` : title,
  meta: [
    { name: 'description', content: 'A music app built with Nuxt 3 and Deezer API.' },
    // { property: 'og:image', content: 'https://nuxic.deivi.me/img/og_img.png' },
    { property: 'og:image', content: img('/img/og_img.png', { width: 1200, height: 630 }) },
    { property: 'og:type', content: 'website' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:domain', content: 'nuxic.deivi.me' },
    { property: 'twitter:url', content: 'https://nuxic.deivi.me/' },

  ],
  link: [{ rel: 'icon', type: 'image/webp', href: '/img/icon.png' },
  ],
})
</script>

<template>
  <LoadingIndicator :duration="10000" />
  <NuxtLayout name="default">
    <div h-full w-full font-sans of-hidden>
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  font-family: 'Quicksand';
  height: 100vh;
  margin: 0;
  font-size: 14px;
  padding: 0;
  color: white;
  color-scheme: dark;
  @apply bg-black;

  --radius: 5px;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background: transparent;
}

::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(80, 80, 80, 0.61);
  border-radius: 5px;
  transition: all;
  transition-duration: 100ms;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(80, 80, 80, 0.71);
}
.no-touch {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
