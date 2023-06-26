<script lang="ts" setup>
import type { Artist } from '~/types'

const props = defineProps<{ artist: Artist }>()
</script>

<template>
  <NuxtLink :to="`/artists/${artist.id}`">
    <div flex justify-start hover:bg-white:10 cursor-pointer round p2>
      <NuxtImg
        v-if="artist.picture_small"
        rounded-lg object-cover
        width="50"
        :src="artist.picture_small" fit="cover" loading="lazy"
      />
      <div ml5>
        <h2 font-semibold text-lg>
          {{ artist.name }}
        </h2>

        <p op60 flex items-center space-x3>
          Fans: {{ Number(artist.nb_fan).toLocaleString('en') }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped></style>
