<script lang="ts" setup>
import type { Album } from '~/types'

const props = defineProps<{ album: Album }>()
</script>

<template>
  <NuxtLink :to="`/albums/${album.id}`">
    <div flex justify-start hover:bg-white:10 cursor-pointer round p2>
      <NuxtImg
        v-if="album.cover_small"
        rounded-lg object-cover
        width="50"
        :src="album.cover_small" fit="cover" loading="lazy"
      />
      <div ml5>
        <h2 font-semibold text-lg>
          {{ album.title }}
        </h2>

        <p op60 flex items-center space-x3>
          Artist: {{ album.artist.name }}
          <span mx2>·</span>
          {{ album.nb_tracks }} tracks
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped></style>
