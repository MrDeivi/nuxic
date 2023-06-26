<script lang="ts" setup>
import type { Track } from '~/types'

const props = defineProps<{ track: Track }>()
const emit = defineEmits(['play'])

const { track } = toRefs(props)
const durationText = useDurationText(props.track.duration)

const musicStore = useMusicStore()

function play() {
  musicStore.setCurrentTrack(track.value)
  emit('play')
}

const isCurrent = computed(() => {
  return musicStore.currentTrack?.id === track.value.id && musicStore.isPlaying
})

const preview = computed<string>(() => track?.value?.preview ?? '')
const title = computed<string>(() => track?.value?.title ?? '')

const { download } = useDownloadFile(preview, title)
</script>

<template>
  <div
    bg-white:10 p2 relative overflow-hidden round
  >
    <div
      relative
      class="group" cursor-pointer rounded-lg overflow="hidden"
      @click="play"
    >
      <div
        v-if="!isCurrent"
        bg-black:40 absolute wfull hfull left0 top0
        z-10 op0 group-hover:op100 transition-all duration-200 rounded-lg
      />

      <ImageBlurLoader
        v-if="track.album?.cover_medium || track.md5_image"
        :big-image-src="track.album?.cover_medium ?? getImageSrc(track.md5_image)"
        :small-image-src="track.album?.cover_small ?? getImageSrc(track.md5_image, 'small')"
        class="wfull hfull rounded-lg max-h-50 min-h-50 object-cover lt-lg:max-h-40 lt-lg:min-h-40"
      />

      <div
        v-if="!isCurrent" hidden bg-white:20
        rounded-full p2 absolute transform
        class="lt-lg:!flex absoluteCenter"
      >
        <span text-2xl flex i-solar:play-bold />
      </div>

      <span
        v-if="!isCurrent"
        class="absoluteCenter"
        lt-lg:hidden
        z-10 i-solar:play-bold transform scale-0 group-hover:scale-100 text-5xl
        text-primary-300 transition-all duration-200
      />

      <div v-if="isCurrent" absolute bottom-2 left-2>
        <MusicPlayingAnimation />
      </div>
    </div>

    <div mt2 p2 flex="~ col">
      <NuxtLink
        :to="{ path: `/tracks/${track.id}` }" inline-flex
        w-min max-w-full truncate :title="track.title"
      >
        <span
          text-xl font-bold hover:text-primary-300
          transition-all duration-200
          truncate inline lt-lg:text-lg
        >
          {{ track.title_short }}
        </span>
      </NuxtLink>

      <div class="flex justify-between">
        <NuxtLink
          v-if="track.artist"
          :to="{ path: `/artists/${track.artist.id}` }"
          inline-flex w-min max-w-full truncate :title="track.artist.name"
        >
          <span
            op60 truncate hover:text-primary-300
            hover:op100 cursor-pointer lt-lg:text-sm
          >
            {{ track.artist.name }}
          </span>
        </NuxtLink>

        <span text-md op60 truncate>{{ durationText }}</span>
      </div>
    </div>
    <div flex="~ row" items-center space-x-4 pl1 pt2 h10>
      <ClientOnly v-if="track.id">
        <ButtonLike
          :active="useUserPreferencesStore().likedTracks.some(item => item.id === track.id)"
          @change="useUserPreferencesStore().likeTrack(track)"
        />
        <span
          hover:text-primary-300 cursor-pointer text-lg
          i-solar:download-minimalistic-linear
          @click="download"
        />
        <span
          hover:text-primary-300 cursor-pointer text-lg
          i-solar:menu-dots-bold transform rotate-90
        />
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped></style>
