<script lang="ts" setup>
import type { Radio } from '~/types'
import { DEEZER } from '~/constants'

const { data } = await usePaginatedFetch<Radio>(`${DEEZER().radio}/top`, { limit: 100 })

useSeoMeta({
  title: 'Explore radio tracks',
  description: 'Explore different music genres in the radio in nuxic.',
})
</script>

<template>
  <MusicContainer
    lt-md:px2 :always-grid="true"
    grid-class="!grid-cols-minmax-10rem lg:!grid-cols-minmax-12rem"
    title="Radio"
  >
    <CardRadio
      v-for="(radio, j) in data"
      :key="j"
      data-aos="fade-left"
      :data-aos-delay="100 * j"
      :data-aos-offset="-300"
      :radio="radio"
    />
  </MusicContainer>
</template>

<style lang="scss" scoped></style>
