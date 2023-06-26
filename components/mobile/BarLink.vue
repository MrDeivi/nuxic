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
      hfull px-4 transition-all duration-200 flex justify-center items-center
      class="group"
    >
      <div
        group-hover:text-primary-300 flex flex-col justify-center items-center
        :class="{ 'text-primary-300': active }"
      >
        <span
          :class="active ? activeIcon : icon"
          text-2xl inline-flex
        />
        <span text-xs mt1>
          <slot />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style  scoped></style>
