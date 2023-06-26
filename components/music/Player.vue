<script lang="ts" setup>
import type { PlayerMode, Track } from '~/types'

const props = withDefaults(
  defineProps<{
    track?: Track
    playlist?: Track[]
    expandPlayer?: boolean
    playerMode: PlayerMode
    playNext?: () => void
    playPrev?: () => void
  }>(),
  { playNext: () => ({}), playPrev: () => ({}) },
)
const emit = defineEmits(['change', 'close', 'setPlayerMode', 'expand'])

const { track, playerMode } = toRefs(props)

const {
  onPlaying, onSeek, audioPlayer, pause,
  isPlaying, play, stop, currentTime, seekValue,
} = useAudioPlayer(playerMode, props.playNext)

watch(isPlaying, () => emit('change', isPlaying.value))

const currentTimeText = useDurationText(currentTime)

const preview = computed<string>(() => track?.value?.preview ?? '')
const title = computed<string>(() => track?.value?.title ?? '')
const { download } = useDownloadFile(preview, title)

const playerModeBtnTooltip = computed(() => {
  const mode = playerMode.value
  return mode === 'list' ? 'Playlist mode' : mode === 'repeat' ? 'Repeat one' : 'Don\'t repeat'
})

watch(() => props.track, () => {
  stop()
  nextTick(play)
})
</script>

<template>
  <div
    fixed transform bottom-2 min-h-20 transition-all duration-700
    z-10
    :class="{ 'translate-y-0': track?.preview, 'translate-y-3rem': !track?.preview }"
    left-83 z-200 class="player-container"
  >
    <div v-if="track?.preview" class="audio-player">
      <div
        lt-lg:op100 bg-primary-300 h.8 shadow shadow-primary-300:60
        top-0 left-0 rounded-full op0 absolute
        :style="{ width: `${seekValue}%` }"
      />

      <audio
        ref="audioPlayer"
        :src="track?.preview"
        @timeupdate="onPlaying"
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
      <div flex="~ row" space="x5 lt-lg:x2" w-min items-center>
        <span
          i-solar:skip-previous-bold flex transition-all duration-100
          cursor-pointer hover:bg-white:60
          text-xl lt-lg:text-sm
          @click="playPrev"
        />
        <div
          class="play-btn no-touch"
          style="box-shadow: 0 1px 13px -2px"
          @click="isPlaying ? pause() : play()"
        >
          <span v-if="!isPlaying" i-solar:play-bold flex text-xl lt-lg:text-sm text-black />
          <span v-else i-solar:pause-bold flex text-xl text-black lt-lg:text-sm />
        </div>
        <span
          i-solar:skip-next-bold flex text-xl lt-lg:text-sm
          transition-all duration-100
          cursor-pointer hover:bg-white:60
          @click="playNext"
        />
      </div>

      <div
        ml15 flex wfull lt-lg:ml0 relative
      >
        <div w13 h13 min-w13 min-h13 lt-lg:hidden>
          <NuxtImg
            rounded-xl
            :src="track.album?.cover_small ?? getImageSrc(track.md5_image, 'small')"
          />
        </div>
        <div
          flex="~ col" ml5 lt-lg:ml3 w50 max-w50
          @click="playlist?.length && useDevice().isMobileOrTablet && emit('expand')"
        >
          <h1 font-bold text-xl lt-lg:text-13px truncate :title="track.title">
            {{ track.title }}
          </h1>

          <span mt--1 whitespace-nowrap lt-lg:text-sm op80>{{ track.artist.name }}</span>
        </div>

        <div flex items-center ml15 class="lt-lg:(ml-auto mr2)">
          <ClientOnly>
            <ButtonLike
              :active="useUserPreferencesStore().likedTracks.some(item => item.id === track?.id)"
              @change="useUserPreferencesStore().likeTrack(track)"
            />
          </ClientOnly>
          <span
            lt-lg:hidden mx-2 i-solar:download-minimalistic-linear
            text-lg hover:text-primary-300 cursor-pointer flex
            @click="download"
          />
          <span
            :title="playerModeBtnTooltip"
            ml2 hover:text-primary-300 cursor-pointer
            text-lg flex :class="{
              'i-solar:repeat-one-bold': playerMode === 'repeat',
              'i-solar:repeat-one-minimalistic-outline': playerMode === 'none',
              'i-solar:repeat-outline': playerMode === 'list',
            }"
            @click="$emit('setPlayerMode')"
          />
        </div>

        <div
          flex lt-lg:hidden items-center ml20 lt-lg:ml5 wfull
        >
          <span mr5 w5>{{ currentTimeText }}</span>
          <input
            v-model="seekValue"
            class="lt-lg:(hidden)"
            type="range"
            wfull
            min="0"
            max="100"
            step="1"
            @change="onSeek"
          >
          <span ml5 w-5>0:30</span>
        </div>

        <div ml-auto pl-20 flex items-center class="lt-lg:(ml0 pl0)">
          <div
            active:bg-white:10 lt-lg:hidden
            w10 h10 min-w10 min-h10 hoverable cursor-pointer rounded-full
            flex items-center justify-center mr2 transform
            @click="emit('expand')"
          >
            <span i-solar:alt-arrow-up-linear flex :class="{ 'rotate-180': expandPlayer }" />
          </div>
          <div
            active:bg-white:10 lt-lg:hidden
            w10 h10 min-w10 min-h10 hoverable cursor-pointer rounded-full
            flex items-center justify-center
            @click="emit('close')"
          >
            <span i-carbon:close flex />
          </div>

          <span
            i-carbon:close class="lt-lg:!flex hidden text-2xl"
            @click="emit('close')"
          />
        </div>
      </div>
    </div>
    <div
      :class="{ 'pb5 h40vh p-2': expandPlayer }" bg-black:85 overflow-y-auto h0
      backdrop-blur-xl transition-all duration-400 border border-white:10 round lt-lg:rounded-none
    >
      <NavbarSearchResultTrack v-for="(item, index) in playlist" :key="index" :track="item" />
    </div>
  </div>
