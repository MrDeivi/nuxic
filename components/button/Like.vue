<script lang="ts" setup>
defineProps<{ active?: boolean; iconClass?: string; circleClass?: string }>()
defineEmits(['change'])
</script>

<template>
  <div class="no-touch" cursor-pointer @click="$emit('change', !active)">
    <div
      v-if="active"
      :class="circleClass" bg-red-800:20 w-8 h-8
      rounded-full flex items-center justify-center
    >
      <span i-solar:heart-bold text-red-500 text-lg flex :class="iconClass" />
    </div>
    <div
      v-else
      :class="circleClass" w-8 h-8 rounded-full flex
      items-center justify-center hover:text-red-500
    >
      <span i-solar:heart-linear text-lg flex :class="iconClass" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
