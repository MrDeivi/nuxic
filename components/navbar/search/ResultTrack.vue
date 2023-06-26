<script lang="ts" setup>
import type { Track } from '~/types'

const props = defineProps<{ track: Track }>()
const durationText = useDurationText(props.track.duration)

const musicStore = useMusicStore()

function play() {
  musicStore.setCurrentTrack(props.track)
}
const isCurrent = computed(() => {
  return musicStore.currentTrack?.id === props.track.id && musicStore.isPlaying
})
</script>

<template>
  <NuxtLink :to="`/tracks/${track.id}`">
    <div flex justify-start hover:bg-white:10 cursor-pointer round p2 overflow-hidden>
      <div relative @click.prevent="play">
        <NuxtImg
          v-if="track.album?.cover_small || track.md5_image"
          rounded-lg object-cover
          width="50"
          min-w14
          :src="track.album?.cover_small ?? getImageSrc(track.md5_image, 'small')" fit="cover" loading="lazy"
        />
        <div
          v-if="!isCurrent" bg-white:20 flex
          rounded-full p1 absolute transform
          class="absoluteCenter"
        >
          <span text-xl flex i-solar:play-bold />
        </div>
        <div v-else class="absoluteCenter">
          <MusicPlayingAnimation max-w10 max-h10 />
        </div>
      </div>

      <div ml5 truncate>
        <h2 font-semibold text-lg whitespace-nowrap truncate>
          {{ track.title }}

          <span op60 font-normal>· {{ track.artist?.name }} </span>
        </h2>

        <p op60 flex items-center truncate space-x3>
          <span>Album: {{ track.album?.title }} </span>
          <span lt-lg:hidden>·</span>
          <span items-center flex lt-lg:hidden>
            {{ durationText }}
          </span>
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped></style>
