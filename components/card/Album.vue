<script lang="ts" setup>
import type { Album } from '~/types'

const props = defineProps<{ album: Album }>()

const { album } = toRefs(props)
</script>

<template>
  <div
    bg-white:10 p2 relative overflow-hidden round
  >
    <NuxtLink
      :to="{ path: `/albums/${album.id}` }"
    >
      <div
        relative
        class="group" cursor-pointer rounded-lg overflow="hidden"
      >
        <div
          bg-black:40 absolute wfull hfull left0 top0
          z-10 op0 group-hover:op100 transition-all duration-200 rounded-lg
        />
        <ImageBlurLoader
          v-if="album?.cover_medium"
          :big-image-src="album?.cover_medium"
          :small-image-src="album?.cover_small"
          class="wfull hfull rounded-lg max-h-50 min-h-50 object-cover lt-lg:max-h-40 lt-lg:min-h-40"
        />
      </div>
    </NuxtLink>
    <div mt2 p2 flex="~ col">
      <NuxtLink
        :to="{ path: `/albums/${album.id}` }" inline-flex
        w-min max-w-full truncate :title="album.title"
      >
        <span
          text-xl font-bold hover:text-primary-300
          transition-all duration-200
          truncate inline lt-lg:text-lg
        >
          {{ album.title }}
        </span>
      </NuxtLink>

      <div class="flex justify-between">
        <NuxtLink
          v-if="album.artist"
          :to="{ path: `/artists/${album.artist.id}` }"
          inline-flex w-min max-w-full truncate :title="album.artist.name"
        >
          <span
            op60 truncate hover:text-primary-300
            hover:op100 cursor-pointer lt-lg:text-sm
          >
            {{ album.artist.name }}
          </span>
        </NuxtLink>
      </div>
    </div>
    <div flex="~ row" items-center space-x-4 pl1 pt2>
      <ClientOnly v-if="album.id">
        <ButtonLike
          :active="useUserPreferencesStore().likedAlbums.some(item => item.id === album.id)"
          @change="useUserPreferencesStore().likeAlbum(album)"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped></style>
