<script lang="ts" setup>
import type { SearchFilter } from '~/types'

const props = defineProps<{
  show?: boolean
  focused: boolean
  loading: boolean
  filter: SearchFilter
  data: any[] | undefined
}>()
const target = ref()

const show = useVModel(props, 'show')
const filter = useVModel(props, 'filter')

onClickOutside(target, () => {
  if (!props.focused)
    nextTick(() => show.value = false)
})

const close = () => show.value = false
</script>

<template>
  <div
    ref="target"
    top-15 round shadow border border-white:10 transition-all duration-200
    z-100 left-0 absolute h140 w-full flex-col hidden overflow-hidden bg-black p1
    :class="{ '!flex': show }"
  >
    <NavbarSearchFilters v-model:filter="filter" p3 />
    <div
      flex flex-col flex-grow grow
      class="max-h-[calc(100%-4rem)]"
      :class="{ 'items-center justify-center': loading || !data }"
    >
      <template v-if="loading">
        <div flex justify-center items-center wfull h-30>
          <div text-primary-300 text-4xl flex i-svg-spinners:3-dots-move />
        </div>
      </template>
      <div
        v-else-if="data" overflow-y-auto wfull p3 pt0
      >
        <template v-for="(item, index) in data" :key="index">
          <NavbarSearchResultArtist v-if="(item as any).type === 'artist'" :artist="item" @click="close" />
          <NavbarSearchResultTrack v-else-if="(item as any).type === 'track'" :track="item" @click="close" />
          <NavbarSearchResultAlbum v-else-if="(item as any).type === 'album'" :album="item" @click="close" />
        </template>
      </div>
      <NavbarSearchEmpty v-else />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