</template>

<style scoped>
.audio-player {
  padding-bottom: 3px;
  @apply rounded-2xl shadow-lg shadow-white:5 h-20 backdrop-blur border border-white:10;
  @apply backdrop-filter bg-black:80 backdrop-blur flex items-center pl-20 lt-lg:pl-4 pr-5 ;
  @apply lt-lg:(shadow-none rounded-none border-b-none border-l-none border-r-none h-15)
}
.play-btn{
  @apply w13 h13 bg-white rounded-full flex justify-center items-center shadow-white
  @apply cursor-pointer hover:bg-white:60 transition-all duration-100;
  @apply lt-lg:(w9 h9)
}
.player-container{
  @apply w-[calc(100%-23rem)] lt-xl:(left-3 w-[calc(100%-2rem)])
  @apply lt-lg:(left-0 wfull bottom-10.8)
}

input[type=range] {
  height: 7px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}
input[type=range]:focus {
  outline: none;
  background: red !important;
}
input[type=range]::-webkit-slider-runnable-track {
  height: 7px;
  animate: 0.2s;
  @apply bg-primary-400 cursor-pointer rounded-xl w-full shadow-lg shadow-primary-300:70;
  border: 0px solid #010100;
}

input[type=range]::-webkit-slider-thumb {
  border: 0px solid #00001E;
  height: 15px;
  width: 15px;
  border-radius: 16px;
  @apply bg-white shadow-lg shadow-white:80 cursor-pointer transition-all duration-100;
  margin-top: -4px;
}
input[type=range]::-webkit-slider-thumb{
  -webkit-appearance: none;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  @apply bg-primary-500
}
input[type=range]::-moz-range-thumb{
  border: 0px solid #00001E;
  height: 15px;
  width: 15px;
  border-radius: 16px;
  @apply bg-white shadow-lg shadow-white:80 cursor-pointer transition-all duration-100;
  margin-top: -4px;
}

input[type=range]::-moz-range-track {
  height: 11px;
  animate: 0.2s;
  @apply bg-primary-400 cursor-pointer rounded-xl w-full shadow-lg shadow-primary-300:70;
  border: 0px solid #010100;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 11px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  border: 0px solid #010100;
  @apply bg-primary-400 cursor-pointer rounded-xl w-full shadow-lg shadow-primary-300:70;
}
input[type=range]::-ms-fill-upper {
  border: 0px solid #010100;
  @apply bg-primary-400 cursor-pointer rounded-xl w-full shadow-lg shadow-primary-300:70;
}
input[type=range]::-ms-thumb {
  border: 0px solid #00001E;
  height: 15px;
  width: 15px;
  border-radius: 16px;
  @apply bg-white shadow-lg shadow-white:80 cursor-pointer transition-all duration-100;
  margin-top: -4px;
}
input[type=range]:focus::-ms-fill-lower {
  @apply bg-primary-500
}
input[type=range]:focus::-ms-fill-upper {
  @apply bg-primary-500
}
</style>
