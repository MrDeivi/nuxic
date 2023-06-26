<script lang="ts" setup>
import type { CollapsablePanel } from '~/types'

const props = defineProps<{
  panels: CollapsablePanel[]
}>()
</script>

<template>
  <div class="w-full">
    <div class=" w-full rounded-2xl p3">
      <HeadlessDisclosure v-for="(panel, i) in panels" :key="i" v-slot="{ open }">
        <HeadlessDisclosureButton
          transition-all duration-300 flex wfull justify-between
          rounded-lg p="x4 y3" text-left font-medium mb3
          class="!outline-none !surface hover:!surfaceHover hover:text-primary-300 group"
        >
          <span>{{ panel.title }}</span>
          <span
            i-solar:alt-arrow-down-linear
            :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 group-hover:text-primary-300"
          />
        </HeadlessDisclosureButton>
        <HeadlessDisclosurePanel p="y4 x4" text-lg style="line-height: 24px; font-weight: 200" bg-white:2 rounded-xl mb3>
          {{ panel.description }}
        </HeadlessDisclosurePanel>
      </HeadlessDisclosure>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
