<script lang="ts" setup>
const props = defineProps<{
  icon: string
  activeIcon: string
  to?: { path?: string; name?: string }
}>()
</script>

<template>
  <NuxtLink v-slot="{ isActive: active }" :to="to">
    <div
      p-4 round mb-3 hover:bg-white:10 active:bg-white:20 cursor-pointer transition-all duration-200
      class="group"
      :class="{ 'bg-white:10': active }"
    >
      <div
        mr-5 flex="~ row" items-center
        group-hover:text-primary-300
        :class="{ 'text-primary-300': active }"
      >
        <span
          :class="active ? activeIcon : icon"
          mr-4 text-2xl inline-flex
        />
        <slot />
      </div>
    </div>
  </NuxtLink>
</template>

<style  scoped></style>
