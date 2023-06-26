<script lang="ts" setup>
import type { Genre } from '~/types'

defineProps<{ genre: Genre }>()
</script>

<template>
  <NuxtLink v-if="genre.id !== 0" :to="{ path: `/genres/${genre.id}` }">
    <div
      bg-white:10 relative max-h-58 overflow-hidden round cursor-pointer
      class="group relative"
    >
      <div
        bg-white:10 absolute wfull hfull left0 top0
        z-10 op0 group-hover:op100 transition-all duration-200
      />
      <ImageBlurLoader
        v-if="genre.picture_medium "
        :big-image-src="genre.picture_medium"
        :small-image-src="genre.picture_small"
        class="object-cover group-hover:scale-105 transition-all duration-200 transform wfull hfull"
      />
      <div absolute top-2 right-2 bg-white:20 rounded-full p2>
        <span text-lg flex i-solar:music-note-3-bold-duotone />
      </div>

      <div
        absolute backdrop-blur bg-white:20 bottom-0
        left-0 wfull h-15 p4 items-center rounded-b-xl
      >
        <span
          style="line-height: 18px"
          text-xl text-shadow-lg font-semibold
        >
          {{ genre.name }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style  scoped></style>
