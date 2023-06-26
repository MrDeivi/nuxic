<script lang="ts" setup>
const props = defineProps<{ filter: string; defaultItems?: { label: string; key: string }[] }>()
const filter = useVModel(props, 'filter')
const set = (val: any) => filter.value = val

const items = ref(props.defaultItems ?? [
  { label: 'All', key: 'all' },
  { label: 'Artists', key: 'artist' },
  { label: 'Tracks', key: 'track' },
  { label: 'Albums', key: 'album' },
])
</script>

<template>
  <div flex space-x2>
    <Button
      v-for="item in items" :key="item.key"
      :class="{ active: filter === item.key }"
      hoverable
      p1 px4 round text-lg inline-flex
      hover:text-primary-300 class="no-touch"
      @click="() => set(item.key)"
    >
      {{ item.label }}
    </Button>
  </div>
</template>

<style scoped>
.active{
  @apply bg-primary-900:50 text-primary-300
}
</style>
