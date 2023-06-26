<script lang="ts" setup>
import type { Artist } from '~/types'

defineProps<{ artist: Artist }>()
</script>

<template>
  <NuxtLink
    v-if="artist && artist.id !== 230"
    :to="{ path: `/artists/${artist.id}` }" flex="~ col" class="group" items-center
    :title="artist.name"
  >
    <div
      bg-white:10 relative max-h-38 max-w-38 min-h-38 min-w-38 lt-md:max-w-full overflow-hidden round cursor-pointer mb-4
      class="group relative"
    >
      <div
        bg-white:10 absolute wfull hfull left0 top0
        z-10 op0 group-hover:op100 transition-all duration-200
      />
      <ImageBlurLoader
        v-if="artist.picture_medium || artist.picture_big"
        :big-image-src="artist.picture_medium ?? artist.picture_big"
        :small-image-src="artist.picture_small ?? artist.picture_medium"
        class="wfull hfull object-cover transform transition-all duration-200 group-hover:scale-105"
      />
    </div>
    <span
      text-lg text-shadow-lg font-semibold text-center truncate max-wfull
    >
      {{ artist.name }}
    </span>
  </NuxtLink>
</template>

<style lang="scss" scoped></style>
