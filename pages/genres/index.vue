<script setup lang="ts">
import type { Genre } from '~/types'

const {apiBaseUrl} = useAppConfig()
const { data } = await useFetch<{ data: Genre[] }>(`${apiBaseUrl}/deezer/genre?limit=50`)

useSeoMeta({
  title: 'Explore genres',
  description: 'Explore different music genres in nuxic.',
})
</script>

<template>
  <MusicContainer
    lt-md:px3 :always-grid="true"
    title="Explore Genres"
  >
    <CardGenre
      v-for="(genre, i) in data?.data"
      :key="genre.id"
      :genre="genre"
      data-aos="fade-left"
      :data-aos-delay="100 * i"
      :data-aos-offset="-500"
    />
  </MusicContainer>
</template>
