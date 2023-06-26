<script lang="ts" setup>
import type { Radio } from '~/types'

defineProps<{ radio: Radio }>()
</script>

<template>
  <NuxtLink v-if="radio?.id" :to="{ path: `/radio/${radio.id}` }">
    <div
      bg-white:10 relative max-h-58 overflow-hidden round cursor-pointer
      class="group relative"
    >
      <div
        bg-white:10 absolute wfull hfull left0 top0
        z-10 op0 group-hover:op100 transition-all duration-200
      />
      <ImageBlurLoader
        v-if="radio.picture_medium "
        :big-image-src="radio.picture_medium"
        :small-image-src="radio.picture_small"
        class="object-cover group-hover:scale-105 transition-all duration-200 transform wfull hfull"
      />

      <div absolute top-2 right-2 bg-white:20 rounded-full p2>
        <span text-lg flex i-solar:radio-minimalistic-bold />
      </div>

      <div
        absolute bg-white:30 bottom-0
        left-0 wfull h-15 flex p4 items-center rounded-b-xl
      >
        <span
          style="line-height: 18px"
          text-xl text-shadow-lg font-semibold
        >
          {{ radio.title }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style  scoped></style>
