<script lang="ts" setup>
import type { Artist } from '~/types'
import { DEEZER } from '~/constants'

const { data, fetchMore, loading } = await usePaginatedFetch<Artist>(DEEZER().artists, { limit: 40 })
useInfiniteGrid(loading, fetchMore)

useSeoMeta({
  title: 'Explore artists',
  description: 'Explore hundreds of artists in nuxic.',
})
</script>

<template>
  <MusicContainer
    lt-md:px2 :always-grid="true"
    grid-class="!grid-cols-minmax-10rem lg:!grid-cols-minmax-10rem"
    title="Explore Artists"
  >
    <CardArtist
      v-for="(artist, j) in data"
      :key="j"
      :artist="artist"
    />
  </MusicContainer>

  <div v-if="loading" flex justify-center items-center wfull h-30>
    <div text-primary-300 text-4xl flex i-svg-spinners:3-dots-move />
  </div>
</template>

<style lang="scss" scoped></style>
