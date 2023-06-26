<script lang="ts" setup>
const { search, searchFilter, data, loading } = await useSearch()

useHead({
  title: computed(() => `Search: ${search.value}`),
})
</script>

<template>
  <div min-h-screen flex flex-col overflow-y-auto relative>
    <div
      z-1 lt-lg:fixed top-16 pt2 wfull lt-lg:bg-black:80
      backdrop-blur backdrop-filter
    >
      <NavbarSearchFilters v-model:filter="searchFilter" mb3 lt-lg:px3 />
      <div class="search-input" overflow-hidden rounded-xl lt-lg:rounded-none>
        <input
          v-model="search"
          lt-lg:px3 outline-none relative overflow-hidden
          h13 placeholder="Search artists, albums, tracks"
          px4 bg-white:10 wfull type="search"
        >
      </div>
    </div>

    <div
      flex flex-col flex-grow grow hfull wfull lt-lg:pt25 pt5
      :class="{ 'items-center justify-center': loading || !data?.data?.length }"
    >
      <template v-if="loading">
        <div flex justify-center items-center wfull h-30>
          <div text-primary-300 text-4xl flex i-svg-spinners:3-dots-move />
        </div>
      </template>
      <div
        v-else-if="data?.data?.length" overflow-y-auto wfull p3 pt0 pl2
      >
        <template v-for="(item, index) in data.data" :key="index">
          <NavbarSearchResultArtist v-if="(item as any).type === 'artist'" :artist="item" />
          <NavbarSearchResultTrack v-else-if="(item as any).type === 'track'" :track="item" />
          <NavbarSearchResultAlbum v-else-if="(item as any).type === 'album'" :album="item" />
        </template>
      </div>
      <div v-else justify-center items-center flex="~ col" transform class="translate-y--50%">
        <NavbarSearchEmpty />
      </div>
    </div>
  </div>
</template>

<style>
.search-input::after{
  @apply bg-primary-300 w-full absolute bottom-0 left-0;
  content: '';
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  height: 2px;
  top: auto;
  transform: scaleX(0);
  transform-origin: center bottom;
  transition: transform 0.26s cubic-bezier(0.4, 0, 0.2, 1);
}
.search-input:focus-within::after{
  transform: scaleX(1);
}
</style>
