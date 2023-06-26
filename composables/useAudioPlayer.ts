import type { PlayerMode } from '~/types'

export function useAudioPlayer(playerMode: Ref<PlayerMode>, onNext: () => void) {
  const isPlaying = ref(false)
  const mounted = ref(false)
  const currentTime = ref(0)
  const seekValue = ref(0)
  const audioPlayer = ref<HTMLAudioElement>()

  const play = () => {
    audioPlayer.value?.play()
  }
  const pause = () => audioPlayer.value?.pause()

  const stop = () => {
    if (audioPlayer.value) {
      pause()
      audioPlayer.value.currentTime = 0
    }
  }

  const endedListener = () => {
    isPlaying.value = false
    currentTime.value = 0
    seekValue.value = 0

    const mode = unref(playerMode)
    if (mode === 'repeat')
      nextTick(play)

    else if (mode === 'list')
      nextTick(() => onNext?.())
  }
  const pauseListener = () => {
    isPlaying.value = false
  }
  const playListener = () => {
    isPlaying.value = true
  }

  watch(audioPlayer, () => {
    if (audioPlayer.value && !mounted.value) {
      audioPlayer.value?.addEventListener('ended', endedListener)
      audioPlayer.value?.addEventListener('pause', pauseListener)
      audioPlayer.value?.addEventListener('play', playListener)
      play()
      mounted.value = true
    }
  })

  onUnmounted(() => {
    audioPlayer.value?.removeEventListener('pause', pauseListener)
    audioPlayer.value?.removeEventListener('play', playListener)
    audioPlayer.value?.removeEventListener('ended', endedListener)
  })

  const onPlaying = () => {
    if (!audioPlayer.value)
      return

    currentTime.value = audioPlayer.value?.currentTime
    seekValue.value = (audioPlayer.value?.currentTime / audioPlayer.value?.duration) * 100

    if (!seekValue.value)
      seekValue.value = 0
  }

  const onSeek = () => {
    if (audioPlayer.value) {
      const seekto = audioPlayer.value.duration * (seekValue.value / 100)

      audioPlayer.value.currentTime = seekto
    }
  }

  return {
    play,
    pause,
    stop,
    onPlaying,
    onSeek,
    currentTime,
    seekValue,
    audioPlayer,
    isPlaying,
  }
}
