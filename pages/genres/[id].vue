<script lang="ts" setup>
import { DEEZER } from '~/constants'
import type { Artist, Genre } from '~/types'

const route = useRoute()
definePageMeta({ validate: async route => /^\d+$/.test(route.params.id as string) })

const id = computed(() => route.params.id as string)
const { data: genre } = await useFetch<Genre>(() => `${DEEZER().genre}/${id.value}`)

if (!genre.value || (genre.value as any).error)
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })

const { data } = await useFetch<{ data: Artist[] }>(DEEZER().genreId(id.value))

const title = computed(() => `${genre.value?.name} artists`)

useSeoMeta({
  title: genre.value.name,
  description: `Explore hundreds of ${genre.value.name} tracks in nuxic.`,
  ogImage: genre.value.picture_big,
})
</script>

<template>
  <div p="x2 y3" lt-md:py-0 lt-md:px-3>
    <MusicContainer
      :navigate-back="true"
      :always-grid="true" grid-class="!grid-cols-minmax-10rem lg:!grid-cols-minmax-9rem"
      :title="title"
    >
      <CardArtist
        v-for="(artist, j) in data?.data"
        :key="j"
        :artist="artist"
      />
    </MusicContainer>
  </div>
</template>

<style lang="scss" scoped></style>
