<script lang="ts" setup>
import { useSearch } from '~/composables/data/useSearch'

const { search, searchFilter, data, loading } = useSearch()
const target = ref()
const showSearchPanel = ref(false)
const { focused } = useFocus(target)
whenever(focused, () => nextTick(() => showSearchPanel.value = true))
</script>

<template>
  <div
    lt-lg-hidden fixed top-0 left-80
    z-50 h-17 flex items-center pr-8 backdrop-blur backdrop-filter md:h-24 bg-black:90
    style="width: calc(100vw - 20rem);"
  >
    <div
      my-2 w-full flex items-center
    >
      <div
        lt-md-hidden w-200 cursor-text items-center round
        p-2 md:flex hoverable focus-within:bg-white:10
        relative class="group"
      >
        <span i-iconoir:search ml2 text-2xl />
        <input
          ref="target"
          v-model="search"
          placeholder="Search artists, albums, tracks."
          mx2 w-full border-none bg-transparent outline-none
          type="search"
        >
        <div
          class="ml-auto items-center mr-1 w-15 flex justify-center rounded-lg bg-white/10  cursor-text py.5"
        >
          <span class="i-solar:command-linear inline-flex text-xs mr-2" /> K
        </div>
        <ClientOnly>
          <NavbarSearch
            v-model:show="showSearchPanel"
            v-model:type="searchFilter"
            v-model:filter="searchFilter"
            :focused="focused"
            :loading="loading"
            :data="data?.data"
          />
        </ClientOnly>
      </div>

      <div ml-auto>
        <a href="https://github.com/MrDeivi/nuxic" target="__blank">
          <div bg-white:10 round hover:bg-white:20>
            <div p2 px4 flex items-center>
              <span i-akar-icons:github-fill inline-block text-2xl mr4 />
              Star repo ✨
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
